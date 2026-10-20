import { Block } from 'payload'

export const FaqBlock: Block = {
  slug: 'faq',
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'faqs',
      type: 'array',
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
  ],
}
