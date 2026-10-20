import { z } from 'zod';
import {
  amountMinorSchema,
  dateOnlySchema,
  supportedCurrencySchema,
} from '../money/money.dto';
import { budgetClassSchema } from '../categories/categories.dto';

export const recurrenceUnitSchema = z.enum(['WEEK', 'MONTH', 'YEAR']);
export type RecurrenceUnit = z.infer<typeof recurrenceUnitSchema>;

export const recurrenceSchema = z.object({
  unit: recurrenceUnitSchema,
  interval: z.number().int().min(1).max(120),
});
export type RecurrenceDTO = z.infer<typeof recurrenceSchema>;

export const budgetItemSchema = z.object({
  id: z.string(),
  subcategoryId: z.string(),
  name: z.string().nullable(),
  amountMinor: amountMinorSchema,
  currency: supportedCurrencySchema,
  // Null for a one-off Budget Item, which falls on startDate.
  recurrence: recurrenceSchema.nullable(),
  startDate: dateOnlySchema,
  endDate: dateOnlySchema.nullable(),
});
export type BudgetItemDTO = z.infer<typeof budgetItemSchema>;

const budgetItemFields = z.object({
  subcategoryId: z.string().min(1),
  name: z.string().trim().max(100).nullable().optional(),
  amountMinor: amountMinorSchema,
  currency: supportedCurrencySchema,
  recurrence: recurrenceSchema.nullable(),
  startDate: dateOnlySchema,
  endDate: dateOnlySchema.nullable().optional(),
});

const endsAfterStart = (item: { startDate?: string; endDate?: string | null }) =>
  !item.startDate || !item.endDate || item.endDate >= item.startDate;

export const createBudgetItemSchema = budgetItemFields.refine(endsAfterStart, {
  message: 'End date must not be before the start date',
  path: ['endDate'],
});
export type CreateBudgetItemDTO = z.infer<typeof createBudgetItemSchema>;

// With effectiveFrom, a recurring item is not rewritten: it ends the day
// before and a new item carries the change from that date (ADR 0003).
export const updateBudgetItemSchema = budgetItemFields
  .partial()
  .extend({ effectiveFrom: dateOnlySchema.optional() })
  .refine(endsAfterStart, {
    message: 'End date must not be before the start date',
    path: ['endDate'],
  });
export type UpdateBudgetItemDTO = z.infer<typeof updateBudgetItemSchema>;

// Amounts in the summary are in the user's Default Currency.
export const monthlyBudgetLineSchema = z.object({
  budgetItem: budgetItemSchema,
  monthlyAmountMinor: z.number().int(),
});
export type MonthlyBudgetLineDTO = z.infer<typeof monthlyBudgetLineSchema>;

export const monthlyBudgetCategorySchema = z.object({
  categoryId: z.string(),
  totalMinor: z.number().int(),
  lines: z.array(monthlyBudgetLineSchema),
});
export type MonthlyBudgetCategoryDTO = z.infer<
  typeof monthlyBudgetCategorySchema
>;

export const budgetClassShareSchema = z.object({
  budgetClass: budgetClassSchema,
  amountMinor: z.number().int(),
  // Share of income in percent; null when there is no income.
  percentOfIncome: z.number().nullable(),
  targetPercent: z.number(),
  onTarget: z.boolean(),
});
export type BudgetClassShareDTO = z.infer<typeof budgetClassShareSchema>;

export const monthlyBudgetSchema = z.object({
  month: z.string().regex(/^\d{4}-\d{2}$/),
  currency: supportedCurrencySchema,
  incomeMinor: z.number().int(),
  spendingMinor: z.number().int(),
  // Spending as a percent of income; null when there is no income.
  spendingPercentOfIncome: z.number().nullable(),
  remainderMinor: z.number().int(),
  shares: z.array(budgetClassShareSchema),
  categories: z.array(monthlyBudgetCategorySchema),
});
export type MonthlyBudgetDTO = z.infer<typeof monthlyBudgetSchema>;
