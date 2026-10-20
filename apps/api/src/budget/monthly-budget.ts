import type {
  BudgetClass,
  BudgetClassShareDTO,
  BudgetItemDTO,
  MonthlyBudgetCategoryDTO,
  MonthlyBudgetDTO,
  RecurrenceDTO,
  SupportedCurrency,
} from '@peta/shared';
import { monthBounds } from '../common/dates/date-only';

export interface PlannedItem {
  budgetItem: BudgetItemDTO;
  categoryId: string;
  categoryKind: 'INCOME' | 'EXPENSE';
  budgetClass: BudgetClass | null;
  // The full amount converted into the Default Currency.
  amountInDefaultMinor: number;
}

// 50/30/20: Needs and Wants at most, Saving at least.
const TARGETS: Record<BudgetClass, { percent: number; atMost: boolean }> = {
  NEED: { percent: 50, atMost: true },
  WANT: { percent: 30, atMost: true },
  SAVING: { percent: 20, atMost: false },
};

export function monthlyFactor(recurrence: RecurrenceDTO): number {
  switch (recurrence.unit) {
    case 'WEEK':
      return 52 / 12 / recurrence.interval;
    case 'MONTH':
      return 1 / recurrence.interval;
    case 'YEAR':
      return 1 / (12 * recurrence.interval);
  }
}

// A recurring item counts in every month it overlaps; one-off items belong
// to the Annual Budget only.
export function isInMonthlyBudget(item: BudgetItemDTO, month: string): boolean {
  if (!item.recurrence) return false;
  const { first, last } = monthBounds(month);
  return item.startDate <= last && (!item.endDate || item.endDate >= first);
}

function percentOf(part: number, whole: number): number | null {
  return whole > 0 ? Math.round((part / whole) * 1000) / 10 : null;
}

export function buildMonthlyBudget(
  month: string,
  currency: SupportedCurrency,
  items: PlannedItem[],
  categoryOrder: string[],
): MonthlyBudgetDTO {
  const byCategory = new Map<string, MonthlyBudgetCategoryDTO>();
  const byClass: Record<BudgetClass, number> = { NEED: 0, WANT: 0, SAVING: 0 };
  let incomeMinor = 0;
  let spendingMinor = 0;

  for (const item of items) {
    if (!isInMonthlyBudget(item.budgetItem, month)) continue;
    const monthlyAmountMinor = Math.round(
      item.amountInDefaultMinor * monthlyFactor(item.budgetItem.recurrence!),
    );

    const category = byCategory.get(item.categoryId) ?? {
      categoryId: item.categoryId,
      totalMinor: 0,
      lines: [],
    };
    category.totalMinor += monthlyAmountMinor;
    category.lines.push({ budgetItem: item.budgetItem, monthlyAmountMinor });
    byCategory.set(item.categoryId, category);

    if (item.categoryKind === 'INCOME') {
      incomeMinor += monthlyAmountMinor;
    } else {
      spendingMinor += monthlyAmountMinor;
      if (item.budgetClass) byClass[item.budgetClass] += monthlyAmountMinor;
    }
  }

  const shares: BudgetClassShareDTO[] = (
    Object.keys(TARGETS) as BudgetClass[]
  ).map((budgetClass) => {
    const target = TARGETS[budgetClass];
    const percentOfIncome = percentOf(byClass[budgetClass], incomeMinor);
    return {
      budgetClass,
      amountMinor: byClass[budgetClass],
      percentOfIncome,
      targetPercent: target.percent,
      onTarget:
        percentOfIncome === null
          ? false
          : target.atMost
            ? percentOfIncome <= target.percent
            : percentOfIncome >= target.percent,
    };
  });

  return {
    month,
    currency,
    incomeMinor,
    spendingMinor,
    spendingPercentOfIncome: percentOf(spendingMinor, incomeMinor),
    remainderMinor: incomeMinor - spendingMinor,
    shares,
    categories: categoryOrder
      .map((id) => byCategory.get(id))
      .filter((category) => category !== undefined),
  };
}
