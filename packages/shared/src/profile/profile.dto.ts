import { z } from 'zod';
import {
  amountMinorSchema,
  dateOnlySchema,
  supportedCurrencySchema,
} from '../money/money.dto';

export const paymentDetailSchema = z.object({
  id: z.string(),
  label: z.string(),
  holderName: z.string().nullable(),
  value: z.string(),
  position: z.number().int(),
});
export type PaymentDetailDTO = z.infer<typeof paymentDetailSchema>;

export const savePaymentDetailSchema = z.object({
  label: z.string().trim().min(1).max(60),
  holderName: z.string().trim().max(100).nullable().optional(),
  value: z.string().trim().min(1).max(100),
});
export type SavePaymentDetailDTO = z.infer<typeof savePaymentDetailSchema>;

export const openingBalanceSchema = z.object({
  amountMinor: amountMinorSchema,
  currency: supportedCurrencySchema,
  date: dateOnlySchema,
});
export type OpeningBalanceDTO = z.infer<typeof openingBalanceSchema>;

export const profileSchema = z.object({
  email: z.string().nullable(),
  name: z.string().nullable(),
  defaultCurrency: supportedCurrencySchema.nullable(),
  openingBalance: openingBalanceSchema.nullable(),
  emergencyFundTargetMonths: z.number().int(),
  onboarded: z.boolean(),
  paymentDetails: z.array(paymentDetailSchema),
});
export type ProfileDTO = z.infer<typeof profileSchema>;

export const emergencyFundTargetMonthsSchema = z.number().int().min(0).max(60);

export const completeOnboardingSchema = z.object({
  defaultCurrency: supportedCurrencySchema,
  openingBalance: openingBalanceSchema,
  emergencyFundTargetMonths: emergencyFundTargetMonthsSchema,
});
export type CompleteOnboardingDTO = z.infer<typeof completeOnboardingSchema>;

export const updateProfileSchema = z.object({
  name: z.string().trim().max(100).nullable().optional(),
  openingBalance: openingBalanceSchema.optional(),
  emergencyFundTargetMonths: emergencyFundTargetMonthsSchema.optional(),
});
export type UpdateProfileDTO = z.infer<typeof updateProfileSchema>;
