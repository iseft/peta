interface HeaderLeftComponentProps {
  badge?: string
  title: string
  description?: string
}

export default function HeaderLeftComponent({
  badge,
  title,
  description,
}: HeaderLeftComponentProps) {
  return (
    <div className="bg-paper py-12 sm:py-16 dark:bg-ink">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          {badge && (
            <p className="text-base/7 font-semibold text-brand-600 dark:text-brand-400">
              {badge}
            </p>
          )}
          <h2 className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            {title}
          </h2>
          {description && (
            <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
