import Image from 'next/image'
import { Blog, Media } from '@/payload-types'

interface BlogAuthorProps {
  name?: string | null
  role?: string | null
  href?: string | null
  image?: Blog['authorImage']
  imageSize?: number
  className?: string
}

const getInitials = (name?: string | null) =>
  name
    ?.split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('') || 'PW'

const getImage = (image?: Blog['authorImage']): Media | null =>
  image && typeof image === 'object' && 'url' in image ? image : null

export default function BlogAuthor({
  name,
  role,
  href,
  image,
  imageSize = 40,
  className,
}: BlogAuthorProps) {
  if (!name && !role) {
    return null
  }

  const authorImage = getImage(image)
  const initials = getInitials(name)

  return (
    <div className={`relative flex items-center gap-x-4 ${className || ''}`.trim()}>
      {authorImage?.url ? (
        <Image
          alt={authorImage.alt || name || 'Author avatar'}
          src={authorImage.url}
          width={imageSize}
          height={imageSize}
          className="rounded-full bg-gray-50 object-cover dark:bg-gray-800"
        />
      ) : (
        <div
          className="flex items-center justify-center rounded-full bg-gray-100 font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-200"
          style={{ height: imageSize, width: imageSize }}
        >
          {initials}
        </div>
      )}
      <div className="text-sm/6">
        {name && (
          <p className="font-semibold text-gray-900 dark:text-white">
            {href ? (
              <a
                href={href}
                className="transition hover:text-brand-600 dark:hover:text-brand-300"
              >
                {name}
              </a>
            ) : (
              name
            )}
          </p>
        )}
        {role && <p className="text-gray-600 dark:text-gray-300">{role}</p>}
      </div>
    </div>
  )
}
