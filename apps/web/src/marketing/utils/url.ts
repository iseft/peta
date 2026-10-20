/**
 * Shared URL validation and sanitization utilities.
 * Used by Payload field validators (server-side) and React components (render-side).
 */

import { getSiteUrl } from '@/site'

const SAFE_PROTOCOLS = new Set(['https:', 'http:'])

const isHttpUrl = (url: string): boolean => {
  try {
    return SAFE_PROTOCOLS.has(new URL(url).protocol)
  } catch {
    return false
  }
}

/** Payload field validator — returns true or an error string. */
export const validateUrl = (value: string | null | undefined): true | string => {
  if (!value) return true
  let parsed: URL
  try {
    parsed = new URL(value)
  } catch {
    return 'Please enter a valid URL'
  }
  if (!SAFE_PROTOCOLS.has(parsed.protocol)) return 'URL must use http:// or https://'
  return true
}

/**
 * A path on this site, with any query or fragment: `/sign-up?as=reviewer`.
 * `//host` is a protocol-relative link to another site, so it is not one.
 */
export const isSitePath = (value: string): boolean =>
  value.startsWith('/') && !value.startsWith('//') && !value.startsWith('/\\')

/**
 * Validator for a link's URL: a full http(s) URL, or a path on this site, so
 * an app route such as sign-up can carry a query without naming the domain.
 */
export const validateLinkUrl = (value: string | null | undefined): true | string => {
  if (value && isSitePath(value)) return true
  const result = validateUrl(value)
  return result === true ? true : 'Enter a full URL (https://…) or a path on this site (/sign-up)'
}

/** Render-side sanitizer — returns the URL only if it uses http(s), else undefined. */
export const safeUrl = (url: string | null | undefined): string | undefined => {
  if (!url) return undefined
  return isHttpUrl(url) ? url : undefined
}

/**
 * Slugifies a section anchor into an element id.
 *
 * Editors type what they see in a URL, so "#pricing", "pricing" and "Our Pricing"
 * all arrive here. Fragment matching is case-sensitive and an id holding the hash
 * would never match, so the value is folded to one predictable form rather than
 * used as typed. Runs on save so the editor sees the id they have to link to, and
 * again on render so a row written before this existed still resolves.
 */
export const toAnchorId = (anchor: string | null | undefined): string | undefined =>
  anchor
    ?.toLowerCase()
    .replace(/^[\s#]+/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || undefined

export const getServerUrl = (): string => getSiteUrl()
