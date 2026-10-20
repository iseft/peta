import { Block } from 'payload'

export const ImageBlock: Block = {
  slug: 'image',
  fields: [
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'caption', type: 'text' },
    { name: 'alt', type: 'text' },
    { name: 'showCaption', type: 'checkbox', defaultValue: true },
    {
      name: 'alignment',
      type: 'select',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
        { label: 'Full Width', value: 'full' },
      ],
      defaultValue: 'center',
    },
    {
      name: 'fit',
      type: 'select',
      options: [
        { label: 'Contain', value: 'contain' },
        { label: 'Cover', value: 'cover' },
      ],
      defaultValue: 'contain',
    },
  ],
}
