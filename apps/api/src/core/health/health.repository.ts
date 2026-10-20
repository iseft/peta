import { Injectable } from '@nestjs/common';
import { PrismaDbService } from '../../prisma-db/prisma-db.service';

@Injectable()
export class HealthRepository {
  constructor(private readonly prisma: PrismaDbService) {}

  async ping(): Promise<void> {
    await this.prisma.$queryRaw`SELECT 1`;
  }
}
