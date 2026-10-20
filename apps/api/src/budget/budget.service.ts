import { Injectable } from '@nestjs/common';
import type { BudgetItem, Prisma } from '@db';
import type {
  BudgetItemDTO,
  CreateBudgetItemDTO,
  MonthlyBudgetDTO,
  SupportedCurrency,
  UpdateBudgetItemDTO,
} from '@peta/shared';
import { CategoriesService } from '../categories/categories.service';
import { addDays, parseDateOnly } from '../common/dates/date-only';
import { NotFoundError } from '../common/exceptions/not-found-error';
import { ValidationError } from '../common/exceptions/validation-error';
import { convertMinor, toAmountNumber } from '../common/money/convert';
import { ExchangeRatesService } from '../exchange-rates/exchange-rates.service';
import { UsersService } from '../users/users.service';
import { toBudgetItemDTO } from './budget-items.mapper';
import { BudgetItemsRepository } from './budget-items.repository';
import { buildMonthlyBudget } from './monthly-budget';

type BudgetItemFields = Omit<CreateBudgetItemDTO, 'name' | 'endDate'> & {
  name: string | null;
  endDate: string | null;
};

@Injectable()
export class BudgetService {
  constructor(
    private readonly users: UsersService,
    private readonly categories: CategoriesService,
    private readonly budgetItems: BudgetItemsRepository,
    private readonly exchangeRates: ExchangeRatesService,
  ) {}

  async findBudgetItems(clerkId: string): Promise<BudgetItemDTO[]> {
    const user = await this.users.getOnboardedUser(clerkId);
    const items = await this.budgetItems.findBudgetItems(user.id);
    return items.map(toBudgetItemDTO);
  }

  async createBudgetItem(
    clerkId: string,
    input: CreateBudgetItemDTO,
  ): Promise<BudgetItemDTO> {
    const user = await this.users.getOnboardedUser(clerkId);
    const fields: BudgetItemFields = {
      ...input,
      name: input.name ?? null,
      endDate: input.endDate ?? null,
    };
    await this.requirePlannableSubcategory(user.id, fields.subcategoryId);
    const item = await this.budgetItems.createBudgetItem(
      await this.toCreateInput(user.id, user.defaultCurrency, fields),
    );
    return toBudgetItemDTO(item);
  }

  // With effectiveFrom after a recurring item's start, the item keeps its
  // past: it ends the day before and a successor carries the change (ADR
  // 0003). Without it, the edit corrects the item everywhere.
  async updateBudgetItem(
    clerkId: string,
    id: string,
    input: UpdateBudgetItemDTO,
  ): Promise<BudgetItemDTO> {
    const user = await this.users.getOnboardedUser(clerkId);
    const existing = await this.requireBudgetItem(user.id, id);
    const { effectiveFrom, ...changes } = input;
    const current = toBudgetItemDTO(existing);
    const merged: BudgetItemFields = {
      subcategoryId: changes.subcategoryId ?? current.subcategoryId,
      name: changes.name === undefined ? current.name : changes.name,
      amountMinor: changes.amountMinor ?? current.amountMinor,
      currency: changes.currency ?? current.currency,
      recurrence:
        changes.recurrence === undefined
          ? current.recurrence
          : changes.recurrence,
      startDate: changes.startDate ?? current.startDate,
      endDate:
        changes.endDate === undefined ? current.endDate : changes.endDate,
    };
    if (merged.endDate && merged.endDate < merged.startDate) {
      throw new ValidationError('End date must not be before the start date');
    }
    if (merged.subcategoryId !== current.subcategoryId) {
      await this.requirePlannableSubcategory(user.id, merged.subcategoryId);
    }

    const splits =
      effectiveFrom !== undefined &&
      current.recurrence !== null &&
      effectiveFrom > current.startDate;
    if (splits) {
      if (current.endDate && effectiveFrom > current.endDate) {
        throw new ValidationError('The item has already ended by then');
      }
      const successor = await this.toCreateInput(
        user.id,
        user.defaultCurrency,
        { ...merged, startDate: effectiveFrom },
      );
      const created = await this.budgetItems.updateAndCreateBudgetItem(
        id,
        { endDate: parseDateOnly(addDays(effectiveFrom, -1)) },
        successor,
      );
      return toBudgetItemDTO(created);
    }

    const updated = await this.budgetItems.updateBudgetItem(
      id,
      await this.toCreateInput(user.id, user.defaultCurrency, merged),
    );
    return toBudgetItemDTO(updated);
  }

  async deleteBudgetItem(clerkId: string, id: string): Promise<void> {
    const user = await this.users.getOnboardedUser(clerkId);
    await this.requireBudgetItem(user.id, id);
    await this.budgetItems.deleteBudgetItem(id);
  }

  async getMonthlyBudget(
    clerkId: string,
    month: string,
  ): Promise<MonthlyBudgetDTO> {
    const user = await this.users.getOnboardedUser(clerkId);
    const [items, categories] = await Promise.all([
      this.budgetItems.findBudgetItems(user.id),
      this.categories.findCategories(clerkId),
    ]);
    return buildMonthlyBudget(
      month,
      user.defaultCurrency as SupportedCurrency,
      items.map((item) => ({
        budgetItem: toBudgetItemDTO(item),
        categoryId: item.subcategory.categoryId,
        categoryKind: item.subcategory.category.kind,
        budgetClass: item.subcategory.category.budgetClass,
        amountInDefaultMinor: convertMinor(
          toAmountNumber(item.amountMinor),
          item.currency,
          user.defaultCurrency,
          item.rateToDefault,
        ),
      })),
      categories.map((category) => category.id),
    );
  }

  private async requireBudgetItem(
    userId: string,
    id: string,
  ): Promise<BudgetItem> {
    const item = await this.budgetItems.findBudgetItem(userId, id);
    if (!item) throw new NotFoundError('Budget Item not found');
    return item;
  }

  private async requirePlannableSubcategory(
    userId: string,
    subcategoryId: string,
  ): Promise<void> {
    const subcategory = await this.categories.requireSubcategory(
      userId,
      subcategoryId,
    );
    if (subcategory.archivedAt) {
      throw new ValidationError('This Subcategory is archived');
    }
    if (!subcategory.category.plannable) {
      throw new ValidationError(
        `${subcategory.category.name} can only be used on Transactions`,
      );
    }
  }

  private async toCreateInput(
    userId: string,
    defaultCurrency: string,
    fields: BudgetItemFields,
  ): Promise<Prisma.BudgetItemUncheckedCreateInput> {
    return {
      userId,
      subcategoryId: fields.subcategoryId,
      name: fields.name,
      amountMinor: BigInt(fields.amountMinor),
      currency: fields.currency,
      rateToDefault: await this.exchangeRates.findRate(
        fields.currency,
        defaultCurrency,
        fields.startDate,
      ),
      recurrenceUnit: fields.recurrence?.unit ?? null,
      recurrenceInterval: fields.recurrence?.interval ?? null,
      startDate: parseDateOnly(fields.startDate),
      endDate: fields.endDate ? parseDateOnly(fields.endDate) : null,
    };
  }
}
