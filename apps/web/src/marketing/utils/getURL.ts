import { getSiteUrl } from '@/site'
import canUseDOM from './canUseDOM'

// One configured origin; never guessed from the request.
export const getServerSideURL = () => getSiteUrl()

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  return getSiteUrl()
}
