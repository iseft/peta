import { describe, it, expect, vi, afterEach } from 'vitest'
import { getServerSideURL } from '@/marketing/utils/getURL'

describe('Utils', () => {
  describe('getServerSideURL', () => {
    afterEach(() => vi.unstubAllEnvs())

    it('should return NEXT_PUBLIC_SERVER_URL when set', () => {
      vi.stubEnv('NEXT_PUBLIC_SERVER_URL', 'https://example.com')
      expect(getServerSideURL()).toBe('https://example.com')
    })

    it('throws rather than guessing an origin when it is not set', () => {
      vi.stubEnv('NEXT_PUBLIC_SERVER_URL', '')
      vi.stubEnv('VERCEL_PROJECT_PRODUCTION_URL', 'my-project.vercel.app')
      expect(() => getServerSideURL()).toThrow('NEXT_PUBLIC_SERVER_URL is not set')
    })
  })
})
