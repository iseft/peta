import { Injectable } from '@nestjs/common';
import type { Category, Prisma, Subcategory } from '@db';
import { PrismaDbService } from '../prisma-db/prisma-db.service';

export type CategoryWithSubcategories = Category & {
  subcategories: Subcategory[];
};

export type SubcategoryWithCategory = Subcategory & { category: Category };

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prisma: PrismaDbService) {}

  findCategoriesWithSubcategories(
    userId: string,
  ): Promise<CategoryWithSubcategories[]> {
    return this.prisma.category.findMany({
      orderBy: { position: 'asc' },
      include: {
        subcategories: {
          where: { userId },
          orderBy: [{ createdAt: 'asc' }],
        },
      },
    });
  }

  findCategory(id: string): Promise<Category | null> {
    return this.prisma.category.findUnique({ where: { id } });
  }

  findSubcategory(
    userId: string,
    id: string,
  ): Promise<SubcategoryWithCategory | null> {
    return this.prisma.subcategory.findFirst({
      where: { id, userId },
      include: { category: true },
    });
  }

  async findSubcategoryHasHistory(id: string): Promise<boolean> {
    const [budgetItems, lines] = await Promise.all([
      this.prisma.budgetItem.count({ where: { subcategoryId: id } }),
      this.prisma.line.count({ where: { subcategoryId: id } }),
    ]);
    return budgetItems + lines > 0;
  }

  createSubcategory(
    data: Prisma.SubcategoryUncheckedCreateInput,
  ): Promise<Subcategory> {
    return this.prisma.subcategory.create({ data });
  }

  updateSubcategory(
    id: string,
    data: Prisma.SubcategoryUpdateInput,
  ): Promise<Subcategory> {
    return this.prisma.subcategory.update({ where: { id }, data });
  }

  async deleteSubcategory(id: string): Promise<void> {
    await this.prisma.subcategory.delete({ where: { id } });
  }
}
