import { GlobalConfig } from 'payload'
import { LinkField } from '../fields/LinkField'

export const Nav: GlobalConfig = {
  slug: 'nav',
  access: { read: () => true },
  fields: [
    {
      name: 'showPromo',
      type: 'checkbox',
      defaultValue: false,
      label: 'Show Promo Banner',
    },
    {
      name: 'promoText',
      type: 'text',
      admin: {
        condition: (data) => data.showPromo,
      },
    },
    {
      name: 'items',
      type: 'array',
      label: 'Menu Items',
      fields: [...LinkField],
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Call to action button',
      fields: [...LinkField],
    },
  ],
}
