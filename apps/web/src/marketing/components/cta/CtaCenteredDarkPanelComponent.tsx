import { LinkData } from '@/marketing/fields/LinkField'
import { renderLink } from '@/marketing/utils/linkUtils'
import { primaryButton } from '@/marketing/utils/buttonStyles'

interface CtaCenteredDarkPanelComponentProps {
  title: string
  description?: string
  cta?: LinkData
  cta2?: LinkData
}

export default function CtaCenteredDarkPanelComponent({
  title,
  description,
  cta,
  cta2,
}: CtaCenteredDarkPanelComponentProps) {
  return (
    <div className="bg-paper dark:bg-ink">
      <div className="mx-auto max-w-7xl py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16 dark:bg-gray-800 dark:shadow-none dark:after:pointer-events-none dark:after:absolute dark:after:inset-0 dark:after:inset-ring dark:after:inset-ring-white/10 dark:after:sm:rounded-3xl">
          <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
            {title}
          </h2>
          {description && (
            <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-gray-300">
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
