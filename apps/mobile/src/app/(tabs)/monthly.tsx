import type { MonthlyBudgetDTO, SubcategoryDTO } from '@peta/shared';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';

import { useCategories, useMonthlyBudget } from '@/api/queries';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { QueryState } from '@/components/query-state';
import { Row } from '@/components/row';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { currentMonth, formatMonth, shiftMonth } from '@/lib/dates';
import { formatMoney } from '@/lib/money';
import { describeRecurrence } from '@/lib/recurrence';

const CLASS_NAMES = { NEED: 'Needs', WANT: 'Wants', SAVING: 'Saving' } as const;

export default function MonthlyScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [month, setMonth] = useState(currentMonth());
  const budget = useMonthlyBudget(month);
  const categories = useCategories();

  const names = useMemo(() => {
    const categoryNames = new Map<string, string>();
    const subcategories = new Map<string, SubcategoryDTO>();
    for (const category of categories.data ?? []) {
      categoryNames.set(category.id, category.name);
      for (const subcategory of category.subcategories) subcategories.set(subcategory.id, subcategory);
    }
    return { categoryNames, subcategories };
  }, [categories.data]);

  if (!budget.data || !categories.data) {
    return (
      <QueryState
        error={budget.error ?? categories.error}
        onRetry={() => void Promise.all([budget.refetch(), categories.refetch()])}
      />
    );
  }

  const data = budget.data;
  const money = (amount: number) => formatMoney(amount, data.currency);

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl refreshing={budget.isRefetching} onRefresh={() => void budget.refetch()} />
      }>
      <View style={styles.monthSwitcher}>
        <MonthButton label="‹" accessibilityLabel="Previous month" onPress={() => setMonth(shiftMonth(month, -1))} />
        <ThemedText type="subtitle" style={styles.monthLabel}>
          {formatMonth(month)}
        </ThemedText>
        <MonthButton label="›" accessibilityLabel="Next month" onPress={() => setMonth(shiftMonth(month, 1))} />
      </View>

      <Card>
        <ThemedText type="smallBold">Balance</ThemedText>
        <Row title="Income" trailing={<ThemedText type="amount">{money(data.incomeMinor)}</ThemedText>} />
        <Row
          title="Spending"
          detail={
            data.spendingPercentOfIncome === null
              ? 'No income planned'
              : `${data.spendingPercentOfIncome}% of income`
          }
          trailing={
            <ThemedText
              type="amount"
              style={{ color: (data.spendingPercentOfIncome ?? 0) > 100 ? theme.bad : theme.text }}>
              {money(data.spendingMinor)}
            </ThemedText>
          }
        />
        <Row
          title="Remainder"
          trailing={
            <ThemedText
              type="amount"
              style={{ color: data.remainderMinor < 0 ? theme.bad : theme.good }}>
              {money(data.remainderMinor)}
            </ThemedText>
          }
        />
      </Card>

      <Card>
        <ThemedText type="smallBold">50/30/20</ThemedText>
        <View style={styles.shares}>
          {data.shares.map((share) => (
            <View key={share.budgetClass} style={styles.share}>
              <ThemedText
                type="subtitle"
                style={{
                  color: share.percentOfIncome === null ? theme.textSecondary : share.onTarget ? theme.good : theme.bad,
                }}>
                {share.percentOfIncome === null ? '–' : `${Math.round(share.percentOfIncome)}%`}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {CLASS_NAMES[share.budgetClass]} ({share.budgetClass === 'SAVING' ? '≥' : '≤'}
                {share.targetPercent}%)
              </ThemedText>
            </View>
          ))}
        </View>
      </Card>

      {data.categories.length === 0 && (
        <ThemedText themeColor="textSecondary">
          Nothing planned for this month yet. Add your income and regular costs: rent, bills,
          subscriptions, savings.
        </ThemedText>
      )}

      {data.categories.map((category) => (
        <CategorySection
          key={category.categoryId}
          category={category}
          name={names.categoryNames.get(category.categoryId) ?? category.categoryId}
          subcategories={names.subcategories}
          money={money}
          onEdit={(id) => router.push({ pathname: '/budget-item', params: { id } })}
        />
      ))}

      <Button label="Add Budget Item" onPress={() => router.push('/budget-item')} />
    </ScrollView>
  );
}

function MonthButton(props: { label: string; accessibilityLabel: string; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={props.accessibilityLabel}
      onPress={props.onPress}
      style={styles.monthButton}>
      <ThemedText type="subtitle">{props.label}</ThemedText>
    </Pressable>
  );
}

type CategorySectionProps = {
  category: MonthlyBudgetDTO['categories'][number];
  name: string;
  subcategories: Map<string, SubcategoryDTO>;
  money: (amount: number) => string;
  onEdit: (budgetItemId: string) => void;
};

function CategorySection({ category, name, subcategories, money, onEdit }: CategorySectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <ThemedText type="smallBold">{name}</ThemedText>
        <ThemedText type="amount">{money(category.totalMinor)}</ThemedText>
      </View>
      {category.lines.map(({ budgetItem, monthlyAmountMinor }) => {
        const subcategory = subcategories.get(budgetItem.subcategoryId);
        const title = budgetItem.name ?? subcategory?.name ?? 'Budget Item';
        const details = [describeRecurrence(budgetItem.recurrence)];
        if (budgetItem.name && subcategory) details.unshift(subcategory.name);
        details.push(formatMoney(budgetItem.amountMinor, budgetItem.currency));
        return (
          <Row
            key={budgetItem.id}
            title={title}
            detail={details.join(' · ')}
            trailing={<ThemedText type="amount">{money(monthlyAmountMinor)}</ThemedText>}
            onPress={() => onEdit(budgetItem.id)}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, gap: 16, paddingBottom: 48 },
  monthSwitcher: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  monthLabel: { flex: 1, textAlign: 'center' },
  monthButton: { minWidth: 48, minHeight: 48, alignItems: 'center', justifyContent: 'center' },
  shares: { flexDirection: 'row', justifyContent: 'space-between' },
  share: { alignItems: 'center', flex: 1 },
  section: { gap: 2 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 4 },
});
