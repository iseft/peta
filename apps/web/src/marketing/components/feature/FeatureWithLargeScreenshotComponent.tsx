import Image from 'next/image'
import { getHeroIcon } from '@/marketing/utils/heroicons'
import type { Media } from '@/payload-types'

interface Feature {
  name: string
  description: string
  iconName?: string
}

interface FeatureWithLargeScreenshotComponentProps {
  badge?: string
  title: string
  description?: string
  image?: Media | number | null
  darkImage?: Media | number | null
  features?: Feature[]
}

export default function FeatureWithLargeScreenshotComponent({
  badge,
  title,
  description,
  image,
  darkImage,
  features = [],
}: FeatureWithLargeScreenshotComponentProps) {
  return (
    <div className="bg-paper py-12 sm:py-16 dark:bg-ink">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          {badge && (
            <h2 className="text-base/7 font-semibold text-brand-600 dark:text-brand-400">
              {badge}
            </h2>
          )}
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl sm:text-balance dark:text-white">
            {title}
          </p>
          {description && (
            <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-300">{description}</p>
          )}
        </div>
      </div>
      <div className="relative overflow-hidden pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {image && typeof image === 'object' && image.url && (
            <Image
              alt={image.alt || 'App screenshot'}
              src={image.url}
              width={image.width || 2432}
              height={image.height || 1442}
              className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10 dark:hidden dark:ring-white/10"
            />
          )}
          {darkImage && typeof darkImage === 'object' && darkImage.url && (
            <Image
              alt={darkImage.alt || 'App screenshot'}
              src={darkImage.url}
              width={darkImage.width || 2432}
              height={darkImage.height || 1442}
              className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10 not-dark:hidden dark:ring-white/10"
            />
          )}
          <div aria-hidden="true" className="relative">
            <div className="absolute -inset-x-20 bottom-0 bg-linear-to-t from-white pt-[7%] dark:from-gray-900" />
          </div>
        </div>
      </div>
      {features.length > 0 && (
        <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
          <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base/7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16 dark:text-gray-400">
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
        </div>
      )}
    </div>
  )
}
