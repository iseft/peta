import { Injectable } from '@nestjs/common';
import { AppConfigService } from '../app-config/app-config.service';

export interface EcbRates {
  // The working day the rates are from, which may be before the one asked for.
  date: string;
  // Units of each currency per 1 EUR.
  rates: Record<string, number>;
}

// ECB reference rates through the Frankfurter API (no key needed).
@Injectable()
export class EcbRatesClient {
  constructor(private readonly appConfig: AppConfigService) {}

  async fetchEcbRates(date: string): Promise<EcbRates> {
    const response = await fetch(`${this.appConfig.fxApiUrl}/${date}?base=EUR`);
    if (!response.ok) {
      throw new Error(`Exchange rates for ${date}: HTTP ${response.status}`);
    }
    const body = (await response.json()) as EcbRates;
    return { date: body.date, rates: { ...body.rates, EUR: 1 } };
  }
}
