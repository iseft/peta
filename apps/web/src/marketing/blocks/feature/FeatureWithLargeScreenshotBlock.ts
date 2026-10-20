import { Block } from 'payload'

export const FeatureWithLargeScreenshotBlock: Block = {
  slug: 'feature-with-large-screenshot',
  // Short table names: the full slug overflows Postgres's 63-character limit.
  dbName: 'feat_large_shot',
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
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'name',
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
  ],
}
