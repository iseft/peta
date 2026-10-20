'use client'

import Image from 'next/image'
import { LinkData } from '@/marketing/fields/LinkField'
import { renderLink } from '@/marketing/utils/linkUtils'
import { Media } from '@/payload-types'
import { primaryButton } from '@/marketing/utils/buttonStyles'

interface HeroWithAngledImageOnRightComponentProps {
  supertitle?: string
  supertitleCta?: LinkData
  title?: string
  description?: string
  cta?: LinkData
  cta2?: LinkData
  image?: Media
}

export default function HeroWithAngledImageOnRightComponent({
  supertitle,
  supertitleCta,
  title,
  description,
  cta,
  cta2,
  image,
}: HeroWithAngledImageOnRightComponentProps) {
  return (
    <div className="bg-paper dark:bg-ink">
      <div className="relative">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-white lg:block dark:fill-gray-900"
            >
              <polygon points="0,0 90,0 50,100 0,100" />
            </svg>

            <div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                {supertitle && (
                  <div className="hidden sm:mb-10 sm:flex">
                    <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:text-gray-400 dark:ring-white/10 dark:hover:ring-white/20">
                      <span>{supertitle}</span>
                      {supertitleCta?.label && supertitleCta?.linkType && (
                        <>
                          {' '}
                          {renderLink(
                            supertitleCta,
                            <>
                              <span aria-hidden="true" className="absolute inset-0" />
                              {supertitleCta.label} <span aria-hidden="true">&rarr;</span>
                            </>,
                            'font-semibold whitespace-nowrap text-brand-600 dark:text-brand-400',
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}
                {title && (
                  <h1 className="text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl dark:text-white">
                    {title}
                  </h1>
                )}
                {description && (
                  <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">
                    {description}
                  </p>
                )}
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
                        'text-sm/6 font-semibold text-gray-900 dark:text-white',
                      )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="relative bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 dark:bg-gray-800">
          {image?.url && (
            <Image alt={image.alt || ''} src={image.url} fill className="object-cover" />
          )}
        </div>
      </div>
    </div>
  )
}
