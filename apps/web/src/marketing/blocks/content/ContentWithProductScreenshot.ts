import { Block } from 'payload'

export const ContentWithProductScreenshotBlock: Block = {
  slug: 'content-product-screenshot',
  // Short table names: the full slug overflows Postgres's 63-character limit.
  dbName: 'content_product_shot',
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
      name: 'subtitle',
      type: 'text',
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
    {
      name: 'preBulletDescription',
      type: 'textarea',
    },
    {
      name: 'bullets',
      type: 'array',
      fields: [
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
          name: 'iconName',
          type: 'text',
          admin: {
            description:
              'Heroicon name (e.g., "CloudArrowUpIcon", "LockClosedIcon"). Defaults to CheckCircleIcon if not provided.',
          },
        },
      ],
    },
    {
      name: 'postBulletDescription',
      type: 'textarea',
    },
  ],
}
