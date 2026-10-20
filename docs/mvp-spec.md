# Peta MVP spec

Peta (Personal Expense Tracking Application) compares a user's plan with what actually happens to their money, using Elizabeth Warren's 50/30/20 rule. Source requirements: `User_requirements_peta_v2.pptx` (slides 1–6; slide 7 is long-term). Vocabulary is in `GLOSSARY.md`, decisions in `docs/adr/`.

## Stack (mirrors language-learning-app-blocker)

- pnpm workspace, Node 22, Husky, Conventional Commits.
- `apps/api` (package `backend`): NestJS 11, Prisma + PostgreSQL, Clerk, zod; module → controller → service → repository.
- `apps/mobile` (package `mobile`): Expo + Expo Router, TanStack Query, Clerk email + password sign-in. Online-first (ADR 0001). Android first.
- `apps/web` (package `web`): marketing site + Payload CMS, ported from the sibling app without its branding; hosts the privacy policy and account-deletion page that Google Play requires.
- `packages/shared` (`@peta/shared`): zod schemas and DTOs.
- Railway project (services `backend`, `web`, Postgres) as code in `.railway/railway.ts`; secrets in 1Password vault "PETA" (item "Clerk" holds the Clerk keys); errors to Better Stack.
- English only. The store display name is a single config value, to be chosen before the Play listing (the name "PETA" collides with a registered trademark).

## Domain rules

- 16 seeded Categories with fixed Budget Classes:
  - Need: Housing, Food, Transport, Household, Clothing, Health, Insurance, Debt Repayment.
  - Want: Services & Subscriptions (massage, hairdresser, streaming and the like), Hobbies, Social, Travel, Charity, Other.
  - Saving: Saving.
  - No class: Income, Bank Fees.
- Users create Subcategories. A Subcategory with history can only be archived.
- Budget Item: recurring (every N weeks/months/years, start date required when rarer than monthly, optional end date) or one-off. Changing an amount "from a date" splits the item (ADR 0003).
- Monthly Budget: recurring items as a monthly cost, an income/spending/remainder balance, and 50/30/20 shares against planned income.
- Annual Budget: the calendar of a year, Q1–Q4, past months greyed out, with Paid Status on one-off items.
- Transaction → Lines → optional Assignment (to a one-off Budget Item or the Emergency Fund). Amounts are positive; direction comes from the Category. Bank Fees can only be used on Transactions.
- Multiple currencies: original amount + currency + stored rate to the Default Currency (ADR 0002).
- Savings: one pot of Holdings (Asset Class, allocation %, expected return %). Lines in Saving Subcategories are Contributions. Estimated value is `V·(1+H/12)+B` per Holding per month. Rebalance calculator with a reminder date. Withdrawals are neutral for 50/30/20.
- Emergency Fund: Holdings with name and allocation only. Months Covered = balance ÷ monthly Need total, shown red below the Emergency Fund Target. Spending from it counts as spending in the chosen Subcategory.
- Settings: email (read-only), password (managed by Clerk), name, Payment Details (copyable), Default Currency, Opening Balance, Emergency Fund Target, and derived values: Available Wealth, Annual Income, total savings, Active Categories.
- First launch: onboarding for Default Currency, Opening Balance and Emergency Fund Target.

## Out of scope for now

Wishlist and Envelopes, Savings Goals, receipt recognition, Excel import, household mode, AI categorisation, sole-trader tracker, tracked accounts, asset-price API, widgets, offline mode, iOS release.

## Slices

1. **Scaffold + Settings + Categories + Monthly Budget**:
   - monorepo, CI hooks, Railway + 1Password + Clerk, `apps/web` with legal pages;
   - full Prisma schema for all in-scope entities;
   - API + mobile for onboarding, Settings, Subcategories and the Monthly Budget.
2. **Transactions**: list, entry, split, multi-currency, Available Wealth.
3. **Annual Budget**: calendar, Paid Status, Annual Income.
4. **Savings + Emergency Fund**: Holdings, Contributions, estimates, rebalance, Months Covered.
5. **Expense Analysis**: planned vs actual bar chart and pie charts by (Sub)Category over a period.

## Setup steps that need you

- `eval $(op signin)` before pulling env files from the "PETA" vault.
- `railway login` and `railway link` to the Railway project before applying `.railway/railway.ts`.
- Clerk application with email + password enabled (done; keys in 1Password item "Clerk").
