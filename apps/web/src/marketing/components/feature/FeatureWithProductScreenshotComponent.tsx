import Image from 'next/image'
import { getHeroIcon } from '@/marketing/utils/heroicons'
import { Media } from '@/payload-types'

interface Feature {
  name: string
  description: string
  iconName?: string
}

interface FeatureWithProductScreenshotComponentProps {
  badge?: string
  title: string
  description?: string
  image?: Media
  darkImage?: Media
  features?: Feature[]
}

export default function FeatureWithProductScreenshotComponent({
  badge,
  title,
  description,
  image,
  darkImage,
  features = [],
}: FeatureWithProductScreenshotComponentProps) {
  return (
    <div className="overflow-hidden bg-paper py-12 sm:py-16 dark:bg-ink">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              {badge && (
                <h2 className="text-base/7 font-semibold text-brand-600 dark:text-brand-400">
                  {badge}
                </h2>
              )}
              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
                {title}
              </p>
              {description && (
                <p className="mt-6 text-lg/8 text-gray-700 dark:text-gray-300">{description}</p>
              )}
              {features.length > 0 && (
                <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none dark:text-gray-400">
                  {features.map((feature) => {
                    const IconComponent = getHeroIcon(feature.iconName)
                    return (
                      <div key={feature.name} className="relative pl-9">
                        <dt className="inline font-semibold text-gray-900 dark:text-white">
                          <IconComponent
                            aria-hidden="true"
                            className="absolute top-1 left-1 size-5 text-brand-600 dark:text-brand-400"
                          />
                          {feature.name}
                        </dt>{' '}
                        <dd className="inline">{feature.description}</dd>
                      </div>
                    )
                  })}
                </dl>
              )}
            </div>
          </div>
          {darkImage?.url && (
            <Image
              alt={darkImage.alt || 'Product screenshot'}
              src={darkImage.url}
              width={darkImage.width || 2432}
              height={darkImage.height || 1442}
              className="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 not-dark:hidden sm:w-228 md:-ml-4 lg:-ml-0 dark:ring-white/10"
            />
          )}
          {image?.url && (
            <Image
              alt={image.alt || 'Product screenshot'}
              src={image.url}
              width={image.width || 2432}
              height={image.height || 1442}
              className="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-228 md:-ml-4 lg:-ml-0 dark:hidden dark:ring-white/10"
            />
          )}
        </div>
      </div>
    </div>
  )
}
