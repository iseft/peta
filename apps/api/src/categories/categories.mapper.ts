import type { Subcategory } from '@db';
import type { CategoryDTO, SubcategoryDTO } from '@peta/shared';
import type { CategoryWithSubcategories } from './categories.repository';

export function toSubcategoryDTO(subcategory: Subcategory): SubcategoryDTO {
  return {
    id: subcategory.id,
    categoryId: subcategory.categoryId,
    name: subcategory.name,
    archivedAt: subcategory.archivedAt?.toISOString() ?? null,
  };
}

export function toCategoryDTO(
  category: CategoryWithSubcategories,
): CategoryDTO {
  return {
    id: category.id,
    name: category.name,
    kind: category.kind,
    budgetClass: category.budgetClass,
    plannable: category.plannable,
    position: category.position,
    subcategories: category.subcategories.map(toSubcategoryDTO),
  };
}
