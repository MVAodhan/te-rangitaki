import { Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { RawCommands } from '@tiptap/core'
import YouTubeComponent from '../components/youtube-component'

interface Options {
  src: string
}

const getYouTubeVideoId = (url: string) => {
  const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
  const match = url.match(regex)
  return match ? match[1] : null
}

const YouTubeNode = Node.create({
  name: 'youtube',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-youtube]',
        getAttrs: (dom) => {
          const src = (dom as HTMLElement).getAttribute('data-youtube')
          const videoId = getYouTubeVideoId(src || '')
          return {
            src: videoId ? `https://www.youtube.com/embed/${videoId}` : null,
          }
        },
      },
    ]
  },

  renderHTML({ node }) {
    return ['div', { 'data-youtube': node.attrs.src }]
  },

  addCommands(): Partial<RawCommands> {
    return {
      setYoutubeVideo:
        (options: Options) =>
        ({ commands }) => {
          const videoId = getYouTubeVideoId(options.src)
          if (!videoId) {
            return false
          }
          return commands.insertContent({
            type: this.name,
            attrs: {
              src: `https://www.youtube.com/embed/${videoId}`,
            },
          })
        },
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(YouTubeComponent)
  },
})

export default YouTubeNode
