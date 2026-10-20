import Image from 'next/image'
import Link from 'next/link'
import { Blog } from '@/payload-types'
import BlogAuthor from './blog/BlogAuthor'

interface BlogListProps {
  posts: Blog[]
}

export default function BlogList({ posts }: BlogListProps) {
  return (
    <div className="bg-paper py-12 sm:py-16 dark:bg-ink">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl dark:text-white">
            From the blog
          </h2>
          <p className="mt-2 text-lg/8 text-gray-600 dark:text-gray-300">
            Outreach and SEO tips from the trenches
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => {
            const coverImage = typeof post.coverImage === 'object' ? post.coverImage : null
            const imageUrl = coverImage?.url || '/placeholder-blog.jpg'
            const imageAlt = coverImage?.alt || post.title || 'Blog post cover image'

            return (
              <article key={post.id} className="flex flex-col items-start justify-between">
                <Link href={`/blog/${post.slug}`} className="group relative block w-full">
                  <Image
                    alt={imageAlt}
                    src={imageUrl}
                    width={1200}
                    height={630}
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="aspect-[40/21] w-full rounded-2xl bg-gray-100 object-cover transition-opacity group-hover:opacity-95 dark:bg-gray-800"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-2xl inset-ring inset-ring-gray-900/10 dark:inset-ring-white/10" />
                </Link>
                <div className="flex max-w-xl grow flex-col justify-between">
                  <div className="mt-8 flex items-center gap-x-4 text-xs">
                    <time
                      dateTime={new Date(post.createdAt).toISOString()}
                      className="text-gray-500 dark:text-gray-400"
                    >
                      {new Date(post.createdAt).toLocaleDateString()}
                    </time>
                    <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 dark:bg-gray-800/60 dark:text-gray-300">
                      Blog Post
                    </span>
                  </div>
                  <div className="group relative grow">
                    <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600 dark:text-white dark:group-hover:text-gray-300">
                      <Link href={`/blog/${post.slug}`}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600 dark:text-gray-400">
                      {post.meta?.description || 'Read more about this blog post.'}
                    </p>
                  </div>
                  <BlogAuthor
                    name={post.authorName}
                    role={post.authorRole}
                    href={post.authorHref}
                    image={post.authorImage}
                    className="mt-8"
                  />
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
