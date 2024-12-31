'use client'

import { Editor, EditorContent } from '@tiptap/react'
import EditorToolbar from './editor-toolbar'

const Tiptap = ({ editor, renderToolbar = true }: { editor: Editor; renderToolbar?: boolean }) => {
  return (
    <>
      {renderToolbar && <EditorToolbar editor={editor} />}
      <EditorContent editor={editor} className="pt-6 focus-visible:border-none" />
    </>
  )
}

export default Tiptap
