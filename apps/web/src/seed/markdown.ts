import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { doc, h2, h3, p, ul } from './lexical'

// Turns a page written in a small Markdown subset (src/legal/*.md) into the
// Lexical JSON a "rich-text" block stores: front matter with title and slug,
// then `## `, `### `, paragraphs and one-level `- ` lists of plain text.
// Anything else throws, so unsupported formatting is never silently lost.

export type MarkdownPage = { title: string; slug: string; content: SerializedEditorState }

const UNSUPPORTED: [RegExp, string][] = [
  [/^#(?!#)|^#{4,}/, 'only ## and ### headings'],
  [/^\s*\d+[.)]\s/, 'numbered lists'],
  [/^\s+[-*]\s/, 'nested lists'],
  [/^[*+]\s/, 'lists must use "- "'],
  [/^>/, 'quotes'],
  [/^\|/, 'tables'],
  [/^```|^<|^!\[/, 'code, HTML or images'],
  [/\*\*|__|(^|\s)_\S|\[[^\]]*\]\([^)]*\)/, 'bold, italics or links'],
]

export function parseMarkdownPage(source: string): MarkdownPage {
  const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) throw new Error('Expected front matter between --- lines')
  const meta = Object.fromEntries(
    match[1].split('\n').map((line) => {
      const [key, ...value] = line.split(':')
      return [key.trim(), value.join(':').trim()]
    }),
  )
  if (!meta.title || !meta.slug) throw new Error('Front matter needs title and slug')

  const nodes: ReturnType<typeof p>[] = []
  let paragraph: string[] = []
  let list: string[] = []
  const flush = () => {
    if (paragraph.length) nodes.push(p(paragraph.join(' ')))
    if (list.length) nodes.push(ul(...list))
    paragraph = []
    list = []
  }

  match[2].split('\n').forEach((line, index) => {
    const trimmed = line.trimEnd()
    for (const [pattern, what] of UNSUPPORTED) {
      if (pattern.test(trimmed)) {
        throw new Error(`${meta.slug}.md line ${index + 1}: ${what} are not supported: "${trimmed}"`)
      }
    }
    if (trimmed === '') return flush()
    if (trimmed.startsWith('### ')) {
      flush()
      nodes.push(h3(trimmed.slice(4)))
    } else if (trimmed.startsWith('## ')) {
      flush()
      nodes.push(h2(trimmed.slice(3)))
    } else if (trimmed.startsWith('- ')) {
      if (paragraph.length) flush()
      list.push(trimmed.slice(2))
    } else {
      if (list.length) flush()
      paragraph.push(trimmed)
    }
  })
  flush()

  return { title: meta.title, slug: meta.slug, content: doc(...nodes) }
}
