import { Block } from 'payload'

export const FeatureSimpleBlock: Block = {
  slug: 'feature-simple',
  fields: [
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
      name: 'description',
      type: 'text',
      admin: {
        description: 'You can use <strong>, <em> and <br>. Other HTML shows as plain text.',
      },
    },
    {
      name: 'centered',
      type: 'checkbox',
      defaultValue: false,
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
      ],
    },
  ],
}
