import { Fragment, type ReactNode } from 'react'

const TAG_PATTERN = /<(\/?)(strong|b|em|i|br)\s*\/?>/gi

// CMS text fields that allow a little emphasis. Only these tags become
// elements; anything else stays visible text, so no markup is ever injected.
export function renderInlineHtml(text: string): ReactNode {
  const root: ReactNode[] = []
  const stack: { tag: 'strong' | 'em'; children: ReactNode[] }[] = []
  const current = () => (stack.length ? stack[stack.length - 1].children : root)

  let lastIndex = 0
  let key = 0
  for (const match of text.matchAll(TAG_PATTERN)) {
    current().push(text.slice(lastIndex, match.index))
    lastIndex = match.index + match[0].length

    const closing = match[1] === '/'
    const name = match[2].toLowerCase()
    if (name === 'br') {
      current().push(<br key={key++} />)
      continue
    }

    const tag = name === 'strong' || name === 'b' ? 'strong' : 'em'
    if (!closing) {
      stack.push({ tag, children: [] })
    } else if (stack.length && stack[stack.length - 1].tag === tag) {
      const { tag: Tag, children } = stack.pop()!
      current().push(<Tag key={key++}>{children}</Tag>)
    }
  }
  current().push(text.slice(lastIndex))

  while (stack.length) {
    const { children } = stack.pop()!
    current().push(<Fragment key={key++}>{children}</Fragment>)
  }
  return root
}
