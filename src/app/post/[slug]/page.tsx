'use client'

import BlogPost from '@/components/blog-post'
import BlogPostSkeleton from '@/components/blog-post-skelly'
import { pb } from '@/my-lib/pocketbase'
import { Post } from '@/types'
import { useEffect, useState } from 'react'

const Page = ({ params }: { params: Promise<{ slug: string }> }) => {
  const [post, setPost] = useState<Post | null>(null)
  const [authorName, setAuthorName] = useState('')

  const getSlug = async () => {
    const slug = (await params).slug

    const post = (await pb.collection('posts').getFirstListItem(`slug="${slug}"`)) as Post

    setPost(post)

    const author = await pb.collection('user').getFirstListItem(`id="${post.author}"`)
    setAuthorName(author.name)
  }
  useEffect(() => {
    getSlug()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      {post && authorName ? <BlogPost post={post} authorName={authorName} /> : <BlogPostSkeleton />}
    </div>
  )
}

export default Page
