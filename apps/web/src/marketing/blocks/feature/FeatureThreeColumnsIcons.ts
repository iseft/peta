import { Block } from 'payload'

export const FeatureThreeColumnsIconsBlock: Block = {
  slug: 'feature-three-columns-icons',
  // Short table names: the full slug overflows Postgres's 63-character limit.
  dbName: 'feat_three_cols',
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
          name: 'href',
          type: 'text',
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
