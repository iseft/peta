import { getServerUrl } from './url'

const revalidate = async (path: string) => {
  try {
    const serverUrl = getServerUrl()
    const res = await fetch(`${serverUrl}/api/revalidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-revalidate-secret': process.env.REVALIDATE_SECRET!,
      },
      body: JSON.stringify({ path }),
    })
    if (!res.ok) {
      console.error(`Cache revalidation failed for ${path}: HTTP ${res.status}`)
    }
  } catch (error) {
    console.error('Error revalidating cache:', error)
  }
}

/** Revalidates `{prefix}/{doc.slug}` on afterChange. */
export const createRevalidatePathHook = (prefix: string = '') => {
  return async ({ doc }: { doc: { slug: string } }) => {
    const path = prefix ? `${prefix}/${doc.slug}` : `/${doc.slug}`
    await revalidate(path)
  }
}

/** Revalidates a fixed path (e.g. '/seo-tools') on afterChange/afterDelete. */
export const createRevalidateFixedPathHook = (path: string) => {
  return async () => {
    await revalidate(path)
  }
}
