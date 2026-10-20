import { Block } from 'payload'
import { LinkField } from '../../fields/LinkField'

export const CtaCenteredDarkPanelBlock: Block = {
  slug: 'cta-dark-panel',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'cta',
      type: 'group',
      fields: [...LinkField],
    },
    {
      name: 'cta2',
      type: 'group',
      fields: [...LinkField],
    },
  ],
}
