import { describe, it, expect } from 'vitest'
import { CheckCircleIcon, LockClosedIcon } from '@heroicons/react/20/solid'
import { getHeroIcon } from './heroicons'

describe('getHeroIcon', () => {
  it('returns the named icon', () => {
    expect(getHeroIcon('LockClosedIcon')).toBe(LockClosedIcon)
  })

  it.each([null, undefined, '', 'NotAnIcon', '__esModule', 'default', 'constructor'])(
    'falls back to a check for %s',
    (name) => {
      expect(getHeroIcon(name)).toBe(CheckCircleIcon)
    },
  )
})
