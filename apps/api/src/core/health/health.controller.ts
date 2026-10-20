import { Controller, Get } from '@nestjs/common';
import type { HealthStatusDTO } from '@peta/shared';
import { Public } from '../../auth/decorators/public.decorator';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly health: HealthService) {}

  @Public()
  @Get()
  getHealth(): Promise<HealthStatusDTO> {
    return this.health.check();
  }
}
