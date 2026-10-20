import { Injectable } from '@nestjs/common';
import { Prisma, type ExchangeRate } from '@db';
import { parseDateOnly } from '../common/dates/date-only';
import { PrismaDbService } from '../prisma-db/prisma-db.service';

@Injectable()
export class ExchangeRatesRepository {
  constructor(private readonly prisma: PrismaDbService) {}

  findExchangeRates(
    date: string,
    currencies: string[],
  ): Promise<ExchangeRate[]> {
    return this.prisma.exchangeRate.findMany({
      where: { date: parseDateOnly(date), currency: { in: currencies } },
    });
  }

  async createExchangeRates(
    date: string,
    rates: Record<string, number>,
  ): Promise<void> {
    await this.prisma.exchangeRate.createMany({
      data: Object.entries(rates).map(([currency, rate]) => ({
        date: parseDateOnly(date),
        currency,
        rate: new Prisma.Decimal(rate),
      })),
      skipDuplicates: true,
    });
  }
}
