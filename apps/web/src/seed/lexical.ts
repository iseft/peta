import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

// Minimal builders for the Lexical JSON that rich-text fields store, so seed
// content can be written as plain headings, paragraphs and lists.

type Node = Record<string, unknown>

const text = (value: string): Node => ({
  type: 'text',
  text: value,
  format: 0,
  detail: 0,
  mode: 'normal',
  style: '',
  version: 1,
})

const element = (type: string, children: Node[], extra: Node = {}): Node => ({
  type,
  children,
  direction: 'ltr',
  format: '',
  indent: 0,
  version: 1,
  ...extra,
})

export const h2 = (value: string): Node => element('heading', [text(value)], { tag: 'h2' })

export const h3 = (value: string): Node => element('heading', [text(value)], { tag: 'h3' })

export const p = (value: string): Node =>
  element('paragraph', [text(value)], { textFormat: 0, textStyle: '' })

export const ul = (...items: string[]): Node =>
  element(
    'list',
    items.map((item, index) => element('listitem', [text(item)], { value: index + 1 })),
    { listType: 'bullet', start: 1, tag: 'ul' },
  )

export const doc = (...children: Node[]): SerializedEditorState =>
  ({ root: element('root', children) }) as unknown as SerializedEditorState
