import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

interface BlogTextComponentProps {
  content: SerializedEditorState
}

export default async function BlogTextComponent({ content }: BlogTextComponentProps) {
  const html = await convertLexicalToHTML({ data: content })

  return (
    <div className="mt-10 max-w-2xl">
      <div
        className="prose prose-gray dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
