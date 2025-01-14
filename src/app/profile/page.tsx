'use client'

import { User, Lock, Pencil } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import { useAtomValue, useSetAtom } from 'jotai'
import { userAtom } from '@/store'
import { IUser } from '@/types'
import { useEffect, useState } from 'react'
import { pb } from '@/my-lib/pocketbase'

import Message from '@/components/message'
import { RecordModel } from 'pocketbase'
import Link from 'next/link'

const ProfilePage = () => {
  // This would typically come from your auth/user context
  const user = useAtomValue(userAtom) as IUser
  const setUser = useSetAtom(userAtom)
  const [posts, setPosts] = useState<RecordModel[] | null>(null)

  const profile = {
    name: 'Sarah Johnson',
    username: '@sarahjohnson',
    avatar: '/api/placeholder/150/150',
    bio: 'Tech blogger | Software Engineer | Coffee enthusiast. Writing about web development, React, and the future of technology.',
    location: 'San Francisco, CA',
    email: 'sarah@example.com',
    website: 'blog.sarahjohnson.dev',
    joinDate: 'January 2024',
    stats: {
      posts: 142,
      followers: 1205,
      following: 891,
    },
  }

  const getPosts = async () => {
    const posts = await pb.collection('posts').getFullList({
      filter: `author = "${user.id}"`,
    })
    setPosts(posts)
  }

  useEffect(() => {
    if (user) return
    if (!user && pb.authStore.isValid) {
      setUser(pb.authStore.record)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!user) return
    getPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  if (!user) {
    return <Message message="Log in to view you profile" />
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Profile Header */}

      <Card className="py-6 dark:bg-dark-500">
        <CardContent>
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <div className="flex flex-col gap-2">
                <div>
                  <h1 className="text-2xl font-bold">{user?.name}</h1>
                  <p className="">{profile.username}</p>
                  <div className="flex items-center pt-2">
                    <User className="w-4 h-4 mr-2 " />
                    <span>Joined {user?.created.split(' ')[0]}</span>
                  </div>
                </div>
                <p className=" ">{profile.bio}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="dark:bg-dark-500">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <Lock className="w-4 h-4" />
            <span className="text-lg font-semibold">Password Settings</span>
          </div>
          <Button variant="outline" size="sm">
            Change Password
          </Button>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
      <div className=" border-red-500 flex flex-col items-center gap-4 w-full">
        <h3>My posts</h3>
        {posts &&
          posts.map((post) => (
            <Card className="dark:bg-dark-500 w-full" key={post.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <h4>{post.title}</h4>
              </CardHeader>
              <CardContent>
                <Link href={`/edit/${post?.slug}`}>
                  <Button className="h-8">
                    <Pencil />
                    <span>Edit</span>
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )
}

export default ProfilePage
