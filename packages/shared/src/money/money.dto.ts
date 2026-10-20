import { z } from 'zod';

// ISO 4217 code, e.g. "HUF".
export const currencyCodeSchema = z
  .string()
  .regex(/^[A-Z]{3}$/, 'Expected a three-letter currency code');

// Integer minor units of the currency (ADR 0002).
export const amountMinorSchema = z.number().int().nonnegative().safe();

// Calendar date without time, "YYYY-MM-DD".
export const dateOnlySchema = z.iso.date();

// Currencies offered in pickers: those with daily ECB reference rates.
export const SUPPORTED_CURRENCIES = [
  'AUD', 'BRL', 'CAD', 'CHF', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP',
  'HKD', 'HUF', 'IDR', 'ILS', 'INR', 'ISK', 'JPY', 'KRW', 'MXN', 'MYR',
  'NOK', 'NZD', 'PHP', 'PLN', 'RON', 'SEK', 'SGD', 'THB', 'TRY', 'USD',
  'ZAR',
] as const;
export const supportedCurrencySchema = z.enum(SUPPORTED_CURRENCIES);
export type SupportedCurrency = z.infer<typeof supportedCurrencySchema>;

// ISO 4217 minor-unit digits, fixed here so the API and the app never depend
// on their JavaScript engine's Intl data (which shows HUF without fillér).
const ZERO_DECIMAL_CURRENCIES: ReadonlySet<string> = new Set(['ISK', 'JPY', 'KRW']);

export function currencyExponent(currency: string): number {
  return ZERO_DECIMAL_CURRENCIES.has(currency) ? 0 : 2;
}
