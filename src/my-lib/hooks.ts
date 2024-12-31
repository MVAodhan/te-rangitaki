import Bold from '@tiptap/extension-bold'
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import Placeholder from '@tiptap/extension-placeholder'
import Text from '@tiptap/extension-text'
import { useEditor } from '@tiptap/react'
export function generateSlug(text: string): string {
  return (
    text
      // Convert to lowercase
      .toLowerCase()
      // Normalize unicode characters (handle accents/diacritics)
      .normalize('NFD')
      // Remove diacritical marks
      .replace(/[\u0300-\u036f]/g, '')
      // Replace spaces and underscores with hyphens
      .replace(/[\s_]+/g, '-')
      // Remove all non-word chars (except hyphens)
      .replace(/[^\w\-]+/g, '')
      // Replace multiple hyphens with single hyphen
      .replace(/\-\-+/g, '-')
      // Remove leading/trailing hyphens
      .replace(/^-+|-+$/g, '')
  )
}

export function useEditorInit({
  tree,
  editable,
  placeholder,
}: {
  tree?: { content: [] }
  editable: boolean
  placeholder?: string
}) {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Heading.configure({
        levels: [2, 3],
      }),
      Placeholder.configure({
        placeholder: placeholder,
      }),
    ],
    editable: editable,
    content: tree,
  })

  return editor
}
