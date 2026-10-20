import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { parseMarkdownPage } from './markdown'

const page = (body: string) => `---\ntitle: Test page\nslug: test\n---\n\n${body}\n`

type Node = { type: string; tag?: string; children?: Node[]; text?: string }
const shape = (source: string) =>
  (parseMarkdownPage(source).content.root.children as unknown as Node[]).map((node) => [
    node.tag ?? node.type,
    node.children?.map((child) => child.text ?? child.children?.[0]?.text),
  ])

describe('parseMarkdownPage', () => {
  it('reads front matter, headings, joined paragraphs and lists', () => {
    const source = page(
      '## Title\n\nLast updated: today\n\n### Section\n\nOne line\ncontinued.\n\n- first\n- second',
    )

    expect(parseMarkdownPage(source)).toMatchObject({ title: 'Test page', slug: 'test' })
    expect(shape(source)).toEqual([
      ['h2', ['Title']],
      ['paragraph', ['Last updated: today']],
      ['h3', ['Section']],
      ['paragraph', ['One line continued.']],
      ['ul', ['first', 'second']],
    ])
  })

  it.each([
    ['# Big heading', 'headings'],
    ['1. numbered', 'numbered'],
    ['  - nested', 'nested'],
    ['* star list', 'lists must use'],
    ['Some **bold** text', 'bold'],
    ['See [the page](https://example.com)', 'links'],
    ['| a | b |', 'tables'],
  ])('rejects %s', (line, message) => {
    expect(() => parseMarkdownPage(page(line))).toThrow(message)
  })

  it('needs front matter with a title and slug', () => {
    expect(() => parseMarkdownPage('## No front matter')).toThrow('front matter')
  })

  it('accepts every legal page in the repo', () => {
    const dir = join(process.cwd(), 'src/legal')
    for (const file of readdirSync(dir)) {
      expect(() => parseMarkdownPage(readFileSync(join(dir, file), 'utf8'))).not.toThrow()
    }
  })
})
