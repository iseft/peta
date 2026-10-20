import BlogList from '@/marketing/components/BlogList'
import { Metadata } from 'next'
import { queryPublishedBlogPosts } from '@/marketing/utils/queries'
import { SITE_NAME } from '@/site'

export const metadata: Metadata = {
  title: `Blog | ${SITE_NAME}`,
  description:
    'Learn how to get noticed, give and receive valuable feedback, and turn pitches into real opportunities.',
}

export default async function BlogIndex() {
  const posts = await queryPublishedBlogPosts(100)

  return <BlogList posts={posts} />
}
