import { describe, it, expect, vi } from 'vitest'

vi.mock('@/site', () => ({ SITE_NAME: 'Site' }))

import { generateMeta } from './generateMeta'

describe('generateMeta', () => {
  it('points the canonical and preview url at the path the page is served on', async () => {
    const meta = await generateMeta({ doc: { slug: 'home' }, path: '/' })

    expect(meta.alternates?.canonical).toBe('/')
    expect(meta.openGraph?.url).toBe('/')
  })

  it('trims stray whitespace from the description', async () => {
    const meta = await generateMeta({
      doc: { meta: { description: '  Pitch sites. ' } },
      path: '/x',
    })

    expect(meta.description).toBe('Pitch sites.')
    expect(meta.openGraph?.description).toBe('Pitch sites.')
  })
})
