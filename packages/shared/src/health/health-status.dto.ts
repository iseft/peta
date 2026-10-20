import { z } from 'zod';

export const healthStatusSchema = z.object({
  status: z.literal('ok'),
  timestamp: z.iso.datetime(),
});

export type HealthStatusDTO = z.infer<typeof healthStatusSchema>;
