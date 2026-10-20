import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import type { HealthStatusDTO } from '@peta/shared';
import { HealthRepository } from './health.repository';

@Injectable()
export class HealthService {
  constructor(private readonly health: HealthRepository) {}

  async check(): Promise<HealthStatusDTO> {
    try {
      await this.health.ping();
    } catch {
      throw new ServiceUnavailableException('Database unavailable');
    }

    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
