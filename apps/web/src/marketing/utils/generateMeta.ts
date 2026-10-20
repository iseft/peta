import type { Metadata } from 'next'
import type { Media, Page, Blog, Config } from '@/payload-types'
import { mergeOpenGraph } from './mergeOpenGraph'
import { getOgImageUrl } from './getOgImageUrl'
import { SITE_NAME } from '@/site'

const getImageURL = (
  image: Media | Config['db']['defaultIDType'] | null | undefined,
  title: string,
) => {
  if (image && typeof image === 'object' && image.url) {
    return image.sizes?.og?.url || image.url
  }
  return getOgImageUrl(title)
}

// `path` is where the page is served, which the slug alone does not say: the
// home page's slug is `home` and blog posts live under `/blog`.
export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Blog> | null
  path: string
}): Promise<Metadata> => {
  const { doc, path } = args

  const title = doc?.meta?.title ? doc?.meta?.title : SITE_NAME
  const description = doc?.meta?.description?.trim() || undefined
  const ogImage = getImageURL(doc?.meta?.image, title)

  return {
    description,
    alternates: { canonical: path },
    openGraph: mergeOpenGraph({
      description: description || '',
      images: [{ url: ogImage }],
      title,
      url: path,
    }),
    title,
  }
}
