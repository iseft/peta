import { CollectionConfig } from 'payload'
import { BLOG_BLOCKS } from '../blocks/index'
import { createRevalidatePathHook } from '../utils/revalidate'
import { publicReadAccess } from '../utils/accessControl'
import { getServerUrl } from '../utils/url'

export const Blog: CollectionConfig = {
  slug: 'blog',
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
    afterChange: [createRevalidatePathHook('/blog')],
    afterDelete: [createRevalidatePathHook('/blog')],
  },
  fields: [
    {
      name: 'url',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Open the current blog post URL in a new tab.',
        components: {
          Field: '@/marketing/components/admin/DocumentURLField#DocumentURLField',
        },
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            if (siblingData.slug) {
              return `${getServerUrl()}/blog/${siblingData.slug}`
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
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'authorName',
      type: 'text',
      required: true,
    },
    {
      name: 'authorRole',
      type: 'text',
      required: true,
    },
    {
      name: 'authorHref',
      type: 'text',
      required: false,
      admin: {
        description: 'Optional full URL for the author profile.',
      },
    },
    {
      name: 'authorImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'content',
      type: 'blocks',
      required: true,
      blocks: BLOG_BLOCKS,
    },
  ],
}
