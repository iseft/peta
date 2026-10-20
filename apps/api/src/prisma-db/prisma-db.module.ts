import { Global, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { PrismaClientExceptionFilter } from './filters/prisma-client-exception.filter';
import { PrismaDbService } from './prisma-db.service';

@Global()
@Module({
  providers: [
    PrismaDbService,
    { provide: APP_FILTER, useClass: PrismaClientExceptionFilter },
  ],
  exports: [PrismaDbService],
})
export class PrismaDbModule {}
