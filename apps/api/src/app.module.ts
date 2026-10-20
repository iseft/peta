import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup';
import { AppConfigModule } from './app-config/app-config.module';
import { AuthModule } from './auth/auth.module';
import { BudgetModule } from './budget/budget.module';
import { CategoriesModule } from './categories/categories.module';
import { CoreModule } from './core/core.module';
import { ProfileModule } from './profile/profile.module';
import { UsersModule } from './users/users.module';

@Module({
  providers: [
    { provide: APP_FILTER, useClass: SentryGlobalFilter },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
  imports: [
    SentryModule.forRoot(),
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 60000, limit: 120 }],
      skipIf: () => process.env.NODE_ENV === 'test',
    }),
    AppConfigModule,
    CoreModule,
    AuthModule,
    UsersModule,
    ProfileModule,
    CategoriesModule,
    BudgetModule,
  ],
})
export class AppModule {}
