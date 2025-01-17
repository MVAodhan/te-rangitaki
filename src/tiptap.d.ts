// tiptap.d.ts
import '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    youtube: {
      setYoutubeVideo: (options: Options) => ReturnType
    }
  }
}
