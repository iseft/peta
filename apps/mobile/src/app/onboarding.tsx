import type { SupportedCurrency } from '@peta/shared';
import { Redirect, useRouter } from 'expo-router';
import { useState } from 'react';

import { useCompleteOnboarding, useProfile } from '@/api/queries';
import { Button } from '@/components/button';
import { CurrencyPicker } from '@/components/currency-picker';
import { Screen } from '@/components/screen';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { isDateOnly, todayDateOnly } from '@/lib/dates';
import { parseMoney } from '@/lib/money';

export default function OnboardingScreen() {
  const router = useRouter();
  const profile = useProfile();
  const completeOnboarding = useCompleteOnboarding();
  const [currency, setCurrency] = useState<SupportedCurrency>('HUF');
  const [balance, setBalance] = useState('');
  const [date, setDate] = useState(todayDateOnly());
  const [months, setMonths] = useState('6');

  if (profile.data?.onboarded) return <Redirect href="/monthly" />;

  const balanceMinor = balance.trim() === '' ? 0 : parseMoney(balance, currency);
  const monthsNumber = Number(months);
  const monthsValid = /^\d{1,2}$/.test(months) && monthsNumber <= 60;
  const valid = balanceMinor !== null && isDateOnly(date) && date <= todayDateOnly() && monthsValid;

  const submit = () => {
    if (!valid || balanceMinor === null) return;
    completeOnboarding.mutate(
      {
        defaultCurrency: currency,
        openingBalance: { amountMinor: balanceMinor, currency, date },
        emergencyFundTargetMonths: monthsNumber,
      },
      { onSuccess: () => router.replace('/monthly') },
    );
  };

  return (
    <Screen
      scroll
      footer={
        <Button
          label={completeOnboarding.isPending ? 'Saving…' : 'Start planning'}
          disabled={!valid || completeOnboarding.isPending}
          onPress={submit}
        />
      }>
      <ThemedText type="subtitle">A few basics</ThemedText>
      <ThemedText themeColor="textSecondary">
        You can change the last two later in Settings.
      </ThemedText>
      <CurrencyPicker label="Default Currency" value={currency} onChange={setCurrency} />
      <ThemedText type="small" themeColor="textSecondary">
        Every total is shown in this currency. Amounts in other currencies are converted at the
        rate for their date.
      </ThemedText>
      <TextField
        label={`Opening Balance (${currency})`}
        value={balance}
        onChangeText={setBalance}
        keyboardType="decimal-pad"
        placeholder="0"
        hint="The money you have right now that isn't savings."
        error={balanceMinor === null ? 'Enter an amount, e.g. 250000' : null}
      />
      <TextField
        label="As of"
        value={date}
        onChangeText={setDate}
        placeholder="YYYY-MM-DD"
        autoCapitalize="none"
        error={isDateOnly(date) && date <= todayDateOnly() ? null : 'A date up to today, as YYYY-MM-DD'}
      />
      <TextField
        label="Emergency Fund Target (months)"
        value={months}
        onChangeText={setMonths}
        keyboardType="number-pad"
        hint="How many months of Need spending your Emergency Fund should cover."
        error={monthsValid ? null : 'A whole number up to 60'}
      />
      {completeOnboarding.error && (
        <ThemedText accessibilityLiveRegion="polite">{completeOnboarding.error.message}</ThemedText>
      )}
    </Screen>
  );
}
