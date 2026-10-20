import { Prisma } from '@db';
import { currencyExponent } from '@peta/shared';

// `rate` is units of `to` per unit of `from` (ADR 0002). Rounds to the
// nearest minor unit of `to`.
export function convertMinor(
  amountMinor: number,
  from: string,
  to: string,
  rate: Prisma.Decimal | number,
): number {
  if (from === to) return amountMinor;
  const shift = currencyExponent(to) - currencyExponent(from);
  return new Prisma.Decimal(amountMinor)
    .times(rate)
    .times(new Prisma.Decimal(10).pow(shift))
    .toDecimalPlaces(0, Prisma.Decimal.ROUND_HALF_UP)
    .toNumber();
}

// Prisma returns BigInt for money columns; amounts stay far below 2^53.
export function toAmountNumber(value: bigint): number {
  return Number(value);
}
