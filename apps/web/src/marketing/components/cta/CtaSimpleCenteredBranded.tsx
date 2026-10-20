import { LinkData } from '@/marketing/fields/LinkField'
import { renderLink } from '@/marketing/utils/linkUtils'
import { primaryButton } from '@/marketing/utils/buttonStyles'

interface CtaSimpleCenteredBrandedComponentProps {
  title: string
  description?: string
  cta?: LinkData
  cta2?: LinkData
}

export default function CtaSimpleCenteredBrandedComponent({
  title,
  description,
  cta,
  cta2,
}: CtaSimpleCenteredBrandedComponentProps) {
  return (
    <div className="bg-brand-700">
      <div className="px-6 py-12 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
            {title}
          </h2>
          {description && (
            <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-brand-200">
              {description}
            </p>
          )}
          {(cta || cta2) && (
            <div className="mt-10 flex items-center justify-center gap-x-6">
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
                    {cta2.label}
                    <span aria-hidden="true">→</span>
                  </>,
                  'text-sm/6 font-semibold text-white',
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
