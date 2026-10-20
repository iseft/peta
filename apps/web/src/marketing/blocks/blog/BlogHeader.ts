import { Block } from 'payload'

export const BlogHeaderBlock: Block = {
  slug: 'blog-header',
  fields: [
    { name: 'badge', type: 'text' },
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'text' },
  ],
}
