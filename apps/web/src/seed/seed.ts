import { getPayload } from 'payload'
import config from '@payload-config'
import type { Page } from '@/payload-types'
import { pages } from './content'

// Creates the launch content in an empty CMS: `pnpm --filter web seed`.
// Never overwrites: a page whose slug exists, or a global already filled in,
// is left alone, so it is safe to run against a site editors have changed.

const payload = await getPayload({ config })

// A fresh Payload site lets anyone register the first account, as admin,
// through /api/users/first-register. The deploy runs this seed before the
// site serves, and it refuses to finish while no admin exists, so a
// deployment can never come up with that door open.
const { totalDocs: userCount } = await payload.count({ collection: 'users' })
if (userCount === 0) {
  const email = process.env.PAYLOAD_ADMIN_EMAIL
  const password = process.env.PAYLOAD_ADMIN_PASSWORD
  if (!email || !password) {
    payload.logger.error(
      'No CMS admin exists and PAYLOAD_ADMIN_EMAIL / PAYLOAD_ADMIN_PASSWORD are not set. Refusing to continue.',
    )
    process.exit(1)
  }
  await payload.create({
    collection: 'users',
    data: { email, password, role: 'admin' },
  })
  payload.logger.info(`admin ${email}: created`)
}

for (const page of pages) {
  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: page.slug } },
    limit: 1,
    draft: true,
  })
  if (existing.docs.length > 0) {
    payload.logger.info(`page /${page.slug}: exists, left alone`)
    continue
  }
  await payload.create({
    collection: 'pages',
    // Generated types mark every link group as required; Payload itself
    // accepts a block without its optional buttons.
    data: page as unknown as Omit<Page, 'id' | 'createdAt' | 'updatedAt'>,
    draft: page._status === 'draft',
  })
  payload.logger.info(`page /${page.slug}: created (${page._status})`)
}

const bySlug = async (slug: string) =>
  (
    await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      limit: 1,
      draft: true,
    })
  ).docs[0]?.id

const footer = await payload.findGlobal({ slug: 'footer' })
if (!footer.footerSections?.length) {
  const legal = await Promise.all(
    [
      ['Privacy', 'privacy'],
      ['Terms', 'terms'],
      ['Delete your account', 'delete-account'],
    ].map(async ([label, slug]) => ({
      label,
      linkType: 'internal' as const,
      page: await bySlug(slug),
    })),
  )
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      footerSections: [{ title: 'Legal', links: legal }],
      socialLinks: [],
      copyright: `© ${new Date().getFullYear()} Peta. Plan your money. See where it really goes.`,
    },
  })
  payload.logger.info('footer: filled in')
} else {
  payload.logger.info('footer: has content, left alone')
}

process.exit(0)
