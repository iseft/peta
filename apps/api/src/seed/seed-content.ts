import type { BudgetClass, CategoryKind } from '@db';

export interface SeedCategory {
  id: string;
  name: string;
  kind: CategoryKind;
  budgetClass: BudgetClass | null;
  plannable: boolean;
  position: number;
}

// The fixed Categories and their 50/30/20 Budget Classes (docs/mvp-spec.md).
// Ids are permanent: Subcategories point at them.
export const SEED_CATEGORIES: SeedCategory[] = [
  ['income', 'Income', 'INCOME', null],
  ['housing', 'Housing', 'EXPENSE', 'NEED'],
  ['food', 'Food', 'EXPENSE', 'NEED'],
  ['transport', 'Transport', 'EXPENSE', 'NEED'],
  ['household', 'Household', 'EXPENSE', 'NEED'],
  ['clothing', 'Clothing', 'EXPENSE', 'NEED'],
  ['health', 'Health', 'EXPENSE', 'NEED'],
  ['insurance', 'Insurance', 'EXPENSE', 'NEED'],
  ['debt-repayment', 'Debt Repayment', 'EXPENSE', 'NEED'],
  ['services-subscriptions', 'Services & Subscriptions', 'EXPENSE', 'WANT'],
  ['hobbies', 'Hobbies', 'EXPENSE', 'WANT'],
  ['social', 'Social', 'EXPENSE', 'WANT'],
  ['travel', 'Travel', 'EXPENSE', 'WANT'],
  ['charity', 'Charity', 'EXPENSE', 'WANT'],
  ['other', 'Other', 'EXPENSE', 'WANT'],
  ['saving', 'Saving', 'EXPENSE', 'SAVING'],
  ['bank-fees', 'Bank Fees', 'EXPENSE', null],
].map(([id, name, kind, budgetClass], position) => ({
  id: id as string,
  name: name as string,
  kind: kind as CategoryKind,
  budgetClass: budgetClass as BudgetClass | null,
  plannable: id !== 'bank-fees',
  position,
}));
