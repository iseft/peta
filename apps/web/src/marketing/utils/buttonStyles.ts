// Buttons from docs/design-guidelines.md: heavy border, offset shadow only on
// the primary action, a strong pressed state.
export const primaryButton =
  'inline-block rounded-xl border-2 border-ink bg-lime px-5 py-3 text-base font-bold text-ink shadow-[4px_4px_0_0_var(--color-ink)] transition hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink dark:border-paper dark:shadow-[4px_4px_0_0_var(--color-paper)] dark:focus-visible:outline-paper'

export const secondaryButton =
  'inline-block rounded-xl border-2 border-ink px-5 py-3 text-base font-bold transition hover:bg-ink hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink dark:border-paper dark:hover:bg-paper dark:hover:text-ink'
