import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { renderInlineHtml } from './inlineHtml'

const renderHtml = (text: string) =>
  render(<p>{renderInlineHtml(text)}</p>).container.firstChild as HTMLElement

describe('renderInlineHtml', () => {
  it('turns the allowed tags into elements', () => {
    const p = renderHtml('Only <strong>verified</strong> sites,<br>paid <em>per</em> <b>pitch</b>.')

    expect(p.innerHTML).toBe(
      'Only <strong>verified</strong> sites,<br>paid <em>per</em> <strong>pitch</strong>.',
    )
  })

  it('leaves any other markup as visible text', () => {
    const p = renderHtml('<script>alert(1)</script><a href="x">link</a>')

    expect(p.querySelector('script, a')).toBeNull()
    expect(p.textContent).toBe('<script>alert(1)</script><a href="x">link</a>')
  })

  it('keeps the text of an unclosed tag', () => {
    expect(renderHtml('<strong>bold and never closed').textContent).toBe('bold and never closed')
  })
})
