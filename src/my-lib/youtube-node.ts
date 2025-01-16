import { Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import YouTubeComponent from '../components/youtube-component' // Your custom React component

const getYouTubeVideoId = (url) => {
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
          const src = dom.getAttribute('data-youtube')
          const videoId = getYouTubeVideoId(src)
          return {
            src: videoId ? `https://www.youtube.com/embed/${videoId}` : null,
          }
        },
      },
    ]
  },

  renderHTML({ node, HTMLAttributes }) {
    return ['div', { 'data-youtube': node.attrs.src }]
  },

  addCommands() {
    return {
      setYoutubeVideo:
        (options) =>
        ({ commands }) => {
          const videoId = getYouTubeVideoId(options.src)
          console.log('set youtube command', videoId)
          if (!videoId) {
            return false // Invalid YouTube URL
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
