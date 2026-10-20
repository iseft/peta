# CLAUDE.md

**Peta** (Personal Expense Tracking Application): an Android (later iOS) budgeting app that puts a user's plan next to what they actually spend, against the 50/30/20 rule, plus a NestJS backend and a marketing site. Domain vocabulary is in `GLOSSARY.md`; decisions in `docs/adr/`; scope and slices in `docs/mvp-spec.md`. Use the glossary's terms in code, comments and UI copy. The structure mirrors `~/repos/language-learning-app-blocker`, except that Peta is online-first (ADR 0001).

## Commands

pnpm workspace monorepo (`apps/*`, `packages/*`). The API's package name is `backend` (dir `apps/api`); the marketing site is `web` (dir `apps/web`). Node is pinned in `.nvmrc`: run `nvm use` first, tests refuse other majors.

```bash
scripts/setup-wizard.sh      # One-time setup: 1Password vault "PETA", Clerk, Payload secrets, Railway (re-runnable)
pnpm run env:pull            # Write apps/{api,web,mobile}/.env from their .env.example via 1Password (`eval $(op signin)` first)
pnpm run db:up               # Local Postgres on port 5435
pnpm run dev:backend         # NestJS watch mode
pnpm run build:shared        # Rebuild packages/shared (required after any change to it)
pnpm run dev:web             # Marketing site + CMS on http://localhost:3001 (admin at /admin)
pnpm run dev:mobile          # Metro for apps/mobile; the installed development build connects to it
pnpm run android             # Build + install the Android development build, then start Metro (needs JAVA_HOME, see below)
pnpm run build:android:release  # Google Play upload bundle (.aab) in apps/mobile/build/. Bump expo.version and expo.android.versionCode in app.json first
pnpm run test                # shared → backend → mobile → web
pnpm run lint
pnpm run type-check
cd apps/api && npx jest src/path/to/file.spec.ts       # Single test file
cd apps/api && pnpm run prisma:migrate                 # Create + apply a migration
cd apps/api && pnpm run seed:dev                       # Upsert the Categories, purge deleted-account records older than 3 years; also runs before every deploy
cd apps/web && pnpm payload migrate:create <name>    # After changing a collection/block: CMS migration (src/marketing/migrations)
pnpm run payload:migrate:web && pnpm run seed:web   # Apply CMS migrations; create launch pages/admin if missing (never overwrites)
cd apps/mobile && npx expo start                       # Also regenerates typed routes (.expo/types): run once after adding a screen, or type-check rejects its href
```

Secrets live only in the 1Password vault "PETA" as `op://` references in the `.env.example` files. Add variables to the template (and to `app-config.schema.ts` for the API, which strips undeclared keys), never to the generated `.env`.

## Architecture

- `apps/api/`: NestJS 11, Prisma + PostgreSQL, Clerk, zod. Deploys on Railway as service `backend`. Exchange rates: `exchange-rates/` caches the ECB's daily rates (Frankfurter API) in `ExchangeRate`; every Budget Item and Transaction stores its own rate to the Default Currency (ADR 0002). Money is integer minor units (`BigInt` in Prisma, `number` in DTOs) with ISO 4217 exponents from `currencyExponent` in `packages/shared`, never from `Intl`. Dates are `@db.Date` columns and `"YYYY-MM-DD"` strings (`common/dates/date-only.ts`).
- `.railway/railway.ts`: Railway infrastructure as code (services, build/start/pre-deploy/health check). Variables are unmanaged: set them with `railway variable set` from 1Password, never in this file. Change infra with `railway config plan`, then `railway config apply`; a service missing from the file gets deleted on apply.
- `apps/web/` (package `web`): marketing site + Payload CMS (Next.js 16, Payload 3, Tailwind 4), ported from language-learning-app-blocker. Hosts the privacy policy, terms and account-deletion page Google Play needs. Legal pages are written in `src/legal/*.md` (Markdown subset parsed by `src/seed/markdown.ts`); `pnpm run push:legal:prod` uploads them to production as drafts. CMS uploads go to the Railway bucket `media` (the wizard sets the `S3_*` references on `web`); on Railway the config refuses to start without it, since the deploy filesystem is ephemeral. Payload's tables live in the `payload` schema of the same Postgres as the API (Prisma owns `public`). Brand tokens are still the sibling app's (`src/app/(frontend)/styles.css`, `public/`), to be replaced with Peta's.
- Error tracking: the Sentry SDK reporting to **Better Stack** through Sentry-compatible DSNs. API: `src/instrument.ts`, off unless `BETTERSTACK_DSN` is set. Mobile: `@sentry/react-native` initialised in the root layout, release builds only, off unless `EXPO_PUBLIC_BETTERSTACK_DSN` is set.
- `packages/shared/` (`@peta/shared`): zod schemas and DTOs shared by the API and the mobile app, plus `currencyExponent`.
- `apps/mobile/` (package `mobile`): Expo SDK 58 with Expo Router (`src/app/`), TanStack Query over the API (`src/api/queries.ts`, responses parsed with the shared zod schemas), no local database (ADR 0001). Sign-in is required: Clerk email + password, with email-code verification at sign-up and for Device Trust on new devices; "Forgot password?" opens Clerk's hosted Account Portal (`lib/account-portal.ts`). Config comes from `apps/mobile/.env` (`EXPO_PUBLIC_*`, written by `env:pull`, pointing at development Clerk and the emulator); `build:android:release` overrides it with the production values from 1Password (items Clerk and Railway) and refuses to build if they look wrong. Builds use Android Studio's bundled JDK: `export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home" ANDROID_HOME="$HOME/Library/Android/sdk"`. Restart Metro after installing packages.

### Backend conventions

- One folder per feature: `module → controller → service → repository`.
- Only repositories touch Prisma. Repositories expose CRUD only (`find*/create*/update*/delete*`); decisions such as get-or-create belong in services. Services may inject repositories directly, with no pass-through services.
- Validate request bodies with `ZodValidationPipe` and schemas from `packages/shared`.
- Throw domain errors from `common/exceptions` in services; global filters map them to HTTP.
- Auth: a global `AuthGuard` requires a valid Clerk token on every route; `@Public()` opts out. Read the caller with `@ClerkUserId()`. A user's first request creates their row (with Savings and an Emergency Fund); planning endpoints call `UsersService.getOnboardedUser`, which answers 409 until onboarding has set the Default Currency.
- Name functions verb then noun (`findBudgetItems`). Comments only where they explain a why the code cannot. Split files past ~300 lines.
- Unit tests are `*.spec.ts` next to the code (Jest). Pure calculations (e.g. `budget/monthly-budget.ts`) live apart from services so they are tested without mocks.

## Workflow

- Conventional Commits (`feat:`, `fix(api):`, `docs:`). Husky runs lint + test on commit and type-check on push.
- Pause for user review before committing.
- Machine-wide agent tooling rules (e.g. the context-mode plugin's routing rules) live in the user's parent `CLAUDE.md`, not here. This line also stops that plugin from appending its block to this file.
