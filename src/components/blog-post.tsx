'use client'

import { CalendarDays, Pencil, User, Trash2 } from 'lucide-react'
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
import { Card, CardHeader } from './ui/card'

const BlogPost = ({
  posts,
  post,
  authorName,
}: {
  posts: RecordModel[]
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

  const getComments = async () => {
    const comments = await pb.collection('comments').getFullList({ filter: `post="${post.id}"` })
    let massagedComments: RecordModel[] = []

    for (const comment of comments) {
      const author = await pb.collection('user').getFirstListItem(`id="${comment.user}"`)
      comment.author = author.name
      massagedComments = [...massagedComments, comment]
    }

    setComments(massagedComments)
  }

  function removePostById(posts: RecordModel[], idToRemove: string): RecordModel[] {
    return posts.filter((post) => post.id !== idToRemove)
  }
  const deletePost = async () => {
    await pb.collection('posts').delete(post.id)

    removePostById(posts, post.id)

    window.location.href = `/`
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

      {user?.role === 'editor' && (
        <div className="flex justify-end mb-4 gap-2">
          <Link href={`/edit/${post?.slug}`}>
            <Button className="h-8">
              <Pencil />
              <span>Edit</span>
            </Button>
          </Link>
          <Button className="h-8 bg-red-500 text-white" onClick={deletePost}>
            <Trash2 />
            <span>Delete</span>
          </Button>
        </div>
      )}
      <div className="mb-8">
        <Card>
          <CardHeader>
            <Tiptap editor={editor!} renderToolbar={false} />
          </CardHeader>
        </Card>
      </div>

      <div className="w-full ">
        {comments && user && (
          <BlogComments
            comments={comments}
            postId={post.id}
            userId={user.id}
            setComments={setComments}
          />
        )}

        {!comments && <BlogCommentsSkeleton />}
      </div>
    </div>
  )
}

export default BlogPost
