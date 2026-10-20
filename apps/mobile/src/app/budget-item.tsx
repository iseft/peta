import type {
  BudgetItemDTO,
  CategoryDTO,
  RecurrenceUnit,
  SupportedCurrency,
  UpdateBudgetItemDTO,
} from '@peta/shared';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import {
  useBudgetItems,
  useCategories,
  useDeleteBudgetItem,
  useProfile,
  useSaveBudgetItem,
} from '@/api/queries';
import { Button } from '@/components/button';
import { ChoiceChips } from '@/components/choice-chips';
import { CurrencyPicker } from '@/components/currency-picker';
import { QueryState } from '@/components/query-state';
import { Screen } from '@/components/screen';
import { SubcategoryPicker } from '@/components/subcategory-picker';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { currentMonth, firstOfMonth, isDateOnly, shiftMonth } from '@/lib/dates';
import { moneyInputText, parseMoney } from '@/lib/money';
import { isRarerThanMonthly } from '@/lib/recurrence';

const UNITS = [
  { value: 'WEEK', label: 'Weeks' },
  { value: 'MONTH', label: 'Months' },
  { value: 'YEAR', label: 'Years' },
] as const;

const KINDS = [
  { value: 'recurring', label: 'Recurring' },
  { value: 'one-off', label: 'One-off' },
] as const;

export default function BudgetItemScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const profile = useProfile();
  const categories = useCategories();
  const budgetItems = useBudgetItems();
  const existing = id ? budgetItems.data?.find((item) => item.id === id) : undefined;

  if (!profile.data || !categories.data || (id && !budgetItems.data)) {
    return (
      <Screen>
        <QueryState
          error={profile.error ?? categories.error ?? budgetItems.error}
          onRetry={() => void Promise.all([profile.refetch(), categories.refetch(), budgetItems.refetch()])}
        />
      </Screen>
    );
  }
  if (id && !existing) {
    return (
      <Screen>
        <ThemedText>This Budget Item no longer exists.</ThemedText>
      </Screen>
    );
  }

  const categoryOf = (subcategoryId: string) =>
    categories.data.find((c) => c.subcategories.some((s) => s.id === subcategoryId))?.id ?? null;

  return (
    <BudgetItemForm
      key={existing?.id ?? 'new'}
      existing={existing}
      initialCategoryId={existing ? categoryOf(existing.subcategoryId) : null}
      defaultCurrency={profile.data.defaultCurrency ?? 'EUR'}
      categories={categories.data.filter((c) => c.plannable)}
    />
  );
}

type FormProps = {
  existing: BudgetItemDTO | undefined;
  initialCategoryId: string | null;
  defaultCurrency: SupportedCurrency;
  categories: CategoryDTO[];
};

function BudgetItemForm({ existing, initialCategoryId, defaultCurrency, categories }: FormProps) {
  const router = useRouter();
  const save = useSaveBudgetItem();
  const remove = useDeleteBudgetItem();

  const [categoryId, setCategoryId] = useState(initialCategoryId);
  const [subcategoryId, setSubcategoryId] = useState(existing?.subcategoryId ?? null);
  const [name, setName] = useState(existing?.name ?? '');
  const [currency, setCurrency] = useState<SupportedCurrency>(existing?.currency ?? defaultCurrency);
  const [amount, setAmount] = useState(
    existing ? moneyInputText(existing.amountMinor, existing.currency) : '',
  );
  const [kind, setKind] = useState<'recurring' | 'one-off'>(
    existing && !existing.recurrence ? 'one-off' : 'recurring',
  );
  const [unit, setUnit] = useState<RecurrenceUnit>(existing?.recurrence?.unit ?? 'MONTH');
  const [interval, setInterval] = useState(String(existing?.recurrence?.interval ?? 1));
  const [startDate, setStartDate] = useState(existing?.startDate ?? firstOfMonth(currentMonth()));
  const [endDate, setEndDate] = useState(existing?.endDate ?? '');
  const [effectiveFrom, setEffectiveFrom] = useState('');

  const amountMinor = parseMoney(amount, currency);
  const intervalNumber = Number(interval);
  const recurrence =
    kind === 'recurring' && /^\d{1,3}$/.test(interval) && intervalNumber >= 1
      ? { unit, interval: intervalNumber }
      : null;
  const errors = {
    amount: amount && amountMinor === null ? 'Enter an amount, e.g. 12500' : null,
    interval: kind === 'recurring' && !recurrence ? 'A whole number, 1 or more' : null,
    startDate: isDateOnly(startDate) ? null : 'A date as YYYY-MM-DD',
    endDate:
      endDate === ''
        ? null
        : !isDateOnly(endDate)
          ? 'A date as YYYY-MM-DD, or empty'
          : endDate < startDate
            ? 'Must not be before the start'
            : null,
    effectiveFrom:
      effectiveFrom === '' || isDateOnly(effectiveFrom) ? null : 'A date as YYYY-MM-DD, or empty',
  };
  const valid =
    !!subcategoryId && amountMinor !== null && Object.values(errors).every((error) => !error);
  const isRecurringEdit = !!existing?.recurrence && kind === 'recurring';

  const submit = () => {
    if (!valid || !subcategoryId || amountMinor === null) return;
    const fields = {
      subcategoryId,
      name: name.trim() || null,
      amountMinor,
      currency,
      recurrence,
      startDate,
      endDate: kind === 'recurring' && endDate ? endDate : null,
    };
    const done = { onSuccess: () => router.back() };
    if (!existing) {
      save.mutate({ item: fields }, done);
      return;
    }
    const changes: UpdateBudgetItemDTO = { ...fields };
    if (isRecurringEdit && effectiveFrom) {
      // The start date stays with the past; the successor starts on effectiveFrom.
      delete changes.startDate;
      changes.effectiveFrom = effectiveFrom;
    }
    save.mutate({ id: existing.id, changes }, done);
  };

  const confirmDelete = () => {
    if (!existing) return;
    Alert.alert(
      'Delete this Budget Item?',
      'It disappears from every month, past ones included. To stop it from a date instead, set an end date.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => remove.mutate(existing.id, { onSuccess: () => router.back() }),
        },
      ],
    );
  };

  return (
    <Screen
      scroll
      footer={
        <>
          <Button
            label={save.isPending ? 'Saving…' : existing ? 'Save' : 'Add'}
            disabled={!valid || save.isPending}
            onPress={submit}
          />
          {existing && (
            <Button label="Delete" variant="secondary" disabled={remove.isPending} onPress={confirmDelete} />
          )}
        </>
      }>
      <ThemedText type="subtitle">{existing ? 'Edit Budget Item' : 'New Budget Item'}</ThemedText>
      <SubcategoryPicker
        categories={categories}
        categoryId={categoryId}
        subcategoryId={subcategoryId}
        onChange={(nextCategory, nextSubcategory) => {
          setCategoryId(nextCategory);
          setSubcategoryId(nextSubcategory);
        }}
      />
      <TextField
        label="Name (optional)"
        value={name}
        onChangeText={setName}
        placeholder="Defaults to the Subcategory"
      />
      <TextField
        label={`Amount (${currency})`}
        value={amount}
        onChangeText={setAmount}
        keyboardType="decimal-pad"
        error={errors.amount}
      />
      <CurrencyPicker label="Currency" value={currency} onChange={setCurrency} />
      <ChoiceChips label="Happens" choices={KINDS} value={kind} onChange={setKind} />
      {kind === 'recurring' && (
        <View style={styles.every}>
          <View style={styles.interval}>
            <TextField
              label="Every"
              value={interval}
              onChangeText={setInterval}
              keyboardType="number-pad"
              error={errors.interval}
            />
          </View>
          <View style={styles.fill}>
            <ChoiceChips choices={UNITS} value={unit} onChange={setUnit} />
          </View>
        </View>
      )}
      <TextField
        label={kind === 'recurring' ? 'Starts' : 'Date'}
        value={startDate}
        onChangeText={setStartDate}
        placeholder="YYYY-MM-DD"
        autoCapitalize="none"
        hint={
          kind === 'recurring' && isRarerThanMonthly(recurrence)
            ? 'The first time it is due; the Annual Budget repeats it from here.'
            : undefined
        }
        error={errors.startDate}
      />
      {kind === 'recurring' && (
        <TextField
          label="Ends (optional)"
          value={endDate}
          onChangeText={setEndDate}
          placeholder="YYYY-MM-DD"
          autoCapitalize="none"
          error={errors.endDate}
        />
      )}
      {isRecurringEdit && (
        <TextField
          label="Change applies from (optional)"
          value={effectiveFrom}
          onChangeText={setEffectiveFrom}
          placeholder={firstOfMonth(shiftMonth(currentMonth(), 1))}
          autoCapitalize="none"
          hint="Set a date when the amount really changed, e.g. a rent rise, so earlier months keep their plan. Leave empty to correct a mistake everywhere."
          error={errors.effectiveFrom}
        />
      )}
      {(save.error ?? remove.error) && (
        <ThemedText accessibilityLiveRegion="polite">{(save.error ?? remove.error)?.message}</ThemedText>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  every: { flexDirection: 'row', alignItems: 'flex-end', gap: 12 },
  interval: { width: 90 },
  fill: { flex: 1 },
});
