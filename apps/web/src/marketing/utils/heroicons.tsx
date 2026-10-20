import * as HeroIcons from '@heroicons/react/20/solid'
import { ComponentType, SVGProps } from 'react'

type HeroIcon = ComponentType<SVGProps<SVGSVGElement>>

const icons = HeroIcons as unknown as Record<string, HeroIcon>

// The name is typed into the CMS, so only an exported icon may be rendered:
// any other export of the module is not a component.
export const availableIcons = Object.keys(HeroIcons).filter((key) => key.endsWith('Icon'))
const iconNames = new Set(availableIcons)

export function getHeroIcon(iconName?: string | null): HeroIcon {
  return iconName && iconNames.has(iconName) ? icons[iconName] : HeroIcons.CheckCircleIcon
}
