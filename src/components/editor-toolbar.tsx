'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Type, Bold, Image, ImagePlay, SquarePlay, Link, Unlink, Code } from 'lucide-react'

import { Editor } from '@tiptap/react'
import ImagePopover from './editor-toolbar-image-popover'
import { useCallback } from 'react'
const EditorToolbar = ({ editor }: { editor: Editor }) => {
  const addFunction = (src: string) => {
    editor?.commands.setImage({
      src: src,
    })
  }
  const addVideo = (src: string) => {
    editor.commands.setYoutubeVideo({
      src,
    })
  }

  const replaceImage = (src: string) => {
    editor?.commands.updateAttributes('image', {
      src: src,
    })
  }

  const setLink = useCallback(
    (src: string) => {
      // update link
      editor.commands.toggleLink({ href: src })
    },
    [editor],
  )

  if (!editor) {
    return null
  }

  return (
    <div className="border border-input dark:bg-dark-500 p-1 rounded-lg flex items-center gap-1 editor-toolbar">
      {/* Text formatting */}
      <Button
        variant="ghost"
        size="icon"
        className={`h-8 w-8 ${editor?.isActive('bold') ? 'is-active' : ''}`}
        aria-label="Bold"
        onClick={() => editor?.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Separator orientation="vertical" className="mx-1 h-6" />
      {/* Headings */}
      <Button
        variant="ghost"
        size="icon"
        className={`h-8 w-8 ${editor?.isActive('heading', { level: 2 }) ? 'is-active' : ''} `}
        aria-label="Heading 2"
        onClick={() => editor.commands.toggleHeading({ level: 2 })}
      >
        <Type className="h-4 w-4" />
        <span className="text-xs">2</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={`h-8 w-8 ${editor?.isActive('heading', { level: 3 }) ? 'is-active' : ''} `}
        aria-label="Heading 3"
        onClick={() => editor.commands.toggleHeading({ level: 3 })}
      >
        <Type className="h-4 w-4" />
        <span className="text-xs">3</span>
      </Button>

      <Separator orientation="vertical" className="mx-1 h-6" />

      <ImagePopover
        // eslint-disable-next-line jsx-a11y/alt-text
        icon2={<Image className="w-5 h-5" />}
        title="Add Image"
        imageFunction={addFunction}
      />
      <ImagePopover
        icon2={<SquarePlay className="w-5 h-5" />}
        title="Add Video"
        imageFunction={addVideo}
      />

      <ImagePopover
        icon2={<ImagePlay className="w-5 h-5" />}
        title="Replace Image"
        imageFunction={replaceImage}
      />

      <Separator orientation="vertical" className="mx-1 h-6" />
      <ImagePopover icon2={<Link className="w-5 h-5" />} title="Set Link" imageFunction={setLink} />
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => editor.commands.unsetLink()}
      >
        <Unlink />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        <Code />
      </Button>
    </div>
  )
}

export default EditorToolbar
