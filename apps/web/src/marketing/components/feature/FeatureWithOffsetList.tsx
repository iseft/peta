import { getHeroIcon } from '@/marketing/utils/heroicons'

interface Feature {
  name: string
  description: string
  iconName?: string
}

interface FeatureWithOffsetListComponentProps {
  badge?: string
  title: string
  description?: string
  features?: Feature[]
}

export default function FeatureWithOffsetListComponent({
  badge,
  title,
  description,
  features = [],
}: FeatureWithOffsetListComponentProps) {
  return (
    <div className="bg-paper py-12 sm:py-16 dark:bg-ink">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <div className="col-span-2">
            {badge && (
              <h2 className="text-base/7 font-semibold text-brand-600 dark:text-brand-400">
                {badge}
              </h2>
            )}
            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
              {title}
            </p>
            {description && (
              <p className="mt-6 text-base/7 text-gray-700 dark:text-gray-300">{description}</p>
            )}
          </div>
          {features.length > 0 && (
            <dl className="col-span-3 grid grid-cols-1 gap-x-8 gap-y-10 text-base/7 text-gray-600 sm:grid-cols-2 lg:gap-y-16 dark:text-gray-400">
              {features.map((feature) => {
                const IconComponent = getHeroIcon(feature.iconName || 'CheckIcon')
                return (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="font-semibold text-gray-900 dark:text-white">
                      <IconComponent
                        aria-hidden="true"
                        className="absolute top-1 left-0 size-5 text-brand-500 dark:text-brand-400"
                      />
                      {feature.name}
                    </dt>
                    <dd className="mt-2">{feature.description}</dd>
                  </div>
                )
              })}
            </dl>
          )}
        </div>
      </div>
    </div>
  )
}
