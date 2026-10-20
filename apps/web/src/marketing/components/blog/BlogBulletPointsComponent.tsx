import { getHeroIcon } from '@/marketing/utils/heroicons'

interface BulletPointItem {
  title: string
  description: string
  iconName?: string
}

interface BlogBulletPointsComponentProps {
  items: BulletPointItem[]
}

export default function BlogBulletPointsComponent({ items }: BlogBulletPointsComponentProps) {
  return (
    <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600 dark:text-gray-400">
      {items.map((item, index) => {
        const IconComponent = getHeroIcon(item.iconName)
        return (
          <li key={index} className="flex gap-x-3">
            <IconComponent
              aria-hidden="true"
              className="mt-1 size-5 flex-none text-brand-600 dark:text-brand-400"
            />
            <span>
              <strong className="font-semibold text-gray-900 dark:text-white">{item.title}</strong>{' '}
              {item.description}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
