import { postgresAdapter } from '@payloadcms/db-postgres'
import { s3Storage } from '@payloadcms/storage-s3'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './marketing/collections/Users'
import { Media } from './marketing/collections/Media'
import { Pages } from './marketing/collections/Pages'
import { Nav } from './marketing/collections/Nav'
import { Footer } from './marketing/collections/Footer'
import { Blog } from './marketing/collections/Blog'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '· Peta',
      icons: [{ rel: 'icon', type: 'image/svg+xml', url: '/favicon.svg' }],
    },
    components: {
      graphics: {
        Logo: '@/marketing/components/admin/Logo#Logo',
        Icon: '@/marketing/components/admin/Logo#Icon',
      },
    },
  },
  collections: [Users, Media, Pages, Blog],
  globals: [Nav, Footer],
  editor: lexicalEditor(),
  secret: (() => {
    const s = process.env.PAYLOAD_SECRET
    if (!s) throw new Error('PAYLOAD_SECRET environment variable is required')
    return s
  })(),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    // The API's Prisma tables live in `public`; the CMS keeps to its own schema
    // in the same database so neither tool ever touches the other's tables.
    schemaName: 'payload',
    push: false,
    migrationDir: path.resolve(dirname, 'marketing/migrations'),
    pool: {
      connectionString: process.env.DATABASE_URL,
      // `true` verifies the certificate for a managed database; otherwise the
      // connection string decides.
      ...(process.env.DATABASE_SSL === 'true' ? { ssl: true } : {}),
    },
  }),
  sharp,
  plugins: [
    s3Storage({
      // Off until fully configured, so a local checkout keeps writing to disk
      // rather than failing on a bucket nobody has.
      enabled: Boolean(
        process.env.S3_BUCKET && process.env.S3_ACCESS_KEY_ID && process.env.S3_SECRET_ACCESS_KEY,
      ),
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET ?? '',
      config: {
        endpoint: process.env.S3_ENDPOINT,
        region: process.env.S3_REGION ?? 'auto',
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID ?? '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? '',
        },
      },
    }),
    seoPlugin({
      collections: ['pages', 'blog'],
      uploadsCollection: 'media',
    }),
  ],
})
