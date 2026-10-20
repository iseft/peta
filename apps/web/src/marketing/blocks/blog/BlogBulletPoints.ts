import { Block } from 'payload'

export const BlogBulletPointsBlock: Block = {
  slug: 'blog-bullet-points',
  fields: [
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'text', required: true },
        {
          name: 'iconName',
          type: 'text',
          admin: {
            description:
              'Heroicon name (e.g., "CheckCircleIcon", "InformationCircleIcon", "ExclamationTriangleIcon"). Defaults to CheckCircleIcon if not provided.',
          },
        },
      ],
    },
  ],
}
