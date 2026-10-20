interface HeaderCenteredComponentProps {
  badge?: string
  title: string
  description?: string
}

export default function HeaderCenteredComponent({
  badge,
  title,
  description,
}: HeaderCenteredComponentProps) {
  return (
    <div className="bg-paper px-6 py-12 sm:py-16 lg:px-8 dark:bg-ink">
      <div className="mx-auto max-w-2xl text-center">
        {badge && (
          <p className="text-base/7 font-semibold text-brand-600 dark:text-brand-400">{badge}</p>
        )}
        <h2 className="mt-2 text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl dark:text-white">
          {title}
        </h2>
        {description && (
          <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
