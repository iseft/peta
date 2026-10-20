import Link from 'next/link'
import { LinkData } from '@/marketing/fields/LinkField'
import { isSitePath } from './url'

export function getHref(link: LinkData): string {
  if (link.linkType === 'internal' && link.page && typeof link.page === 'object') {
    return `/${link.page.slug}`
  }
  return link.url || '#'
}

export function isExternal(link: LinkData): boolean {
  return link.linkType === 'external' && !isSitePath(getHref(link))
}

export function renderLink(link: LinkData, children: React.ReactNode, className?: string) {
  const href = getHref(link)
  const external = isExternal(link)

  if (external) {
    return (
      <a
        href={href}
        target={link.openInNewTab ? '_blank' : '_self'}
        rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
        className={className}
      >
        {children}
      </a>
    )
  }

  return (
    <Link
      href={href}
      target={link.openInNewTab ? '_blank' : undefined}
      rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
      className={className}
    >
      {children}
    </Link>
  )
}
