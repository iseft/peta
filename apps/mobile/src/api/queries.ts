import {
  budgetItemSchema,
  categorySchema,
  deleteSubcategoryResultSchema,
  monthlyBudgetSchema,
  paymentDetailSchema,
  profileSchema,
  subcategorySchema,
  type CompleteOnboardingDTO,
  type CreateBudgetItemDTO,
  type CreateSubcategoryDTO,
  type SavePaymentDetailDTO,
  type UpdateBudgetItemDTO,
  type UpdateProfileDTO,
  type UpdateSubcategoryDTO,
} from '@peta/shared';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { useApi } from '@/api/client';

// Online-first (ADR 0001): every screen reads the API through these hooks,
// and every write refetches what it affects.
export const keys = {
  profile: ['profile'] as const,
  categories: ['categories'] as const,
  budgetItems: ['budget-items'] as const,
  monthlyBudget: (month: string) => ['monthly-budget', month] as const,
};

export function useProfile(enabled = true) {
  const api = useApi();
  return useQuery({
    queryKey: keys.profile,
    queryFn: () => api('/profile', profileSchema),
    enabled,
  });
}

export function useCategories() {
  const api = useApi();
  return useQuery({
    queryKey: keys.categories,
    queryFn: () => api('/categories', z.array(categorySchema)),
  });
}

export function useBudgetItems() {
  const api = useApi();
  return useQuery({
    queryKey: keys.budgetItems,
    queryFn: () => api('/budget-items', z.array(budgetItemSchema)),
  });
}

export function useMonthlyBudget(month: string) {
  const api = useApi();
  return useQuery({
    queryKey: keys.monthlyBudget(month),
    queryFn: () => api(`/monthly-budget?month=${month}`, monthlyBudgetSchema),
  });
}

function useInvalidate() {
  const queryClient = useQueryClient();
  return (...queryKeys: (readonly string[])[]) =>
    Promise.all(queryKeys.map((queryKey) => queryClient.invalidateQueries({ queryKey })));
}

export function useCompleteOnboarding() {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CompleteOnboardingDTO) =>
      api('/profile/onboarding', profileSchema, { method: 'POST', body }),
    onSuccess: (profile) => queryClient.setQueryData(keys.profile, profile),
  });
}

export function useUpdateProfile() {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateProfileDTO) =>
      api('/profile', profileSchema, { method: 'PATCH', body }),
    onSuccess: (profile) => queryClient.setQueryData(keys.profile, profile),
  });
}

export function useSavePaymentDetail() {
  const api = useApi();
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: ({ id, ...body }: SavePaymentDetailDTO & { id?: string }) =>
      id
        ? api(`/profile/payment-details/${id}`, paymentDetailSchema, { method: 'PUT', body })
        : api('/profile/payment-details', paymentDetailSchema, { method: 'POST', body }),
    onSuccess: () => invalidate(keys.profile),
  });
}

export function useDeletePaymentDetail() {
  const api = useApi();
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: (id: string) =>
      api(`/profile/payment-details/${id}`, null, { method: 'DELETE' }),
    onSuccess: () => invalidate(keys.profile),
  });
}

export function useCreateSubcategory() {
  const api = useApi();
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: (body: CreateSubcategoryDTO) =>
      api('/subcategories', subcategorySchema, { method: 'POST', body }),
    onSuccess: () => invalidate(keys.categories),
  });
}

export function useUpdateSubcategory() {
  const api = useApi();
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: ({ id, ...body }: UpdateSubcategoryDTO & { id: string }) =>
      api(`/subcategories/${id}`, subcategorySchema, { method: 'PATCH', body }),
    onSuccess: () => invalidate(keys.categories, ['monthly-budget']),
  });
}

export function useDeleteSubcategory() {
  const api = useApi();
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: (id: string) =>
      api(`/subcategories/${id}`, deleteSubcategoryResultSchema, { method: 'DELETE' }),
    onSuccess: () => invalidate(keys.categories),
  });
}

export function useSaveBudgetItem() {
  const api = useApi();
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: (input: { id: string; changes: UpdateBudgetItemDTO } | { item: CreateBudgetItemDTO }) =>
      'changes' in input
        ? api(`/budget-items/${input.id}`, budgetItemSchema, { method: 'PATCH', body: input.changes })
        : api('/budget-items', budgetItemSchema, { method: 'POST', body: input.item }),
    onSuccess: () => invalidate(keys.budgetItems, ['monthly-budget'], keys.categories),
  });
}

export function useDeleteBudgetItem() {
  const api = useApi();
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: (id: string) => api(`/budget-items/${id}`, null, { method: 'DELETE' }),
    onSuccess: () => invalidate(keys.budgetItems, ['monthly-budget']),
  });
}

export function useDeleteAccount() {
  const api = useApi();
  return useMutation({
    mutationFn: () => api('/users/me', null, { method: 'DELETE' }),
  });
}
