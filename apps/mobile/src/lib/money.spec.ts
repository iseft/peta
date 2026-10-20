import { moneyInputText, parseMoney } from '@/lib/money';

describe('parseMoney', () => {
  it('reads whole amounts in minor units', () => {
    expect(parseMoney('200000', 'HUF')).toBe(20000000);
    expect(parseMoney('200 000', 'HUF')).toBe(20000000);
  });

  it('reads a comma or a dot as the decimal separator', () => {
    expect(parseMoney('12,5', 'EUR')).toBe(1250);
    expect(parseMoney('12.50', 'EUR')).toBe(1250);
  });

  it('treats a separator before three digits as grouping', () => {
    expect(parseMoney('1,234', 'EUR')).toBe(123400);
    expect(parseMoney('1.234.567', 'HUF')).toBe(123456700);
  });

  it('refuses text that is not an amount', () => {
    expect(parseMoney('', 'EUR')).toBeNull();
    expect(parseMoney('-5', 'EUR')).toBeNull();
    expect(parseMoney('abc', 'EUR')).toBeNull();
  });

  it('handles currencies without minor units', () => {
    expect(parseMoney('1500', 'JPY')).toBe(1500);
  });
});

describe('moneyInputText', () => {
  it('round-trips through parseMoney', () => {
    for (const [amount, currency] of [
      [20000000, 'HUF'],
      [1250, 'EUR'],
      [1205, 'EUR'],
      [1500, 'JPY'],
    ] as const) {
      expect(parseMoney(moneyInputText(amount, currency), currency)).toBe(amount);
    }
  });
});
