import React from 'react'
import { Card, CardContent } from '@/components/ui/card'

const BlogCommentsSkeleton = () => {
  // Number of skeleton items to show
  const skeletonComments = [1, 2, 3] // Show 3 loading items

  return (
    <div className="w-fullp-4 animate-pulse">
      {/* New Comment Box Skeleton */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            <div className="h-[100px] bg-gray-200 animate-pulse rounded-md" />
            <div className="flex justify-end">
              <div className="w-28 h-9 bg-gray-200 animate-pulse rounded-md" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments List Skeleton */}
      <div className="space-y-4">
        {skeletonComments.map((item) => (
          <Card key={item} className="bg-white">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {/* Avatar Skeleton */}
                  <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />

                  <div className="space-y-2">
                    {/* Author Name Skeleton */}
                    <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
                    {/* Timestamp Skeleton */}
                    <div className="h-3 w-16 bg-gray-200 animate-pulse rounded" />
                  </div>
                </div>

                {/* Like Button Skeleton */}
                <div className="h-8 w-16 bg-gray-200 animate-pulse rounded" />
              </div>

              {/* Comment Content Skeleton */}
              <div className="mt-4 space-y-2">
                <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
                <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Comment Counter Skeleton */}
      <div className="mt-4 flex items-center gap-2">
        <div className="h-5 w-5 bg-gray-200 animate-pulse rounded" />
        <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
      </div>
    </div>
  )
}

export default BlogCommentsSkeleton
