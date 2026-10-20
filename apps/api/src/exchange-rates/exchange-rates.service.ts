import { Injectable } from '@nestjs/common';
import { Prisma } from '@db';
import { todayDateOnly } from '../common/dates/date-only';
import { EcbRatesClient } from './ecb-rates.client';
import { ExchangeRatesRepository } from './exchange-rates.repository';

@Injectable()
export class ExchangeRatesService {
  constructor(
    private readonly exchangeRates: ExchangeRatesRepository,
    private readonly ecb: EcbRatesClient,
  ) {}

  // Units of `to` per unit of `from` on `date` (ADR 0002). A future date,
  // such as a Budget Item starting next month, takes today's rate.
  async findRate(
    from: string,
    to: string,
    date: string,
  ): Promise<Prisma.Decimal> {
    if (from === to) return new Prisma.Decimal(1);
    const today = todayDateOnly();
    const day = date > today ? today : date;

    let rows = await this.exchangeRates.findExchangeRates(day, [from, to]);
    if (rows.length < 2) {
      const { rates } = await this.ecb.fetchEcbRates(day);
      await this.exchangeRates.createExchangeRates(day, rates);
      rows = await this.exchangeRates.findExchangeRates(day, [from, to]);
    }

    const perEuro = new Map(rows.map((row) => [row.currency, row.rate]));
    const fromPerEuro = perEuro.get(from);
    const toPerEuro = perEuro.get(to);
    if (!fromPerEuro || !toPerEuro) {
      throw new Error(`No exchange rate between ${from} and ${to} on ${day}`);
    }
    return toPerEuro.dividedBy(fromPerEuro);
  }
}
