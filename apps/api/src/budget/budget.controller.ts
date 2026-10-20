import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  createBudgetItemSchema,
  updateBudgetItemSchema,
  type BudgetItemDTO,
  type CreateBudgetItemDTO,
  type MonthlyBudgetDTO,
  type UpdateBudgetItemDTO,
} from '@peta/shared';
import { z } from 'zod';
import { ClerkUserId } from '../auth/decorators/clerk-user-id.decorator';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { BudgetService } from './budget.service';

const monthSchema = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/);

@Controller()
export class BudgetController {
  constructor(private readonly budget: BudgetService) {}

  @Get('budget-items')
  findBudgetItems(@ClerkUserId() clerkId: string): Promise<BudgetItemDTO[]> {
    return this.budget.findBudgetItems(clerkId);
  }

  @Post('budget-items')
  createBudgetItem(
    @ClerkUserId() clerkId: string,
    @Body(new ZodValidationPipe(createBudgetItemSchema))
    body: CreateBudgetItemDTO,
  ): Promise<BudgetItemDTO> {
    return this.budget.createBudgetItem(clerkId, body);
  }

  @Patch('budget-items/:id')
  updateBudgetItem(
    @ClerkUserId() clerkId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(updateBudgetItemSchema))
    body: UpdateBudgetItemDTO,
  ): Promise<BudgetItemDTO> {
    return this.budget.updateBudgetItem(clerkId, id, body);
  }

  @Delete('budget-items/:id')
  @HttpCode(204)
  deleteBudgetItem(
    @ClerkUserId() clerkId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    return this.budget.deleteBudgetItem(clerkId, id);
  }

  // `month` is "YYYY-MM".
  @Get('monthly-budget')
  getMonthlyBudget(
    @ClerkUserId() clerkId: string,
    @Query('month', new ZodValidationPipe(monthSchema)) month: string,
  ): Promise<MonthlyBudgetDTO> {
    return this.budget.getMonthlyBudget(clerkId, month);
  }
}
