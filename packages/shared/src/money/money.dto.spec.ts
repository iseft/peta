import { SUPPORTED_CURRENCIES, currencyExponent } from './money.dto';

describe('currencyExponent', () => {
  it('follows ISO 4217, HUF included', () => {
    expect(currencyExponent('HUF')).toBe(2);
    expect(currencyExponent('EUR')).toBe(2);
    expect(currencyExponent('JPY')).toBe(0);
  });

  it('covers every supported currency', () => {
    for (const currency of SUPPORTED_CURRENCIES) {
      expect([0, 2]).toContain(currencyExponent(currency));
    }
  });
});
