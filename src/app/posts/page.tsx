'use client'

import { pb } from '../../my-lib/pocketbase'
import { useState, useEffect } from 'react'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import { RecordModel } from 'pocketbase'

const Page = () => {
  const [posts, setPosts] = useState<RecordModel[] | null>([])
  const getPosts = async () => {
    const posts = await pb.collection('posts').getFullList()
    setPosts(posts)
  }
  useEffect(() => {
    getPosts()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts &&
          posts.map((post) => (
            <Card
              key={post.id}
              className="flex flex-col hover:shadow-lg transition-shadow duration-200 dark:bg-dark-500"
            >
              <CardHeader>
                {/* <div className="text-sm text-gray-500 mb-2">{post.category}</div> */}
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p>{post.excerpt}</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm ">
                  {/* <span>{post.created.split(' ')[0]}</span>/ */}
                </div>
              </CardContent>
              <CardFooter className="mt-auto border-t pt-4">
                <div className="flex justify-between items-center w-full">
                  <Link
                    href={`/post/${post.slug}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Read More →
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  )
}

export default Page
