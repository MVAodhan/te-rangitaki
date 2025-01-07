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
import { IUser } from '@/types'
import { Label } from '@radix-ui/react-label'
import { useAtomValue } from 'jotai'

import { RefreshCw } from 'lucide-react'
import { useRef } from 'react'

const Page = () => {
  const titleRef = useRef<HTMLInputElement | null>(null)
  const slugRef = useRef<HTMLInputElement | null>(null)
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null)

  const user = useAtomValue(userAtom) as IUser

  const editor = useEditorInit({
    editable: true,
    placeholder: 'Write something ...',
  })

  if (!user) {
    return <Message />
  }

  const getSlug = () => {
    if (titleRef.current) {
      const slug = generateSlug(titleRef.current.value)
      slugRef.current!.value = slug
    } else return
  }

  const submitPost = async () => {
    const data = {
      title: titleRef.current?.value,
      author: user.id,
      slug: slugRef.current?.value,
      excerpt: descriptionRef.current?.value,
      tree: editor?.getJSON(),
    }

    const record = await pb.collection('posts').create(data)

    console.log(record)
  }
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="pb-8 flex flex-col gap-4">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" className="rounded-xl pl-6" ref={titleRef} />
          <div className="flex gap-2 flex-col">
            <Label htmlFor="slug">Slug</Label>
            <div className="flex  w-full">
              <Input id="slug" name="slug" className="rounded-xl pl-6" ref={slugRef} />
              <Button onClick={getSlug}>
                <RefreshCw />
              </Button>
            </div>
          </div>
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
            <Button className="w-full" onClick={submitPost}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
