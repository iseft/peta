import { GlobalConfig } from 'payload'
import { SOCIAL_PLATFORM_OPTIONS } from '../utils/socialIcons'
import { validateLinkUrl, validateUrl } from '../utils/url'

export const Footer: GlobalConfig = {
  slug: 'footer',
  fields: [
    {
      name: 'footerSections',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
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
                condition: (_data, siblingData) => siblingData.linkType === 'internal',
              },
            },
            {
              name: 'url',
              type: 'text',
              validate: validateLinkUrl,
              admin: {
                condition: (_data, siblingData) => siblingData.linkType === 'external',
              },
            },
            {
              name: 'openInNewTab',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                condition: (_data, siblingData) => siblingData.linkType === 'external',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: SOCIAL_PLATFORM_OPTIONS,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          validate: validateUrl,
        },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      required: true,
    },
  ],
}
