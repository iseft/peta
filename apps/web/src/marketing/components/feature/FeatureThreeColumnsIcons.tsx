import { getHeroIcon } from '@/marketing/utils/heroicons'

interface Feature {
  name: string
  description: string
  href?: string
  iconName?: string
}

interface FeatureThreeColumnsIconsComponentProps {
  badge?: string
  title: string
  description?: string
  features?: Feature[]
}

export default function FeatureThreeColumnsIconsComponent({
  badge,
  title,
  description,
  features = [],
}: FeatureThreeColumnsIconsComponentProps) {
  return (
    <div className="bg-paper py-12 sm:py-16 dark:bg-ink">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl lg:text-center">
          {badge && (
            <h2 className="text-base/7 font-semibold text-brand-600 dark:text-brand-400">
              {badge}
            </h2>
          )}
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance dark:text-white">
            {title}
          </p>
          {description && (
            <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-300">{description}</p>
          )}
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => {
              const IconComponent = getHeroIcon(feature.iconName)
              return (
                <div key={index} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base/7 font-semibold text-gray-900 dark:text-white">
                    <IconComponent
                      aria-hidden="true"
                      className="size-5 flex-none text-brand-600 dark:text-brand-400"
                    />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base/7 text-gray-600 dark:text-gray-400">
                    <p className="flex-auto">{feature.description}</p>
                    {feature.href && (
                      <p className="mt-6">
                        <a
                          href={feature.href}
                          className="text-sm/6 font-semibold text-brand-600 hover:text-brand-500 dark:text-brand-400 dark:hover:text-brand-300"
                        >
                          Learn more <span aria-hidden="true">→</span>
                        </a>
                      </p>
                    )}
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
