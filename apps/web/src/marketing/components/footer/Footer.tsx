import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import type { Footer } from '@/payload-types'
import { SOCIAL_PLATFORMS } from '@/marketing/utils/socialIcons'
import { isSitePath, safeUrl } from '@/marketing/utils/url'

type FooterData = Footer

function getHref(link: FooterData['footerSections'][0]['links'][0]): string {
  if (
    link.linkType === 'internal' &&
    link.page &&
    typeof link.page === 'object' &&
    'slug' in link.page
  ) {
    return `/${link.page.slug}`
  }
  return link.url || '#'
}

function isExternal(link: FooterData['footerSections'][0]['links'][0]): boolean {
  return link.linkType === 'external' && !isSitePath(getHref(link))
}

export default async function Footer() {
  const payload = await getPayload({ config: await config })

  let footerData: FooterData | null = null

  try {
    footerData = await payload.findGlobal({
      slug: 'footer',
    })
  } catch (error) {
    console.warn('Failed to load footer data:', error)
  }

  if (!footerData) {
    return null
  }

  const sections = footerData.footerSections || []

  return (
    <footer className="bg-gray-100 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-8 sm:pt-24 lg:px-8 lg:pt-14">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 xl:gap-y-8">
          <div className="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
            {sections.slice(0, 2).map((section) => (
              <div key={section.title}>
                <h3 className="text-sm/6 font-semibold text-gray-900 dark:text-white">
                  {section.title}
                </h3>
                <ul role="list" className="mt-2 space-y-3 md:mt-6 md:space-y-4">
                  {section.links.map((link) => {
                    const href = getHref(link)
                    const external = isExternal(link)

                    if (external) {
                      return (
                        <li key={link.label}>
                          <a
                            href={href}
                            target={link.openInNewTab ? '_blank' : undefined}
                            rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                            className="text-sm/6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                          >
                            {link.label}
                          </a>
                        </li>
                      )
                    }

                    return (
                      <li key={link.label}>
                        <Link
                          href={href}
                          className="text-sm/6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        >
                          {link.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
          <div className="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
            {sections.slice(2, 4).map((section) => (
              <div key={section.title}>
                <h3 className="text-sm/6 font-semibold text-gray-900 dark:text-white">
                  {section.title}
                </h3>
                <ul role="list" className="mt-2 space-y-3 md:mt-6 md:space-y-4">
                  {section.links.map((link) => {
                    const href = getHref(link)
                    const external = isExternal(link)

                    if (external) {
                      return (
                        <li key={link.label}>
                          <a
                            href={href}
                            target={link.openInNewTab ? '_blank' : undefined}
                            rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                            className="text-sm/6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                          >
                            {link.label}
                          </a>
                        </li>
                      )
                    }

                    return (
                      <li key={link.label}>
                        <Link
                          href={href}
                          className="text-sm/6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        >
                          {link.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 border-t border-gray-900/10 pt-8 sm:mt-8 md:flex md:items-center md:justify-between lg:mt-12 dark:border-white/10">
          <div className="flex gap-x-6 md:order-2">
            {(footerData.socialLinks ?? []).map((socialLink) => {
              const icon = SOCIAL_PLATFORMS[socialLink.platform]
              return (
                <a
                  key={socialLink.id ?? socialLink.platform}
                  href={safeUrl(socialLink.url) ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
                >
                  <span className="sr-only">{icon.title}</span>
                  <svg aria-hidden className="size-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d={icon.path} />
                  </svg>
                </a>
              )
            })}
          </div>
          <p className="mt-8 text-sm/6 text-gray-600 md:order-1 md:mt-0 dark:text-gray-400">
            {footerData.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
