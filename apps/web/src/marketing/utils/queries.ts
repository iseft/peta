import { getPayload } from 'payload'
import config from '@/payload.config'
import { cache } from 'react'
import { headers } from 'next/headers'
import { unstable_rethrow } from 'next/navigation'

/**
 * IMPORTANT: Payload CMS Access Control Behavior
 *
 * The access control defined in collection configurations (e.g., publicReadAccess)
 * only applies to API requests (like /api/pages), NOT to direct database queries
 * made with getPayload(). This means frontend queries bypass access control.
 *
 * To properly enforce draft access control in frontend queries, we need to:
 * 1. Check authentication status manually using payload.auth()
 * 2. Apply draft restrictions in the query logic based on auth status
 * 3. Filter out draft documents for unauthenticated users
 */

interface QueryOptions {
  includeDrafts?: boolean
}

interface AuthResult {
  isAuthenticated: boolean
  user?: {
    id: string | number
    email: string
    role?: string | null
  }
}

const isUserAuthenticated = async (): Promise<AuthResult> => {
  try {
    const payload = await getPayload({ config: await config })
    const { user } = await payload.auth({ headers: await headers() })
    return {
      isAuthenticated: !!user,
      user: user || undefined,
    }
  } catch (error) {
    // Next signals "this page is dynamic" by throwing; that is not a failure.
    unstable_rethrow(error)
    console.error('❌ Authentication error:', error)
    return {
      isAuthenticated: false,
      user: undefined,
    }
  }
}

// Exported so the sitemap asks the same question the pages themselves do --
// two definitions of "published" would let it advertise urls that 404.
export const createPublishedOnlyQuery = () => ({
  or: [
    {
      _status: {
        equals: 'published',
      },
    },
    {
      _status: {
        exists: false,
      },
    },
  ],
})

const createSlugQuery = (slug: string, options: QueryOptions = {}) => {
  const baseQuery = {
    slug: {
      equals: slug,
    },
  }

  if (!options.includeDrafts) {
    return {
      and: [baseQuery, createPublishedOnlyQuery()],
    }
  }

  return baseQuery
}

export const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: await config })
  const auth = await isUserAuthenticated()

  const result = await payload.find({
    collection: 'pages',
    limit: 1,
    where: createSlugQuery(slug, { includeDrafts: auth.isAuthenticated }),
    draft: auth.isAuthenticated,
  })

  return result.docs?.[0] || null
})

export const queryBlogPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: await config })
  const auth = await isUserAuthenticated()

  const result = await payload.find({
    collection: 'blog',
    limit: 1,
    where: createSlugQuery(slug, { includeDrafts: auth.isAuthenticated }),
    draft: auth.isAuthenticated,
  })

  return result.docs?.[0] || null
})

export const queryHomePage = cache(async () => {
  const payload = await getPayload({ config: await config })
  const auth = await isUserAuthenticated()

  const result = await payload.find({
    collection: 'pages',
    where: createSlugQuery('home', { includeDrafts: auth.isAuthenticated }),
    limit: 1,
    draft: auth.isAuthenticated,
  })

  return result.docs?.[0] || null
})

export const queryPublishedBlogPosts = cache(async (limit = 100) => {
  const payload = await getPayload({ config: await config })
  const auth = await isUserAuthenticated()

  const result = await payload.find({
    collection: 'blog',
    limit,
    sort: '-createdAt',
    where: auth.isAuthenticated ? {} : createPublishedOnlyQuery(),
    draft: auth.isAuthenticated,
  })

  return result.docs
})

export const queryNavigation = cache(async () => {
  try {
    const payload = await getPayload({ config: await config })
    const navData = await payload.findGlobal({
      slug: 'nav',
    })
    return navData
  } catch (error) {
    console.warn('Failed to load navigation data:', error)
    return null
  }
})
