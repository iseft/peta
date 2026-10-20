import { CollectionConfig } from 'payload'
import { PAGE_BLOCKS } from '../blocks/index'
import { createRevalidatePathHook } from '../utils/revalidate'
import { publicReadAccess } from '../utils/accessControl'
import { getServerUrl } from '../utils/url'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: publicReadAccess,
  },
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [createRevalidatePathHook()],
    afterDelete: [createRevalidatePathHook()],
  },
  fields: [
    {
      name: 'url',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Open the current page URL in a new tab.',
        components: {
          Field: '@/marketing/components/admin/DocumentURLField#DocumentURLField',
        },
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            if (siblingData.slug) {
              return `${getServerUrl()}/${siblingData.slug}`
            }
            return ''
          },
        ],
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'content',
      type: 'blocks',
      required: true,
      blocks: PAGE_BLOCKS,
    },
  ],
}
