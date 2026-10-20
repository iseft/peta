import CountUpStatValue from './CountUpStatValue'

interface Stat {
  id?: string | null
  name: string
  value: string
}

interface StatsSimpleGridComponentProps {
  title: string
  description?: string | null
  stats?: Stat[] | null
}

export default function StatsSimpleGridComponent({
  title,
  description,
  stats,
}: StatsSimpleGridComponentProps) {
  const items = stats ?? []

  return (
    <div className="bg-paper py-24 sm:py-32 dark:bg-ink">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl dark:text-white">
              {title}
            </h2>
            {description && (
              <p className="mt-4 text-lg/8 text-gray-600 dark:text-gray-300">{description}</p>
            )}
          </div>
          {items.length > 0 && (
            <dl className="mx-auto mt-16 flex max-w-6xl flex-wrap justify-center gap-3 text-center">
              {items.map((stat) => (
                <div
                  key={stat.id ?? `${stat.name}-${stat.value}`}
                  className="flex w-full max-w-sm flex-col rounded-2xl bg-gray-400/5 p-8 sm:w-[calc(50%-0.375rem)] lg:w-[calc(25%-0.75rem)] dark:bg-white/5"
                >
                  <dt className="text-sm/6 font-semibold text-gray-600 dark:text-gray-300">
                    {stat.name}
                  </dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    <CountUpStatValue value={stat.value} />
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </div>
  )
}
