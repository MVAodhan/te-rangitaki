'use client'

import React from 'react'
import { NodeViewWrapper } from '@tiptap/react'

const YouTubeComponent = ({ node }) => {
  const { src } = node.attrs

  console.log(src)

  return (
    <NodeViewWrapper style={{ width: '100%' }}>
      <div
        style={{ width: '100%', overflow: 'hidden', position: 'relative', paddingBottom: '56.25%' }}
      >
        <iframe
          src={src}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </NodeViewWrapper>
  )
}

export default YouTubeComponent
