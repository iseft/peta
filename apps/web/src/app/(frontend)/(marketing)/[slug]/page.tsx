import { notFound } from 'next/navigation'
import { RenderBlocks } from '@/marketing/blocks/RenderBlocks'
import { Metadata } from 'next'
import { generateMeta } from '@/marketing/utils/generateMeta'
import { queryPageBySlug } from '@/marketing/utils/queries'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = await queryPageBySlug({ slug })

  return generateMeta({ doc: page, path: slug === 'home' ? '/' : `/${slug}` })
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const page = await queryPageBySlug({ slug })

  if (!page) {
    notFound()
  }

  return (
    <div className="page">
      <RenderBlocks blocks={page.content} />
    </div>
  )
}
