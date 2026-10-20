// EXPO_PUBLIC_ variables are inlined at build time. Point this at a local API
// with EXPO_PUBLIC_API_URL=http://10.0.2.2:3000/api (the Android emulator's
// address for the Mac it runs on). The production default is set once the
// Railway backend has its domain (scripts/setup-wizard.sh).
export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://10.0.2.2:3000/api';

// Publishable keys are public; `pnpm run env:pull` writes it to
// apps/mobile/.env from 1Password, and Expo inlines it at build time.
export const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ?? '';

// A Sentry-style DSN for Better Stack error tracking ("Peta Mobile"). DSNs
// are public by design: they only allow sending. Reporting is off until set.
export const BETTERSTACK_DSN = process.env.EXPO_PUBLIC_BETTERSTACK_DSN;

// The store and launcher name: one value, chosen before the Play listing
// (docs/mvp-spec.md).
export const APP_NAME = 'Peta';

// Where "Send feedback" in Settings writes to; the same contact the legal
// pages give. Placeholder (.invalid) until Peta has its own domain.
export const SUPPORT_EMAIL = 'support@peta.invalid';

// Legal pages on the marketing site (apps/web).
export const WEB_URL = process.env.EXPO_PUBLIC_WEB_URL ?? 'http://localhost:3001';
