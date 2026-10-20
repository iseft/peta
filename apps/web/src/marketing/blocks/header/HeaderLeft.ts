import { Block } from 'payload'

export const HeaderLeftBlock: Block = {
  slug: 'header-left',
  fields: [
    {
      name: 'badge',
      type: 'text',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
    },
  ],
}
