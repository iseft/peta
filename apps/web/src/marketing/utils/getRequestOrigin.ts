import { headers } from 'next/headers'
import { getServerSideURL } from './getURL'

// The origin actually serving this request.
//
// `getServerSideURL` reads `NEXT_PUBLIC_SERVER_URL`, and Next inlines every
// `NEXT_PUBLIC_` value into the bundle during the build. `force-dynamic` does
// not change that: the substitution happens in the bundler, not at runtime, so
// a route that answers at request time still answers with the origin of
// whichever environment produced the image. For a sitemap or a robots.txt that
// means a promoted build advertising another environment's host.
//
// The request knows better than the build does, so ask it. Railway terminates
// TLS ahead of the app, which is why the scheme comes from the forwarded
// header rather than being assumed.
export const getRequestOrigin = async (): Promise<string> => {
  const requestHeaders = await headers()
  const host = requestHeaders.get('host')

  if (!host) return getServerSideURL()

  const protocol = requestHeaders.get('x-forwarded-proto') ?? 'https'

  return `${protocol}://${host}`
}
