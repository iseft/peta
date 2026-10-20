import { LinkData } from '@/marketing/fields/LinkField'
import { primaryButton, secondaryButton } from '@/marketing/utils/buttonStyles'
import { renderLink } from '@/marketing/utils/linkUtils'

interface HeroSimpleCenteredComponentProps {
  supertitle?: string
  supertitleCta?: LinkData
  title?: string
  description?: string
  cta?: LinkData
  cta2?: LinkData
}

// The loud surface (docs/design-guidelines.md): giant display type, one
// rotated lime sticker, a primary button with an offset shadow.
export default function HeroSimpleCenteredComponent({
  supertitle,
  supertitleCta,
  title,
  description,
  cta,
  cta2,
}: HeroSimpleCenteredComponentProps) {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-4xl text-center">
        {supertitle && (
          <p className="mb-8 inline-block -rotate-2 rounded-lg border-2 border-ink bg-lime px-3 py-1 text-sm font-bold text-ink">
            {supertitle}
            {supertitleCta?.label && supertitleCta?.linkType && (
              <>
                {' '}
                {renderLink(
                  supertitleCta,
                  <>
                    {supertitleCta.label} <span aria-hidden="true">&rarr;</span>
                  </>,
                  'underline underline-offset-2',
                )}
              </>
            )}
          </p>
        )}
        {title && (
          <h1 className="text-5xl font-bold tracking-tight text-balance sm:text-7xl lg:text-8xl">
            {title}
          </h1>
        )}
        {description && (
          <p className="mx-auto mt-8 max-w-2xl text-lg text-pretty text-gray-600 sm:text-xl/8 dark:text-gray-300">
            {description}
          </p>
        )}
        {(cta?.label || cta2?.label) && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {cta?.label && cta?.linkType && renderLink(cta, cta.label, primaryButton)}
            {cta2?.label && cta2?.linkType && renderLink(cta2, cta2.label, secondaryButton)}
          </div>
        )}
      </div>
    </section>
  )
}
