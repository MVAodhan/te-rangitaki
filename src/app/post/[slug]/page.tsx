'use client'

import BlogPost from '@/components/blog-post'
import BlogPostSkeleton from '@/components/blog-post-skelly'
import Message from '@/components/message'
import { pb } from '@/my-lib/pocketbase'
import { Post } from '@/types'
import { RecordModel } from 'pocketbase'
import { useEffect, useState } from 'react'

const Page = ({ params }: { params: Promise<{ slug: string }> }) => {
  const [post, setPost] = useState<Post | null>(null)
  const [authorName, setAuthorName] = useState('')
  const [posts, setPosts] = useState<RecordModel[] | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const getSlug = async () => {
    const slug = (await params).slug

    try {
      const post = (await pb.collection('posts').getFirstListItem(`slug="${slug}"`)) as Post

      setPost(post)
      const author = await pb.collection('user').getFirstListItem(`id="${post.author}"`)
      setAuthorName(author.name)
    } catch (e) {
      setMessage('Error: Most likely the slug is incorrect. Please check and try again')
      console.log('Error', e)
    }

    const posts = (await pb.collection('posts').getFullList()) as Post[]

    setPosts(posts)
  }

  useEffect(() => {
    getSlug()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (message) {
    return <Message message={message} />
  }

  return (
    <div>
      {posts && post && authorName ? (
        <BlogPost posts={posts} post={post} authorName={authorName} />
      ) : (
        <BlogPostSkeleton />
      )}
    </div>
  )
}

export default Page
