import Image from 'next/image'
import { Media } from '@/payload-types'

interface BlogQuoteComponentProps {
  quote: string
  authorName: string
  authorTitle?: string
  authorImage?: Media
}

export default function BlogQuoteComponent({
  quote,
  authorName,
  authorTitle,
  authorImage,
}: BlogQuoteComponentProps) {
  return (
    <figure className="mt-10 border-l border-brand-600 pl-9 dark:border-brand-400">
      <blockquote className="font-semibold text-gray-900 dark:text-white">
        <p>&ldquo;{quote}&rdquo;</p>
      </blockquote>
      <figcaption className="mt-6 flex gap-x-4">
        {authorImage?.url && (
          <Image
            alt={authorImage.alt || authorName}
            src={authorImage.url}
            width={24}
            height={24}
            className="size-6 flex-none rounded-full bg-gray-50 dark:bg-gray-800"
          />
        )}
        <div className="text-sm/6">
          <strong className="font-semibold text-gray-900 dark:text-white">{authorName}</strong>
          {authorTitle && (
            <span className="text-gray-600 dark:text-gray-400"> – {authorTitle}</span>
          )}
        </div>
      </figcaption>
    </figure>
  )
}
