import { notFound } from 'next/navigation'
import { RenderBlocks } from '@/marketing/blocks/RenderBlocks'
import { Metadata } from 'next'
import { generateMeta } from '@/marketing/utils/generateMeta'
import { queryBlogPostBySlug } from '@/marketing/utils/queries'
import BlogAuthor from '@/marketing/components/blog/BlogAuthor'

interface BlogPostProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params
  const post = await queryBlogPostBySlug({ slug })

  return generateMeta({ doc: post, path: `/blog/${slug}` })
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params
  const post = await queryBlogPostBySlug({ slug })

  if (!post) {
    notFound()
  }

  const [firstBlock, ...remainingBlocks] = post.content
  const hasHeaderBlock = firstBlock?.blockType === 'blog-header'

  return (
    <div className="blog-post mx-auto max-w-3xl py-8">
      {hasHeaderBlock ? (
        <>
          <RenderBlocks blocks={[firstBlock]} />
          <div className="mt-8 border-b border-gray-200 pb-8 dark:border-gray-800">
            <BlogAuthor
              name={post.authorName}
              role={post.authorRole}
              href={post.authorHref}
              image={post.authorImage}
              imageSize={48}
            />
          </div>
          <RenderBlocks blocks={remainingBlocks} />
        </>
      ) : (
        <>
          <div className="mt-12 border-b border-gray-200 pb-8 dark:border-gray-800">
            <BlogAuthor
              name={post.authorName}
              role={post.authorRole}
              href={post.authorHref}
              image={post.authorImage}
              imageSize={48}
            />
          </div>
          <RenderBlocks blocks={post.content} />
        </>
      )}
    </div>
  )
}
