import { Module } from '@nestjs/common';
import { EcbRatesClient } from './ecb-rates.client';
import { ExchangeRatesRepository } from './exchange-rates.repository';
import { ExchangeRatesService } from './exchange-rates.service';

@Module({
  providers: [ExchangeRatesService, ExchangeRatesRepository, EcbRatesClient],
  exports: [ExchangeRatesService],
})
export class ExchangeRatesModule {}
