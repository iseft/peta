import { Injectable } from '@nestjs/common';
import type { BudgetItem, Category, Prisma, Subcategory } from '@db';
import { PrismaDbService } from '../prisma-db/prisma-db.service';

export type BudgetItemWithCategory = BudgetItem & {
  subcategory: Subcategory & { category: Category };
};

@Injectable()
export class BudgetItemsRepository {
  constructor(private readonly prisma: PrismaDbService) {}

  findBudgetItems(userId: string): Promise<BudgetItemWithCategory[]> {
    return this.prisma.budgetItem.findMany({
      where: { userId },
      orderBy: [{ startDate: 'asc' }, { createdAt: 'asc' }],
      include: { subcategory: { include: { category: true } } },
    });
  }

  findBudgetItem(userId: string, id: string): Promise<BudgetItem | null> {
    return this.prisma.budgetItem.findFirst({ where: { id, userId } });
  }

  createBudgetItem(
    data: Prisma.BudgetItemUncheckedCreateInput,
  ): Promise<BudgetItem> {
    return this.prisma.budgetItem.create({ data });
  }

  updateBudgetItem(
    id: string,
    data: Prisma.BudgetItemUncheckedUpdateInput,
  ): Promise<BudgetItem> {
    return this.prisma.budgetItem.update({ where: { id }, data });
  }

  // Ends one item and starts its successor atomically.
  async updateAndCreateBudgetItem(
    id: string,
    data: Prisma.BudgetItemUncheckedUpdateInput,
    successor: Prisma.BudgetItemUncheckedCreateInput,
  ): Promise<BudgetItem> {
    const [, created] = await this.prisma.$transaction([
      this.prisma.budgetItem.update({ where: { id }, data }),
      this.prisma.budgetItem.create({ data: successor }),
    ]);
    return created;
  }

  async deleteBudgetItem(id: string): Promise<void> {
    await this.prisma.budgetItem.delete({ where: { id } });
  }
}
