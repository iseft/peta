import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@db';

@Injectable()
export class PrismaDbService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
