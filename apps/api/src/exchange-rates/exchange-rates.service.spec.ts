import { Prisma } from '@db';
import { ExchangeRatesService } from './exchange-rates.service';

function row(currency: string, rate: number) {
  return { date: new Date(), currency, rate: new Prisma.Decimal(rate) };
}

describe('ExchangeRatesService.findRate', () => {
  it('is 1 between the same currency without any lookup', async () => {
    const repository = { findExchangeRates: jest.fn() };
    const service = new ExchangeRatesService(repository as any, {} as any);

    expect(
      (await service.findRate('HUF', 'HUF', '2026-01-05')).toNumber(),
    ).toBe(1);
    expect(repository.findExchangeRates).not.toHaveBeenCalled();
  });

  it('crosses two currencies through the euro', async () => {
    const repository = {
      findExchangeRates: jest
        .fn()
        .mockResolvedValue([row('HUF', 400), row('USD', 1.25)]),
    };
    const service = new ExchangeRatesService(repository as any, {} as any);

    const rate = await service.findRate('USD', 'HUF', '2026-01-05');

    expect(rate.toNumber()).toBe(320);
  });

  it('fetches and caches a day it has not seen', async () => {
    const repository = {
      findExchangeRates: jest
        .fn()
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([row('EUR', 1), row('HUF', 400)]),
      createExchangeRates: jest.fn().mockResolvedValue(undefined),
    };
    const ecb = {
      fetchEcbRates: jest
        .fn()
        .mockResolvedValue({ date: '2026-01-02', rates: { EUR: 1, HUF: 400 } }),
    };
    const service = new ExchangeRatesService(repository as any, ecb as any);

    const rate = await service.findRate('EUR', 'HUF', '2026-01-03');

    expect(ecb.fetchEcbRates).toHaveBeenCalledWith('2026-01-03');
    expect(repository.createExchangeRates).toHaveBeenCalledWith('2026-01-03', {
      EUR: 1,
      HUF: 400,
    });
    expect(rate.toNumber()).toBe(400);
  });

  it('uses today for a future date', async () => {
    jest.useFakeTimers().setSystemTime(new Date('2026-03-10T12:00:00Z'));
    const repository = {
      findExchangeRates: jest
        .fn()
        .mockResolvedValue([row('EUR', 1), row('HUF', 400)]),
    };
    const service = new ExchangeRatesService(repository as any, {} as any);

    await service.findRate('EUR', 'HUF', '2027-01-01');

    expect(repository.findExchangeRates).toHaveBeenCalledWith('2026-03-10', [
      'EUR',
      'HUF',
    ]);
    jest.useRealTimers();
  });
});
