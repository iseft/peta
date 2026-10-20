import { Block } from 'payload'
import { LinkField } from '../../fields/LinkField'

export const HeroWithAngledImageOnRightBlock: Block = {
  slug: 'hero-angled-image',
  fields: [
    {
      name: 'supertitle',
      type: 'text',
    },
    {
      name: 'supertitleCta',
      type: 'group',
      fields: [...LinkField],
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
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
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
