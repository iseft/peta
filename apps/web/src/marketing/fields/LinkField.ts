import { Field } from 'payload'
import type { Page } from '@/payload-types'
import { validateLinkUrl } from '../utils/url'

export interface LinkData {
  label?: string | null
  linkType: 'internal' | 'external'
  page?: number | string | Page | null
  url?: string | null
  openInNewTab?: boolean | null
}

export const LinkField: Field[] = [
  {
    name: 'label',
    type: 'text',
  },
  {
    name: 'linkType',
    type: 'select',
    required: true,
    options: [
      { label: 'Internal Page', value: 'internal' },
      { label: 'URL or path', value: 'external' },
    ],
    defaultValue: 'internal',
  },
  {
    name: 'page',
    type: 'relationship',
    relationTo: 'pages',
    admin: {
      condition: (_data, siblingData) => {
        return siblingData.linkType === 'internal'
      },
    },
  },
  {
    name: 'url',
    type: 'text',
    admin: {
      condition: (_data, siblingData) => {
        return siblingData.linkType === 'external'
      },
      description:
        'A full URL (https://…) or a path on this site, with any query or anchor: /sign-up?as=reviewer, /for-reviewers#pricing.',
    },
    validate: validateLinkUrl,
  },
  {
    name: 'openInNewTab',
    type: 'checkbox',
    defaultValue: false,
  },
]
