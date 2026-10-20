interface TimelineItem {
  name: string
  description: string
  date: string
  isDate?: boolean
  isCurrent?: boolean
}

interface TimelineComponentProps {
  timelineItems: TimelineItem[]
}

function getDateTime(date: string): string {
  try {
    const dateObj = new Date(date)
    if (isNaN(dateObj.getTime())) {
      const match = date.match(/(\w+)\s+(\d{4})/)
      if (match) {
        const [, month, year] = match
        const monthMap: { [key: string]: string } = {
          Jan: '01',
          Feb: '02',
          Mar: '03',
          Apr: '04',
          May: '05',
          Jun: '06',
          Jul: '07',
          Aug: '08',
          Sep: '09',
          Oct: '10',
          Nov: '11',
          Dec: '12',
        }
        const monthNum = monthMap[month] || '01'
        return `${year}-${monthNum}`
      }
      return date
    }
    return dateObj.toISOString().slice(0, 7)
  } catch {
    return date
  }
}

export default function TimelineComponent({ timelineItems }: TimelineComponentProps) {
  const currentIndex = timelineItems.findIndex((item) => item.isCurrent)

  return (
    <div className="bg-paper py-12 sm:py-16 dark:bg-ink">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {timelineItems.map((item, index) => {
            const isCompleted = currentIndex !== -1 && index < currentIndex

            return (
              <div key={item.name} className="relative">
                {item.isDate ? (
                  <time
                    dateTime={getDateTime(item.date)}
                    className="flex items-center text-sm/6 font-semibold text-brand-600 dark:text-brand-400"
                  >
                    <svg viewBox="0 0 4 4" aria-hidden="true" className="mr-4 size-1 flex-none">
                      <circle r={2} cx={2} cy={2} fill="currentColor" />
                    </svg>
                    {item.date}
                    {item.isCurrent && (
                      <span className="ml-3 rounded-full bg-brand-600 px-2 py-0.5 text-xs font-medium text-white dark:bg-brand-500">
                        Now
                      </span>
                    )}
                    {isCompleted && (
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="ml-3 size-5 flex-none text-green-600 dark:text-green-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    <div
                      aria-hidden="true"
                      className="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0 dark:bg-white/15"
                    />
                  </time>
                ) : (
                  <div className="flex items-center text-sm/6 font-semibold text-brand-600 dark:text-brand-400">
                    <svg viewBox="0 0 4 4" aria-hidden="true" className="mr-4 size-1 flex-none">
                      <circle r={2} cx={2} cy={2} fill="currentColor" />
                    </svg>
                    {item.date}
                    {item.isCurrent && (
                      <span className="ml-3 rounded-full bg-brand-600 px-2 py-0.5 text-xs font-medium text-white dark:bg-brand-500">
                        Now
                      </span>
                    )}
                    {isCompleted && (
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="ml-3 size-5 flex-none text-green-600 dark:text-green-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    <div
                      aria-hidden="true"
                      className="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0 dark:bg-white/15"
                    />
                  </div>
                )}
                <p className="mt-6 text-lg/8 font-semibold tracking-tight text-gray-900 dark:text-white">
                  {item.name}
                </p>
                <p className="mt-1 text-base/7 text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
