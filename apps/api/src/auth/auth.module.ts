import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ClerkUsersClient } from './clerk-users.client';
import { AuthGuard } from './guards/auth.guard';
import { ClerkUserAuthGuard } from './guards/clerk-user-auth.guard';

@Module({
  providers: [
    ClerkUserAuthGuard,
    ClerkUsersClient,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
  exports: [ClerkUsersClient],
})
export class AuthModule {}
