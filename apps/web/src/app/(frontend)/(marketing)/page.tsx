import { notFound } from 'next/navigation'
import { RenderBlocks } from '@/marketing/blocks/RenderBlocks'
import { Metadata } from 'next'
import { generateMeta } from '@/marketing/utils/generateMeta'
import { queryHomePage } from '@/marketing/utils/queries'

export async function generateMetadata(): Promise<Metadata> {
  const page = await queryHomePage()
  return generateMeta({ doc: page, path: '/' })
}

export default async function HomePage() {
  const page = await queryHomePage()

  if (!page) {
    notFound()
  }

  return (
    <div className="page">
      <RenderBlocks blocks={page.content} />
    </div>
  )
}
