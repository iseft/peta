import { getHeroIcon } from '@/marketing/utils/heroicons'

interface Feature {
  name: string
  description: string
  iconName?: string
}

interface FeatureTwoByTwoGridComponentProps {
  badge?: string
  title: string
  description?: string
  features?: Feature[]
}

export default function FeatureTwoByTwoGridComponent({
  badge,
  title,
  description,
  features = [],
}: FeatureTwoByTwoGridComponentProps) {
  return (
    <div className="bg-paper py-12 sm:py-16 dark:bg-ink">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          {badge && (
            <h2 className="text-base/7 font-semibold text-brand-600 dark:text-brand-400">
              {badge}
            </h2>
          )}
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance dark:text-white">
            {title}
          </p>
          {description && (
            <p className="mt-6 text-lg/8 text-gray-700 dark:text-gray-300">{description}</p>
          )}
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature, index) => {
              const IconComponent = getHeroIcon(feature.iconName)
              return (
                <div key={index} className="relative pl-16">
                  <dt className="text-base/7 font-semibold text-gray-900 dark:text-white">
                    <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-brand-600 dark:bg-brand-500">
                      <IconComponent aria-hidden="true" className="size-6 text-white" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base/7 text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </dd>
                </div>
              )
            })}
          </dl>
        </div>
      </div>
    </div>
  )
}
