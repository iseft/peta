// The site's identity. One brand, so the name is fixed; the URL comes from the
// environment because local, preview and production differ.
export const SITE_NAME = 'Peta'

export const SITE_TAGLINE = 'Plan your money. See where it really goes.'

export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SERVER_URL
  if (!url) throw new Error('NEXT_PUBLIC_SERVER_URL is not set')
  return url
}
