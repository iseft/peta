import type { Metadata } from 'next'
import { getOgImageUrl } from './getOgImageUrl'
import { SITE_NAME } from '@/site'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  images: [{ url: getOgImageUrl(), width: 1200, height: 630 }],
  siteName: SITE_NAME,
  title: SITE_NAME,
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
