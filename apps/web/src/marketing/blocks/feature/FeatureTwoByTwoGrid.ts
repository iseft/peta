import { Block } from 'payload'

export const FeatureTwoByTwoGridBlock: Block = {
  slug: 'feature-two-by-two-grid',
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
      type: 'textarea',
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
