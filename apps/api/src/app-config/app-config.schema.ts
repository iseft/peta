import { z } from 'zod';

// Kept apart from the module because importing that one validates `process.env`
// as a side effect, so a test that only wants the schema would boot the whole
// config.
//
// This schema strips every key it does not declare, so a variable missing from
// it reads as unset however carefully it was deployed.
export const appConfigSchema = z.object({
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().min(1),
  CLERK_SECRET_KEY: z.string().min(1),
  // ECB reference rates (Frankfurter API); overridable for tests.
  FX_API_URL: z.string().url().default('https://api.frankfurter.dev/v1'),
  // Better Stack error tracking; reporting is off when unset.
  BETTERSTACK_DSN: z.string().optional(),
  // Injected by Railway. Only ever labels output.
  RAILWAY_ENVIRONMENT_NAME: z.string().optional(),
});

export type AppConfig = z.infer<typeof appConfigSchema>;
