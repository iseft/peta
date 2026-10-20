// Uploads src/legal/*.md to a running site as **drafts** of the matching
// pages, over Payload's REST API; publishing stays a click in /admin.
//   SITE_URL=… PAYLOAD_ADMIN_EMAIL=… PAYLOAD_ADMIN_PASSWORD=… pnpm --filter web push:legal
// (`pnpm run push:legal:prod` at the root fills these in from 1Password.)
import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseMarkdownPage } from './markdown'

const site = process.env.SITE_URL?.replace(/\/$/, '')
const email = process.env.PAYLOAD_ADMIN_EMAIL
const password = process.env.PAYLOAD_ADMIN_PASSWORD
if (!site || !email || !password) {
  throw new Error('Set SITE_URL, PAYLOAD_ADMIN_EMAIL and PAYLOAD_ADMIN_PASSWORD')
}

async function api(path: string, init: RequestInit = {}, token?: string) {
  const response = await fetch(`${site}/api${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `JWT ${token}` }),
    },
  })
  if (!response.ok) throw new Error(`${init.method ?? 'GET'} ${path}: ${response.status} ${await response.text()}`)
  return response.json()
}

const { token } = await api('/users/login', {
  method: 'POST',
  body: JSON.stringify({ email, password }),
})

const dir = join(dirname(fileURLToPath(import.meta.url)), '../legal')
for (const file of readdirSync(dir).filter((name) => name.endsWith('.md'))) {
  const page = parseMarkdownPage(readFileSync(join(dir, file), 'utf8'))
  const query = new URLSearchParams({ 'where[slug][equals]': page.slug, draft: 'true', depth: '0' })
  const { docs } = await api(`/pages?${query}`, {}, token)
  if (docs.length === 0) throw new Error(`No page with slug "${page.slug}" on ${site}; run the seed first`)

  await api(
    `/pages/${docs[0].id}?draft=true`,
    {
      method: 'PATCH',
      body: JSON.stringify({ title: page.title, content: [{ blockType: 'rich-text', content: page.content }] }),
    },
    token,
  )
  console.log(`/${page.slug}: draft updated on ${site}`)
}
