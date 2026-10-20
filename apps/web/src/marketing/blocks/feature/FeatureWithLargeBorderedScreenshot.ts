import { Block } from 'payload'

export const FeatureWithLargeBorderedScreenshotBlock: Block = {
  slug: 'feature-bordered-screenshot',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'darkImage',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
