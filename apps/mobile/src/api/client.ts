import { useAuth } from '@clerk/expo';
import { useCallback } from 'react';
import type { z } from 'zod';

import { API_URL } from '@/config';

export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

type Request = {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  body?: unknown;
};

// Calls the API as the signed-in user; responses are checked against the
// shared zod schema, so a mismatch fails loudly instead of rendering garbage.
export function useApi() {
  const { getToken } = useAuth();

  return useCallback(
    async <T extends z.ZodType>(
      path: string,
      schema: T | null,
      request: Request = {},
    ): Promise<z.infer<T>> => {
      const token = await getToken();
      const response = await fetch(`${API_URL}${path}`, {
        method: request.method ?? 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          ...(request.body !== undefined && { 'Content-Type': 'application/json' }),
        },
        body: request.body === undefined ? undefined : JSON.stringify(request.body),
      });
      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as {
          message?: string;
          errors?: { message: string }[];
        } | null;
        const message =
          body?.errors?.[0]?.message ?? body?.message ?? `Request failed (${response.status})`;
        throw new ApiError(response.status, message);
      }
      if (!schema || response.status === 204) return undefined as z.infer<T>;
      return schema.parse(await response.json());
    },
    [getToken],
  );
}
