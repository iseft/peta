import { convertMinor } from './convert';

describe('convertMinor', () => {
  it('leaves an amount in the same currency untouched', () => {
    expect(convertMinor(12345, 'HUF', 'HUF', 999)).toBe(12345);
  });

  it('converts with the rate and rounds to the nearest minor unit', () => {
    // 10.00 EUR at 395.123 HUF/EUR = 3951.23 HUF
    expect(convertMinor(1000, 'EUR', 'HUF', 395.123)).toBe(395123);
  });

  it('accounts for different minor units', () => {
    // 1000 JPY at 0.0061 EUR/JPY = 6.10 EUR
    expect(convertMinor(1000, 'JPY', 'EUR', 0.0061)).toBe(610);
  });
});
