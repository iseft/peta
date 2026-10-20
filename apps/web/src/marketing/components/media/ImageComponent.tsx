import Image from 'next/image'
import { Media } from '@/payload-types'

interface ImageComponentProps {
  image: Media
  caption?: string
  alt?: string
  showCaption?: boolean
  alignment?: 'left' | 'center' | 'right' | 'full'
  fit?: 'cover' | 'contain'
  className?: string
  captionClassName?: string
}

export default function ImageComponent({
  image,
  caption,
  alt,
  showCaption = true,
  alignment = 'center',
  fit = 'contain',
  className = '',
  captionClassName = '',
}: ImageComponentProps) {
  if (!image?.url) {
    return null
  }

  const alignmentClass =
    alignment === 'left'
      ? 'lg:float-left lg:mr-10 lg:max-w-xl'
      : alignment === 'right'
        ? 'lg:float-right lg:ml-10 lg:max-w-xl'
        : alignment === 'full'
          ? 'max-w-none'
          : 'max-w-3xl'

  const fitClass = fit === 'cover' ? 'object-cover' : 'object-contain'

  const baseImageClasses = `w-full rounded-xl border-2 border-ink dark:border-paper`
  const imageClasses = `${baseImageClasses} ${fitClass} ${className}`.trim()

  return (
    <div className={`mx-auto w-full px-6 lg:px-8 ${alignmentClass}`.trim()}>
      <Image
        alt={alt || image.alt || ''}
        src={image.url}
        width={image.width || 1310}
        height={image.height || 873}
        className={imageClasses}
        loading="lazy"
        sizes="(min-width: 1280px) 1024px, (min-width: 1024px) 768px, 100vw"
      />
      {showCaption && caption && (
        <p className={`mt-4 text-sm/6 text-gray-500 dark:text-gray-400 ${captionClassName}`.trim()}>
          {caption}
        </p>
      )}
    </div>
  )
}
