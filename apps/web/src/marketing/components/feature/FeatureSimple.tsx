import { renderInlineHtml } from '@/marketing/utils/inlineHtml'

interface Feature {
  name: string
  description: string
}

interface FeatureSimpleComponentProps {
  title: string
  subtitle?: string
  description?: string
  features?: Feature[]
  centered?: boolean
}

export default function FeatureSimpleComponent({
  title,
  subtitle,
  description,
  features = [],
  centered = false,
}: FeatureSimpleComponentProps) {
  return (
    <div className="bg-paper py-12 sm:py-16 dark:bg-ink">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className={`mx-auto max-w-3xl ${centered ? 'lg:text-center' : 'lg:mx-0'}`}>
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-base/7 font-semibold text-brand-600 dark:text-brand-400">
              {subtitle}
            </p>
          )}
          {description && (
            <p className="mt-6 text-lg/8 text-gray-700 dark:text-gray-300">
              {renderInlineHtml(description)}
            </p>
          )}
        </div>
        {features.length > 0 && (
          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base/7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name}>
                <dt className="font-semibold text-gray-900 dark:text-white">{feature.name}</dt>
                <dd className="mt-1 text-gray-600 dark:text-gray-400">{feature.description}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </div>
  )
}
