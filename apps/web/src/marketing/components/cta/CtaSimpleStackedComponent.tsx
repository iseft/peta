import { LinkData } from '@/marketing/fields/LinkField'
import { renderLink } from '@/marketing/utils/linkUtils'
import { primaryButton } from '@/marketing/utils/buttonStyles'

interface CtaSimpleStackedComponentProps {
  title: string
  cta?: LinkData
  cta2?: LinkData
}

export default function CtaSimpleStackedComponent({
  title,
  cta,
  cta2,
}: CtaSimpleStackedComponentProps) {
  return (
    <div className="bg-paper dark:bg-ink">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-8">
        <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl dark:text-white">
          {title}
        </h2>
        {(cta || cta2) && (
          <div className="mt-10 flex items-center gap-x-6">
            {cta?.label &&
              cta?.linkType &&
              renderLink(
                cta,
                cta.label,
                primaryButton,
              )}
            {cta2?.label &&
              cta2?.linkType &&
              renderLink(
                cta2,
                <>
                  {cta2.label} <span aria-hidden="true">→</span>
                </>,
                'text-sm/6 font-semibold text-gray-900 dark:text-gray-300 dark:hover:text-white',
              )}
          </div>
        )}
      </div>
    </div>
  )
}
