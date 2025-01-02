import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { MessageCircle, Clock } from 'lucide-react'
import { RecordModel } from 'pocketbase'

const BlogComments = ({ comments }: { comments: RecordModel[] }) => {
  return (
    <div className="w-full p-4">
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            <Textarea placeholder="Share your thoughts..." className="min-h-[100px]" />
            <div className="flex justify-end">
              <Button>Post Comment</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id} className="bg-white">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    J
                  </div>
                  <div>
                    <p className="font-medium">comment.author</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      comment.timestamp
                    </div>
                  </div>
                </div>
                {/* <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" />
                  {comment.likes}
                </Button> */}
              </div>
              <p className="mt-4 text-gray-700">{comment.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 text-gray-500">
        <MessageCircle className="w-5 h-5" />
        <span>{comments.length} Comments</span>
      </div>
    </div>
  )
}

export default BlogComments
