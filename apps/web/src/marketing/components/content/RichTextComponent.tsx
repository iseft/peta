import React from 'react'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

interface RichTextComponentProps {
  content: SerializedEditorState
}

export default async function RichTextComponent({ content }: RichTextComponentProps) {
  const html = await convertLexicalToHTML({ data: content })

  return (
    <div className="bg-paper py-4 sm:py-8 dark:bg-ink">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div
            className="prose prose-lg prose-gray dark:prose-invert max-w-none wrap-anywhere prose-h1:text-4xl sm:prose-h1:text-5xl"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </div>
  )
}
