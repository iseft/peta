import { Block } from 'payload'

export const BlogTitleBlock: Block = {
  slug: 'blog-title',
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'level',
      type: 'select',
      options: [
        { label: 'H1', value: 'h1' },
        { label: 'H2', value: 'h2' },
        { label: 'H3', value: 'h3' },
        { label: 'H4', value: 'h4' },
        { label: 'H5', value: 'h5' },
        { label: 'H6', value: 'h6' },
      ],
      defaultValue: 'h2',
    },
  ],
}
