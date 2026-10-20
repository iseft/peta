import { z } from 'zod';

export const budgetClassSchema = z.enum(['NEED', 'WANT', 'SAVING']);
export type BudgetClass = z.infer<typeof budgetClassSchema>;

export const categoryKindSchema = z.enum(['INCOME', 'EXPENSE']);
export type CategoryKind = z.infer<typeof categoryKindSchema>;

export const subcategorySchema = z.object({
  id: z.string(),
  categoryId: z.string(),
  name: z.string(),
  archivedAt: z.iso.datetime().nullable(),
});
export type SubcategoryDTO = z.infer<typeof subcategorySchema>;

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  kind: categoryKindSchema,
  budgetClass: budgetClassSchema.nullable(),
  plannable: z.boolean(),
  position: z.number().int(),
  // The caller's own, archived ones included.
  subcategories: z.array(subcategorySchema),
});
export type CategoryDTO = z.infer<typeof categorySchema>;

export const createSubcategorySchema = z.object({
  categoryId: z.string().min(1),
  name: z.string().trim().min(1).max(60),
});
export type CreateSubcategoryDTO = z.infer<typeof createSubcategorySchema>;

export const updateSubcategorySchema = z.object({
  name: z.string().trim().min(1).max(60).optional(),
  archived: z.boolean().optional(),
});
export type UpdateSubcategoryDTO = z.infer<typeof updateSubcategorySchema>;

// Deleting a Subcategory that has history archives it instead.
export const deleteSubcategoryResultSchema = z.object({
  outcome: z.enum(['DELETED', 'ARCHIVED']),
});
export type DeleteSubcategoryResultDTO = z.infer<
  typeof deleteSubcategoryResultSchema
>;
