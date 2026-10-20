import { Block } from 'payload'
import { LinkField } from '../../fields/LinkField'

export const CtaSimpleStackedBlock: Block = {
  slug: 'cta-simple-stacked',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
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
