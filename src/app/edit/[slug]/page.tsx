'use client'

import Message from '@/components/message'
import Tiptap from '@/components/tiptap'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { userAtom } from '@/jotai'
import { generateSlug, useEditorInit } from '@/my-lib/hooks'
import { pb } from '@/my-lib/pocketbase'
import { IUser, Post } from '@/types'
import { Label } from '@radix-ui/react-label'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect, useRef, useState } from 'react'

const Page = ({ params }: { params: Promise<{ slug: string }> }) => {
  const titleRef = useRef<HTMLInputElement | null>(null)
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null)
  const [post, setPost] = useState<Post | null>(null)

  const user = useAtomValue(userAtom) as IUser
  const setUser = useSetAtom(userAtom)

  const getPost = async () => {
    const slug = (await params).slug

    const post = (await pb.collection('posts').getFirstListItem(`slug="${slug}"`)) as Post

    setPost(post)
  }

  const editor = useEditorInit({
    editable: true,
    placeholder: 'Write something ...',
  })

  useEffect(() => {
    getPost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!post || !user) return
    if (post) {
      titleRef.current!.value = post.title
      descriptionRef.current!.value = post.excerpt
      editor?.commands.setContent(post.tree.content)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post])

  const getSlug = () => {
    if (titleRef.current) {
      const slug = generateSlug(titleRef.current.value)
      return slug
    } else return
  }

  const updatePost = async () => {
    const slug = getSlug()
    const data = {
      title: titleRef.current?.value,
      author: user.id,
      slug: slug,
      excerpt: descriptionRef.current?.value,
      tree: editor?.getJSON(),
    }

    await pb.collection('posts').update(post!.id, data)

    window.location.href = `/`
  }

  useEffect(() => {
    if (pb.authStore.isValid) {
      setUser(pb.authStore.record)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!user) {
    return <Message message="Log in to edit your own posts" />
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="w-full flex justify-center">
          <h2 className="text-5xl font-bold">Edit</h2>
        </div>
        {post && (
          <div className="pb-8 flex flex-col gap-4">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" className="rounded-xl pl-6" ref={titleRef} />

            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              className="rounded-xl pl-6"
              ref={descriptionRef}
            />
            <Card>
              <CardContent className="pt-6 dark:bg-dark-500">
                <Tiptap editor={editor!} />
              </CardContent>
            </Card>
            <div className="flex w-full">
              <Button className="w-full" onClick={() => updatePost()}>
                Update
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Page
