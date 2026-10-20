import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    // Local disk in development; the S3 adapter takes over when configured.
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        fit: 'contain',
      },
      {
        name: 'square',
        width: 500,
        height: 500,
        fit: 'contain',
      },
      {
        name: 'small',
        width: 600,
        fit: 'contain',
      },
      {
        name: 'medium',
        width: 900,
        fit: 'contain',
      },
      {
        name: 'large',
        width: 1400,
        fit: 'contain',
      },
      {
        name: 'xlarge',
        width: 1920,
        fit: 'contain',
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        fit: 'contain',
      },
    ],
  },
}
