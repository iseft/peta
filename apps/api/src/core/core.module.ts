import { Module } from '@nestjs/common';
import { PrismaDbModule } from '../prisma-db/prisma-db.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [PrismaDbModule, HealthModule],
})
export class CoreModule {}
