import Image from 'next/image'
import Link from 'next/link'
import type { Nav } from '@/payload-types'
import type { LinkData } from '@/marketing/fields/LinkField'
import { renderLink } from '@/marketing/utils/linkUtils'
import { SITE_NAME } from '@/site'

export function Navbar({ navData }: { navData: Nav | null }) {
  const items = navData?.items ?? []
  const cta = navData?.cta as LinkData | undefined

  return (
    <header className="border-b-2 border-ink bg-paper dark:border-paper dark:bg-ink">
      {navData?.showPromo && navData.promoText && (
        <p className="bg-lime px-4 py-2 text-center text-sm font-semibold text-ink">
          {navData.promoText}
        </p>
      )}
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6"
      >
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-xl font-bold tracking-tight"
        >
          <Image src="/logo.svg" alt="" width={36} height={36} priority unoptimized />
          {SITE_NAME}
        </Link>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {items.map((item, index) => (
            <span key={item.id ?? index} className="text-sm font-semibold hover:underline">
              {renderLink(item as LinkData, item.label)}
            </span>
          ))}
          {cta?.label &&
            renderLink(
              cta,
              cta.label,
              'rounded-xl border-2 border-ink bg-lime px-4 py-2 text-sm font-bold text-ink shadow-[3px_3px_0_0_var(--color-ink)] transition active:translate-x-0.5 active:translate-y-0.5 active:shadow-none dark:border-paper',
            )}
        </div>
      </nav>
    </header>
  )
}
