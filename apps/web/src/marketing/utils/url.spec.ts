import { describe, it, expect } from 'vitest'
import { isSitePath, toAnchorId, validateLinkUrl } from '@/marketing/utils/url'
import { getHref, isExternal } from '@/marketing/utils/linkUtils'

describe('toAnchorId', () => {
  it('leaves a value that is already an id alone', () => {
    expect(toAnchorId('pricing')).toBe('pricing')
  })

  it('strips the hash an editor copied out of the URL bar', () => {
    expect(toAnchorId('#pricing')).toBe('pricing')
    expect(toAnchorId('##pricing')).toBe('pricing')
  })

  // The hash and the word are usually separated when someone pastes and edits,
  // and that space used to survive as a leading dash: id="-pricing".
  it('does not turn a space after the hash into a leading dash', () => {
    expect(toAnchorId('  # pricing  ')).toBe('pricing')
  })

  // Fragment matching is case-sensitive, so "Our Pricing" as typed would only
  // answer to /#Our-Pricing -- not the /#our-pricing an editor would write.
  it('folds case and joins words with a dash', () => {
    expect(toAnchorId('Our Pricing')).toBe('our-pricing')
    expect(toAnchorId('our   pricing')).toBe('our-pricing')
  })

  it('collapses anything that is not a letter or number', () => {
    expect(toAnchorId('our/pricing?x')).toBe('our-pricing-x')
    expect(toAnchorId('pricing_&_plans')).toBe('pricing-plans')
  })

  it('gives back nothing when there is no anchor to make', () => {
    expect(toAnchorId(null)).toBeUndefined()
    expect(toAnchorId(undefined)).toBeUndefined()
    expect(toAnchorId('')).toBeUndefined()
    expect(toAnchorId('   ')).toBeUndefined()
    expect(toAnchorId('#')).toBeUndefined()
    expect(toAnchorId('---')).toBeUndefined()
  })

  // Rendering runs it over a value the save hook already normalised.
  it('is idempotent', () => {
    const once = toAnchorId('  # Our Pricing! ')
    expect(once).toBe('our-pricing')
    expect(toAnchorId(once)).toBe(once)
  })
})

describe('validateLinkUrl', () => {
  it.each(['/sign-up?as=reviewer', '/for-reviewers#pricing', '/', 'https://example.org/a?b=c'])(
    'accepts %s',
    (value) => {
      expect(validateLinkUrl(value)).toBe(true)
    },
  )

  it.each(['//evil.example/x', '/\\evil.example', 'javascript:alert(1)', 'sign-up', 'ftp://x.y'])(
    'refuses %s',
    (value) => {
      expect(validateLinkUrl(value)).toEqual(expect.any(String))
    },
  )

  it('allows an empty value, as the field is optional', () => {
    expect(validateLinkUrl('')).toBe(true)
  })
})

describe('isSitePath', () => {
  it('treats a protocol-relative url as another site', () => {
    expect(isSitePath('//evil.example')).toBe(false)
    expect(isSitePath('/sign-up')).toBe(true)
  })
})

describe('isExternal', () => {
  it('keeps a path on this site in the app, query and all', () => {
    const link = { linkType: 'external' as const, url: '/sign-up?as=reviewer' }

    expect(getHref(link)).toBe('/sign-up?as=reviewer')
    expect(isExternal(link)).toBe(false)
  })

  it('still treats a full url as external', () => {
    expect(isExternal({ linkType: 'external', url: 'https://example.org' })).toBe(true)
  })
})
