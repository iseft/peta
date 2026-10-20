import { isClerkAPIResponseError, useAuth, useUser } from '@clerk/expo';
import type { ProfileDTO } from '@peta/shared';
import { useQueryClient } from '@tanstack/react-query';
import * as Clipboard from 'expo-clipboard';
import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { useDeleteAccount, useProfile, useUpdateProfile } from '@/api/queries';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { QueryState } from '@/components/query-state';
import { Row } from '@/components/row';
import { Screen } from '@/components/screen';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { WEB_URL } from '@/config';
import { isDateOnly, todayDateOnly } from '@/lib/dates';
import { openFeedbackEmail } from '@/lib/feedback';
import { moneyInputText, parseMoney } from '@/lib/money';

export default function SettingsScreen() {
  const profile = useProfile();
  if (!profile.data) {
    return (
      <Screen>
        <QueryState error={profile.error} onRetry={() => void profile.refetch()} />
      </Screen>
    );
  }
  return <SettingsForm profile={profile.data} />;
}

function SettingsForm({ profile }: { profile: ProfileDTO }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { signOut } = useAuth();
  const updateProfile = useUpdateProfile();
  const deleteAccount = useDeleteAccount();
  const currency = profile.defaultCurrency ?? 'EUR';

  const [name, setName] = useState(profile.name ?? '');
  const [balance, setBalance] = useState(
    profile.openingBalance ? moneyInputText(profile.openingBalance.amountMinor, currency) : '',
  );
  const [balanceDate, setBalanceDate] = useState(profile.openingBalance?.date ?? todayDateOnly());
  const [months, setMonths] = useState(String(profile.emergencyFundTargetMonths));
  const [saved, setSaved] = useState(false);

  const balanceMinor = parseMoney(balance, currency);
  const monthsValid = /^\d{1,2}$/.test(months) && Number(months) <= 60;
  const dateValid = isDateOnly(balanceDate) && balanceDate <= todayDateOnly();
  const valid = balanceMinor !== null && monthsValid && dateValid;

  const save = () => {
    if (!valid || balanceMinor === null) return;
    setSaved(false);
    updateProfile.mutate(
      {
        name: name.trim() || null,
        openingBalance: { amountMinor: balanceMinor, currency, date: balanceDate },
        emergencyFundTargetMonths: Number(months),
      },
      { onSuccess: () => setSaved(true) },
    );
  };

  const leave = async () => {
    await signOut();
    queryClient.clear();
    router.dismissTo('/sign-in');
  };

  const confirmDelete = () =>
    Alert.alert(
      'Delete your account?',
      'Your account and everything in it (plans, Subcategories, Payment Details, settings) are deleted from our server. This can’t be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete account',
          style: 'destructive',
          onPress: () => deleteAccount.mutate(undefined, { onSuccess: () => void leave() }),
        },
      ],
    );

  return (
    <Screen scroll>
      <ThemedText type="subtitle">Settings</ThemedText>

      <Card>
        <ThemedText type="smallBold">Account</ThemedText>
        <Row title="Email" detail={profile.email ?? '–'} />
        <Row title="Default Currency" detail={`${currency} · chosen at sign-up`} />
        <TextField label="Name" value={name} onChangeText={setName} autoComplete="name" />
        <TextField
          label={`Opening Balance (${currency})`}
          value={balance}
          onChangeText={setBalance}
          keyboardType="decimal-pad"
          error={balanceMinor === null ? 'Enter an amount' : null}
        />
        <TextField
          label="Opening Balance date"
          value={balanceDate}
          onChangeText={setBalanceDate}
          autoCapitalize="none"
          error={dateValid ? null : 'A date up to today, as YYYY-MM-DD'}
        />
        <TextField
          label="Emergency Fund Target (months)"
          value={months}
          onChangeText={setMonths}
          keyboardType="number-pad"
          error={monthsValid ? null : 'A whole number up to 60'}
        />
        <Button
          label={updateProfile.isPending ? 'Saving…' : 'Save'}
          disabled={!valid || updateProfile.isPending}
          onPress={save}
        />
        {saved && <ThemedText type="small" themeColor="textSecondary">Saved.</ThemedText>}
        {updateProfile.error && <ThemedText>{updateProfile.error.message}</ThemedText>}
      </Card>

      <Card>
        <ThemedText type="smallBold">Payment Details</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          Tap to copy the name and number. Long-press to edit.
        </ThemedText>
        {profile.paymentDetails.map((detail) => (
          <Row
            key={detail.id}
            title={detail.label}
            detail={[detail.holderName, detail.value].filter(Boolean).join(' · ')}
            onPress={async () => {
              await Clipboard.setStringAsync(
                [detail.holderName, detail.value].filter(Boolean).join('\n'),
              );
              Alert.alert('Copied', `${detail.label} is on the clipboard.`);
            }}
            onLongPress={() => router.push({ pathname: '/payment-detail', params: { id: detail.id } })}
          />
        ))}
        <Button
          label="Add Payment Details"
          variant="secondary"
          onPress={() => router.push('/payment-detail')}
        />
      </Card>

      <Card>
        <ThemedText type="smallBold">Categories</ThemedText>
        <Row
          title="Active Categories"
          detail="Your Subcategories: rename, archive or delete"
          onPress={() => router.push('/categories')}
          trailing={<ThemedText>›</ThemedText>}
        />
      </Card>

      <ChangePassword />

      <Card>
        <Row title="Send feedback" onPress={() => void openFeedbackEmail()} />
        <Row title="Privacy policy" onPress={() => void Linking.openURL(`${WEB_URL}/privacy`)} />
        <Row title="Terms" onPress={() => void Linking.openURL(`${WEB_URL}/terms`)} />
      </Card>

      <View style={styles.actions}>
        <Button label="Sign out" variant="secondary" onPress={() => void leave()} />
        <Button
          label={deleteAccount.isPending ? 'Deleting…' : 'Delete account'}
          variant="secondary"
          disabled={deleteAccount.isPending}
          onPress={confirmDelete}
        />
        {deleteAccount.error && (
          <ThemedText>Couldn&apos;t delete the account: {deleteAccount.error.message}. Try again.</ThemedText>
        )}
      </View>
    </Screen>
  );
}

// The password lives in Clerk, never in our database.
function ChangePassword() {
  const { user } = useUser();
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const change = async () => {
    if (!user) return;
    setBusy(true);
    setMessage(null);
    try {
      await user.updatePassword({ currentPassword: current, newPassword: next });
      setCurrent('');
      setNext('');
      setMessage('Password changed.');
    } catch (error) {
      setMessage(
        isClerkAPIResponseError(error)
          ? (error.errors[0]?.longMessage ?? error.message)
          : 'Could not change the password. Try again.',
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card>
      <ThemedText type="smallBold">Password</ThemedText>
      <TextField
        label="Current password"
        value={current}
        onChangeText={setCurrent}
        secureTextEntry
        autoComplete="current-password"
      />
      <TextField
        label="New password"
        value={next}
        onChangeText={setNext}
        secureTextEntry
        autoComplete="new-password"
        hint="At least 15 characters."
      />
      <Button
        label={busy ? 'Changing…' : 'Change password'}
        variant="secondary"
        disabled={busy || !current || !next}
        onPress={() => void change()}
      />
      {message && <ThemedText accessibilityLiveRegion="polite">{message}</ThemedText>}
    </Card>
  );
}

const styles = StyleSheet.create({
  actions: { gap: 12 },
});
