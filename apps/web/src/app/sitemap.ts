import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { getRequestOrigin } from '@/marketing/utils/getRequestOrigin'
import { createPublishedOnlyQuery } from '@/marketing/utils/queries'

// Answered at request time, so publishing a page or post reaches the sitemap
// without a deploy.
export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })

  // Drafts are unreachable to anyone signed out, so listing them would hand
  // crawlers a page of 404s.
  const [blogPosts, pages] = await Promise.all([
    payload.find({ collection: 'blog', limit: 0, where: createPublishedOnlyQuery() }),
    payload.find({ collection: 'pages', limit: 0, where: createPublishedOnlyQuery() }),
  ])
  const url = await getRequestOrigin()

  return [
    { url, lastModified: new Date() },
    ...blogPosts.docs.map(({ slug, updatedAt }) => ({
      url: `${url}/blog/${slug}`,
      lastModified: new Date(updatedAt),
    })),
    ...pages.docs
      .filter(({ slug }) => slug !== 'home')
      .map(({ slug, updatedAt }) => ({
        url: `${url}/${slug}`,
        lastModified: new Date(updatedAt),
      })),
  ]
}
