import { Injectable } from '@nestjs/common';
import type {
  CategoryDTO,
  CreateSubcategoryDTO,
  DeleteSubcategoryResultDTO,
  SubcategoryDTO,
  UpdateSubcategoryDTO,
} from '@peta/shared';
import { ConflictError } from '../common/exceptions/conflict-error';
import { NotFoundError } from '../common/exceptions/not-found-error';
import { isUniqueViolation } from '../common/prisma/is-unique-violation';
import { UsersService } from '../users/users.service';
import { toCategoryDTO, toSubcategoryDTO } from './categories.mapper';
import {
  CategoriesRepository,
  type SubcategoryWithCategory,
} from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly users: UsersService,
    private readonly categories: CategoriesRepository,
  ) {}

  async findCategories(clerkId: string): Promise<CategoryDTO[]> {
    const user = await this.users.getOrCreateUser(clerkId);
    const categories = await this.categories.findCategoriesWithSubcategories(
      user.id,
    );
    return categories.map(toCategoryDTO);
  }

  async createSubcategory(
    clerkId: string,
    input: CreateSubcategoryDTO,
  ): Promise<SubcategoryDTO> {
    const user = await this.users.getOrCreateUser(clerkId);
    if (!(await this.categories.findCategory(input.categoryId))) {
      throw new NotFoundError('Category not found');
    }
    try {
      const subcategory = await this.categories.createSubcategory({
        userId: user.id,
        categoryId: input.categoryId,
        name: input.name,
      });
      return toSubcategoryDTO(subcategory);
    } catch (error) {
      throw this.toNameConflict(error);
    }
  }

  async updateSubcategory(
    clerkId: string,
    id: string,
    input: UpdateSubcategoryDTO,
  ): Promise<SubcategoryDTO> {
    const user = await this.users.getOrCreateUser(clerkId);
    await this.requireSubcategory(user.id, id);
    try {
      const subcategory = await this.categories.updateSubcategory(id, {
        name: input.name,
        archivedAt:
          input.archived === undefined
            ? undefined
            : input.archived
              ? new Date()
              : null,
      });
      return toSubcategoryDTO(subcategory);
    } catch (error) {
      throw this.toNameConflict(error);
    }
  }

  // A Subcategory used by a Budget Item or a Line is archived instead, so
  // past plans and charts keep it.
  async deleteSubcategory(
    clerkId: string,
    id: string,
  ): Promise<DeleteSubcategoryResultDTO> {
    const user = await this.users.getOrCreateUser(clerkId);
    await this.requireSubcategory(user.id, id);
    if (await this.categories.findSubcategoryHasHistory(id)) {
      await this.categories.updateSubcategory(id, { archivedAt: new Date() });
      return { outcome: 'ARCHIVED' };
    }
    await this.categories.deleteSubcategory(id);
    return { outcome: 'DELETED' };
  }

  async requireSubcategory(
    userId: string,
    id: string,
  ): Promise<SubcategoryWithCategory> {
    const subcategory = await this.categories.findSubcategory(userId, id);
    if (!subcategory) throw new NotFoundError('Subcategory not found');
    return subcategory;
  }

  private toNameConflict(error: unknown): unknown {
    return isUniqueViolation(error)
      ? new ConflictError('A Subcategory with this name already exists here')
      : error;
  }
}
