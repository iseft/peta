import { isClerkAPIResponseError, useAuth, useSignIn, useSignUp } from '@clerk/expo';
import { Redirect } from 'expo-router';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

import { Button } from '@/components/button';
import { Screen } from '@/components/screen';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { APP_NAME } from '@/config';

type Step =
  | { kind: 'credentials'; mode: 'sign-in' | 'sign-up' }
  // Sign-up verifies the email; sign-in on a new device verifies Device Trust.
  | { kind: 'code'; flow: 'sign-up' | 'device-trust'; email: string };

// Email + password (the requirements deck). Clerk enforces the password
// rules, so its own message is what the user sees.
export default function SignInScreen() {
  const { isSignedIn } = useAuth();
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const [step, setStep] = useState<Step>({ kind: 'credentials', mode: 'sign-in' });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  if (isSignedIn) return <Redirect href="/" />;

  const run = async (action: () => Promise<void>) => {
    setBusy(true);
    setMessage(null);
    try {
      await action();
    } catch (error) {
      setMessage(describeError(error));
    } finally {
      setBusy(false);
    }
  };

  const submitCredentials = (mode: 'sign-in' | 'sign-up') =>
    run(async () => {
      const emailAddress = email.trim();
      if (mode === 'sign-in') {
        const result = await signIn.password({ emailAddress, password });
        if (result.error) throw result.error;
        if (signIn.status === 'needs_client_trust' || signIn.status === 'needs_second_factor') {
          const sent = await signIn.mfa.sendEmailCode();
          if (sent.error) throw sent.error;
          setStep({ kind: 'code', flow: 'device-trust', email: emailAddress });
          return;
        }
        if (signIn.status !== 'complete') throw new Error(`Sign-in needs more steps (${signIn.status}).`);
        const finalized = await signIn.finalize();
        if (finalized.error) throw finalized.error;
      } else {
        const result = await signUp.password({ emailAddress, password });
        if (result.error) throw result.error;
        const sent = await signUp.verifications.sendEmailCode();
        if (sent.error) throw sent.error;
        setStep({ kind: 'code', flow: 'sign-up', email: emailAddress });
      }
    });

  const verifyCode = () =>
    run(async () => {
      if (step.kind !== 'code') return;
      if (step.flow === 'sign-up') {
        const verified = await signUp.verifications.verifyEmailCode({ code: code.trim() });
        if (verified.error) throw verified.error;
        if (signUp.status !== 'complete') {
          throw new Error(`Sign-up needs: ${signUp.missingFields.join(', ') || signUp.status}.`);
        }
        const finalized = await signUp.finalize();
        if (finalized.error) throw finalized.error;
      } else {
        const verified = await signIn.mfa.verifyEmailCode({ code: code.trim() });
        if (verified.error) throw verified.error;
        if (signIn.status !== 'complete') throw new Error(`Sign-in needs more steps (${signIn.status}).`);
        const finalized = await signIn.finalize();
        if (finalized.error) throw finalized.error;
      }
    });

  if (step.kind === 'code') {
    return (
      <Screen
        footer={
          <>
            <Button
              label={busy ? 'Checking…' : 'Continue'}
              disabled={busy || code.trim().length < 6}
              onPress={verifyCode}
            />
            <Button
              label="Back"
              variant="secondary"
              onPress={() => {
                setStep({ kind: 'credentials', mode: step.flow === 'sign-up' ? 'sign-up' : 'sign-in' });
                setCode('');
              }}
            />
          </>
        }>
        <ThemedText type="subtitle">Check your email</ThemedText>
        <ThemedText themeColor="textSecondary">
          {step.flow === 'sign-up'
            ? `We sent a 6-digit code to ${step.email} to confirm it's yours.`
            : `This is a new device, so we sent a 6-digit code to ${step.email}.`}
        </ThemedText>
        <TextField
          label="Code"
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
          autoComplete="one-time-code"
          textContentType="oneTimeCode"
          maxLength={6}
          autoFocus
          style={styles.code}
        />
        {message && <ThemedText accessibilityLiveRegion="polite">{message}</ThemedText>}
      </Screen>
    );
  }

  const signingUp = step.mode === 'sign-up';
  return (
    <Screen
      scroll
      footer={
        <>
          <Button
            label={busy ? 'One moment…' : signingUp ? 'Create account' : 'Sign in'}
            disabled={busy || !email.includes('@') || password.length === 0}
            onPress={() => submitCredentials(step.mode)}
          />
          <Button
            label={signingUp ? 'I already have an account' : 'Create an account'}
            variant="secondary"
            onPress={() => {
              setMessage(null);
              setStep({ kind: 'credentials', mode: signingUp ? 'sign-in' : 'sign-up' });
            }}
          />
        </>
      }>
      <ThemedText type="title">{APP_NAME}</ThemedText>
      <ThemedText themeColor="textSecondary">
        Plan what you spend, see what you actually spend, and keep to 50/30/20.
      </ThemedText>
      <TextField
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="you@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
      />
      <TextField
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        autoComplete={signingUp ? 'new-password' : 'current-password'}
        hint={signingUp ? 'At least 15 characters. A short sentence works well.' : undefined}
      />
      {message && <ThemedText accessibilityLiveRegion="polite">{message}</ThemedText>}
    </Screen>
  );
}

function describeError(error: unknown): string {
  if (isClerkAPIResponseError(error)) {
    return error.errors[0]?.longMessage ?? error.errors[0]?.message ?? error.message;
  }
  return error instanceof Error ? error.message : 'Something went wrong. Try again.';
}

const styles = StyleSheet.create({
  code: { fontSize: 28, letterSpacing: 8, textAlign: 'center' },
});
