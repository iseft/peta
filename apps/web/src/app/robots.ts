import type { MetadataRoute } from 'next'
import { getRequestOrigin } from '@/marketing/utils/getRequestOrigin'

// The origin comes from the request rather than `NEXT_PUBLIC_SERVER_URL`,
// which Next inlines during the build.
export const dynamic = 'force-dynamic'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const url = await getRequestOrigin()

  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/admin'] },
    sitemap: `${url}/sitemap.xml`,
  }
}
