import { siInstagram, siReddit, siThreads, siTiktok, siX, siYoutube } from 'simple-icons'

// Footer social icons come from this fixed set, never from markup stored in
// the CMS: raw SVG from the database would be an XSS hole on every page.
export const SOCIAL_PLATFORMS = {
  instagram: siInstagram,
  tiktok: siTiktok,
  youtube: siYoutube,
  x: siX,
  reddit: siReddit,
  threads: siThreads,
} as const

export type SocialPlatform = keyof typeof SOCIAL_PLATFORMS

export const SOCIAL_PLATFORM_OPTIONS = Object.entries(SOCIAL_PLATFORMS).map(([value, icon]) => ({
  label: icon.title,
  value,
}))
