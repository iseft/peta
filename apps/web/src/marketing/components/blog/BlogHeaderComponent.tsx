interface BlogHeaderComponentProps {
  badge?: string
  title: string
  description?: string
}

export default function BlogHeaderComponent({
  badge,
  title,
  description,
}: BlogHeaderComponentProps) {
  return (
    <div className="mx-auto max-w-3xl text-base/7 text-gray-700 dark:text-gray-300 mt-12">
      {badge && (
        <p className="text-base/7 font-semibold text-brand-600 dark:text-brand-400">{badge}</p>
      )}
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
        {title}
      </h1>
      {description && <p className="mt-6 text-xl/8">{description}</p>}
    </div>
  )
}
