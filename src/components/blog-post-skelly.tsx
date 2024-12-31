import React from 'react'
import { Card, CardContent } from '@/components/ui/card'

const BlogPostSkeleton = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-pulse">
      {/* Title skeleton */}
      <div className="h-12 bg-gray-200 rounded-lg mb-4 w-3/4" />

      {/* Meta information skeleton */}
      <div className="flex flex-wrap gap-4 mb-8">
        {/* Author */}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 rounded-full" />
          <div className="w-24 h-4 bg-gray-200 rounded" />
        </div>
        {/* Date */}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 rounded-full" />
          <div className="w-32 h-4 bg-gray-200 rounded" />
        </div>
        {/* Read time */}
        {/* <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 rounded-full" />
          <div className="w-20 h-4 bg-gray-200 rounded" />
        </div> */}
      </div>

      {/* Tags skeleton */}
      <div className="flex flex-wrap gap-2 mb-6 ">
        {[1, 2].map((index) => (
          <div key={index} className="w-24 h-7 bg-gray-200 rounded-full" />
        ))}
      </div>

      {/* Main content skeleton */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Generate 3 paragraphs of varying widths */}
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-11/12" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-4/5" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default BlogPostSkeleton
