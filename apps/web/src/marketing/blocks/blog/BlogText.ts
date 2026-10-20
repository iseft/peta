import { Block } from 'payload'

export const BlogTextBlock: Block = {
  slug: 'blog-text',
  fields: [{ name: 'content', type: 'richText', required: true }],
}
