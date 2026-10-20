import { currencyExponent } from '@peta/shared';

export function formatMoney(amountMinor: number, currency: string): string {
  const exponent = currencyExponent(currency);
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    // Whole units unless there is a fraction to show, so HUF reads "200,000 Ft".
    minimumFractionDigits: amountMinor % 10 ** exponent === 0 ? 0 : exponent,
    maximumFractionDigits: exponent,
  }).format(amountMinor / 10 ** exponent);
}

// "1 234,5" or "1,234.50" → minor units; null when it isn't an amount. A
// single comma or dot followed by at most `exponent` digits is the decimal
// separator; spaces and other separators are grouping.
export function parseMoney(text: string, currency: string): number | null {
  const exponent = currencyExponent(currency);
  const compact = text.replace(/[\s ']/g, '');
  if (!/^\d[\d.,]*$/.test(compact)) return null;
  const match = compact.match(/^(.*?)(?:[.,](\d+))?$/);
  if (!match) return null;
  let [, whole, fraction = ''] = match;
  if (fraction.length > exponent) {
    // "1,234" in a currency without decimals, or a thousands separator.
    whole = compact;
    fraction = '';
  }
  const digits = whole.replace(/[.,]/g, '');
  if (!/^\d+$/.test(digits)) return null;
  return Number(digits) * 10 ** exponent + Number(fraction.padEnd(exponent, '0') || 0);
}

// The editable text for an amount, without grouping.
export function moneyInputText(amountMinor: number, currency: string): string {
  const exponent = currencyExponent(currency);
  const whole = Math.floor(amountMinor / 10 ** exponent);
  const fraction = amountMinor % 10 ** exponent;
  return fraction === 0 ? String(whole) : `${whole}.${String(fraction).padStart(exponent, '0')}`;
}
