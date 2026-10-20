import { createElement } from 'react'

interface VideoComponentProps {
  videoUrl: string
  alignment?: 'left' | 'center' | 'right' | 'full'
  autoPlay?: boolean
  mute?: boolean
  loop?: boolean
  showControls?: boolean
  showRelated?: boolean
  modestBranding?: boolean
  showFullscreenButton?: boolean
  playsInline?: boolean
  startSeconds?: number
  endSeconds?: number
  title?: string
  titleHeadingLevel?: 1 | 2 | 3 | 4 | 5 | 6
  titleAlignment?: 'left' | 'center' | 'right'
  description?: string
  descriptionAlignment?: 'left' | 'center' | 'right'
}

function extractVideoId(url: string) {
  try {
    const parsed = new URL(url.trim())
    if (parsed.hostname === 'youtu.be') {
      return parsed.pathname.slice(1)
    }
    if (parsed.pathname.startsWith('/embed/')) {
      return parsed.pathname.split('/')[2] || ''
    }
    if (parsed.searchParams.has('v')) {
      return parsed.searchParams.get('v') || ''
    }
  } catch {
    return ''
  }
  return ''
}

export default function VideoComponent({
  videoUrl,
  alignment = 'center',
  autoPlay = false,
  mute = false,
  loop = false,
  showControls = true,
  showRelated = false,
  modestBranding = true,
  showFullscreenButton = true,
  playsInline = true,
  startSeconds,
  endSeconds,
  title,
  titleHeadingLevel = 2,
  titleAlignment = 'left',
  description,
  descriptionAlignment = 'left',
}: VideoComponentProps) {
  const videoId = extractVideoId(videoUrl)

  if (!videoId) {
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

  const params = new URLSearchParams()
  params.set('rel', showRelated ? '1' : '0')
  params.set('controls', showControls ? '1' : '0')
  params.set('modestbranding', modestBranding ? '1' : '0')
  params.set('playsinline', playsInline ? '1' : '0')
  params.set('fs', showFullscreenButton ? '1' : '0')

  if (autoPlay) {
    params.set('autoplay', '1')
  }

  if (loop) {
    params.set('loop', '1')
    params.set('playlist', videoId)
  }

  if (autoPlay || mute) {
    params.set('mute', mute || autoPlay ? '1' : '0')
  }

  if (typeof startSeconds === 'number' && startSeconds >= 0) {
    params.set('start', String(Math.floor(startSeconds)))
  }

  if (typeof endSeconds === 'number' && endSeconds > 0) {
    params.set('end', String(Math.floor(endSeconds)))
  }

  const src = `https://www.youtube.com/embed/${videoId}?${params.toString()}`

  const normalizedHeadingLevel = Math.min(6, Math.max(1, Number(titleHeadingLevel || 2))) as
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
  const headingTagName = `h${normalizedHeadingLevel}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  const titleSizeClass =
    normalizedHeadingLevel === 1
      ? 'text-5xl sm:text-7xl'
      : normalizedHeadingLevel === 2
        ? 'text-4xl sm:text-5xl'
        : normalizedHeadingLevel === 3
          ? 'text-3xl sm:text-4xl'
          : normalizedHeadingLevel === 4
            ? 'text-2xl'
            : normalizedHeadingLevel === 5
              ? 'text-xl'
              : 'text-lg'
  const titleAlignmentClass =
    titleAlignment === 'center'
      ? 'text-center'
      : titleAlignment === 'right'
        ? 'text-right'
        : 'text-left'
  const descriptionAlignmentClass =
    descriptionAlignment === 'center'
      ? 'text-center'
      : descriptionAlignment === 'right'
        ? 'text-right'
        : 'text-left'

  return (
    <div className={`mx-auto w-full px-6 lg:px-8 ${alignmentClass}`.trim()}>
      {(title || description) && (
        <div className="mb-6">
          {title &&
            createElement(
              headingTagName,
              {
                className:
                  `${titleSizeClass} font-semibold tracking-tight text-pretty text-gray-900 dark:text-white ${titleAlignmentClass}`.trim(),
              },
              title,
            )}
          {description && (
            <p
              className={`mt-6 text-base/7 text-gray-700 dark:text-gray-300 ${descriptionAlignmentClass}`.trim()}
            >
              {description}
            </p>
          )}
        </div>
      )}
      <div className="relative w-full overflow-hidden rounded-xl shadow-xl ring-1 ring-gray-400/10 dark:ring-white/10">
        <div className="relative aspect-video w-full">
          <iframe
            src={src}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen={showFullscreenButton}
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      </div>
    </div>
  )
}
