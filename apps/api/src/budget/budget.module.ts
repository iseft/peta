import { Module } from '@nestjs/common';
import { CategoriesModule } from '../categories/categories.module';
import { ExchangeRatesModule } from '../exchange-rates/exchange-rates.module';
import { UsersModule } from '../users/users.module';
import { BudgetItemsRepository } from './budget-items.repository';
import { BudgetController } from './budget.controller';
import { BudgetService } from './budget.service';

@Module({
  imports: [UsersModule, CategoriesModule, ExchangeRatesModule],
  controllers: [BudgetController],
  providers: [BudgetService, BudgetItemsRepository],
})
export class BudgetModule {}
