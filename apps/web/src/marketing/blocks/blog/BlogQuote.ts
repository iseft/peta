import { Block } from 'payload'

export const BlogQuoteBlock: Block = {
  slug: 'blog-quote',
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    { name: 'authorName', type: 'text', required: true },
    { name: 'authorTitle', type: 'text' },
    { name: 'authorImage', type: 'upload', relationTo: 'media' },
  ],
}
