'use client'

import { CalendarDays, Pencil, User } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Tiptap from './tiptap'
import { useEditorInit } from '@/my-lib/hooks'
import { Button } from './ui/button'
import { useAtomValue, useSetAtom } from 'jotai'
import { userAtom } from '@/jotai'
import { IUser } from '@/types'
import { pb } from '@/my-lib/pocketbase'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import BlogComments from './blog-comments'
import BlogCommentsSkeleton from './blog-comments-skelly'
import { RecordModel } from 'pocketbase'

const BlogPost = ({
  post,
  authorName,
}: {
  post: {
    id: string
    title: string
    author: string
    created: string
    tree: { content: [] }
    slug: string
  }
  authorName: string
}) => {
  // Sample blog post data - in practice, this would come from props or an API

  const editor = useEditorInit({
    tree: post.tree,
    editable: false,
  })

  const user = useAtomValue(userAtom) as IUser
  const setUser = useSetAtom(userAtom)
  const [comments, setComments] = useState<RecordModel[] | null>(null)

  useEffect(() => {
    if (pb.authStore.isValid && !user) {
      setUser(pb.authStore.record)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(post)

  const getComments = async () => {
    const comments = await pb.collection('comments').getFullList({ filter: `post="${post.id}"` })
    // const comments = await pb.collection('comments').getFullList()
    console.log(comments)
    setComments(comments)
  }

  useEffect(() => {
    if (post) {
      getComments()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post])
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-4">{post?.title}</h1>

      {/* Meta information */}
      <div className="flex flex-wrap gap-4 text-gray-600 mb-8">
        <>
          <div className="flex items-center gap-2">
            <User size={16} />
            <span>{authorName}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays size={16} />
            <span>{post.created.split(' ')[0]}</span>
          </div>
        </>

        {/* <div className="flex items-center gap-2">
          <Clock size={16} />
          <span>{post.readTime}</span>
        </div> */}
      </div>

      {/* Tags */}
      {/* <div className="flex flex-wrap gap-2 mb-6">
        {post.tags.map((tag) => (
          <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
            {tag}
          </span>
        ))}
      </div> */}

      {/* Main content */}

      <Card className="mb-8">
        {user?.role === 'editor' && (
          <CardHeader className="flex items-end">
            <Link href={`/edit/${post?.slug}`}>
              <Button className="h-8 w-8">
                <Pencil />
              </Button>
            </Link>
          </CardHeader>
        )}
        <CardContent>
          <Tiptap editor={editor!} renderToolbar={false} />
        </CardContent>
      </Card>

      {comments ? <BlogComments comments={comments} /> : <BlogCommentsSkeleton />}
    </div>
  )
}

export default BlogPost
