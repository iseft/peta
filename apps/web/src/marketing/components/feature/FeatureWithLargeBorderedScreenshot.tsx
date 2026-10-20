import Image from 'next/image'
import { Media } from '@/payload-types'

interface FeatureWithLargeBorderedScreenshotComponentProps {
  title: string
  image?: Media
  darkImage?: Media
}

export default function FeatureWithLargeBorderedScreenshotComponent({
  title,
  image,
  darkImage,
}: FeatureWithLargeBorderedScreenshotComponentProps) {
  return (
    <div className="overflow-hidden bg-paper py-12 sm:py-16 dark:bg-ink">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="max-w-2xl text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-6xl sm:text-balance dark:text-white">
          {title}
        </p>
        <div className="relative mt-16 aspect-2432/1442 h-144 sm:h-auto sm:w-[calc(var(--container-7xl)-calc(var(--spacing)*16))]">
          <div className="absolute -inset-2 rounded-[calc(var(--radius-xl)+calc(var(--spacing)*2))] shadow-xs ring-1 ring-black/5 dark:bg-white/2.5 dark:ring-white/10" />
          {image?.url && (
            <Image
              alt={image.alt || 'App screenshot'}
              src={image.url}
              fill
              className="h-full rounded-xl shadow-2xl ring-1 ring-black/10 dark:hidden dark:ring-white/10"
            />
          )}
          {darkImage?.url && (
            <Image
              alt={darkImage.alt || 'App screenshot'}
              src={darkImage.url}
              fill
              className="h-full rounded-xl shadow-2xl ring-1 ring-black/10 not-dark:hidden dark:ring-white/10"
            />
          )}
        </div>
      </div>
    </div>
  )
}
