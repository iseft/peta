import { Block } from 'payload'

export const FeatureWithOffsetListBlock: Block = {
  slug: 'feature-offset-list',
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
              'Heroicon name (e.g., "CheckIcon", "CloudArrowUpIcon", "LockClosedIcon"). Defaults to CheckIcon if not provided.',
          },
        },
      ],
    },
  ],
}
