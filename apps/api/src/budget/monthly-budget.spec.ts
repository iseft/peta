import type { BudgetItemDTO } from '@peta/shared';
import {
  buildMonthlyBudget,
  isInMonthlyBudget,
  monthlyFactor,
  type PlannedItem,
} from './monthly-budget';

function budgetItem(overrides: Partial<BudgetItemDTO> = {}): BudgetItemDTO {
  return {
    id: 'item',
    subcategoryId: 'sub',
    name: null,
    amountMinor: 100000,
    currency: 'HUF',
    recurrence: { unit: 'MONTH', interval: 1 },
    startDate: '2026-01-01',
    endDate: null,
    ...overrides,
  };
}

function planned(
  categoryId: string,
  amount: number,
  overrides: Partial<PlannedItem> = {},
  item: Partial<BudgetItemDTO> = {},
): PlannedItem {
  return {
    budgetItem: budgetItem({ id: `${categoryId}-${amount}`, ...item }),
    categoryId,
    categoryKind: 'EXPENSE',
    budgetClass: 'NEED',
    amountInDefaultMinor: amount,
    ...overrides,
  };
}

describe('monthlyFactor', () => {
  it('spreads rarer costs over the months between them', () => {
    expect(monthlyFactor({ unit: 'MONTH', interval: 3 })).toBeCloseTo(1 / 3);
    expect(monthlyFactor({ unit: 'YEAR', interval: 1 })).toBeCloseTo(1 / 12);
  });

  it('counts 52 weeks a year', () => {
    expect(monthlyFactor({ unit: 'WEEK', interval: 2 })).toBeCloseTo(26 / 12);
  });
});

describe('isInMonthlyBudget', () => {
  it('leaves out one-off items', () => {
    expect(isInMonthlyBudget(budgetItem({ recurrence: null }), '2026-03')).toBe(
      false,
    );
  });

  it('includes an item from the month it starts to the month it ends', () => {
    const item = budgetItem({ startDate: '2026-03-31', endDate: '2026-05-01' });

    expect(isInMonthlyBudget(item, '2026-02')).toBe(false);
    expect(isInMonthlyBudget(item, '2026-03')).toBe(true);
    expect(isInMonthlyBudget(item, '2026-05')).toBe(true);
    expect(isInMonthlyBudget(item, '2026-06')).toBe(false);
  });
});

describe('buildMonthlyBudget', () => {
  const order = ['income', 'housing', 'hobbies', 'saving'];

  it('balances income against spending and computes 50/30/20 shares', () => {
    const budget = buildMonthlyBudget(
      '2026-03',
      'HUF',
      [
        planned('income', 1000000, {
          categoryKind: 'INCOME',
          budgetClass: null,
        }),
        planned('housing', 450000),
        planned('hobbies', 350000, { budgetClass: 'WANT' }),
        planned('saving', 150000, { budgetClass: 'SAVING' }),
      ],
      order,
    );

    expect(budget.incomeMinor).toBe(1000000);
    expect(budget.spendingMinor).toBe(950000);
    expect(budget.spendingPercentOfIncome).toBe(95);
    expect(budget.remainderMinor).toBe(50000);
    expect(budget.shares).toEqual([
      expect.objectContaining({
        budgetClass: 'NEED',
        percentOfIncome: 45,
        onTarget: true,
      }),
      expect.objectContaining({
        budgetClass: 'WANT',
        percentOfIncome: 35,
        onTarget: false,
      }),
      expect.objectContaining({
        budgetClass: 'SAVING',
        percentOfIncome: 15,
        onTarget: false,
      }),
    ]);
  });

  it('counts a quarterly cost at a third of its amount', () => {
    const budget = buildMonthlyBudget(
      '2026-03',
      'HUF',
      [
        planned(
          'housing',
          30000,
          {},
          { recurrence: { unit: 'MONTH', interval: 3 } },
        ),
      ],
      order,
    );

    expect(budget.categories[0]).toEqual(
      expect.objectContaining({ categoryId: 'housing', totalMinor: 10000 }),
    );
  });

  it('keeps Category order and leaves out Categories with nothing planned', () => {
    const budget = buildMonthlyBudget(
      '2026-03',
      'HUF',
      [planned('saving', 1, { budgetClass: 'SAVING' }), planned('housing', 1)],
      order,
    );

    expect(budget.categories.map((c) => c.categoryId)).toEqual([
      'housing',
      'saving',
    ]);
  });

  it('has no percentages without income', () => {
    const budget = buildMonthlyBudget(
      '2026-03',
      'HUF',
      [planned('housing', 1)],
      order,
    );

    expect(budget.spendingPercentOfIncome).toBeNull();
    expect(budget.shares.every((share) => !share.onTarget)).toBe(true);
  });
});
