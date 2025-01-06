import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { pb } from '@/my-lib/pocketbase'
import { useRef } from 'react'
import { RecordModel } from 'pocketbase'

const BlogComments = ({
  comments,
  userId,
  postId,
  setComments,
}: {
  comments: RecordModel[]
  userId: string
  postId: string
  setComments: (comments: RecordModel[]) => void
}) => {
  const createComment = async () => {
    try {
      const data = {
        comment: commentRef.current?.value,
        user: userId,
        post: postId,
      }

      const newComment = await pb.collection('comments').create(data)
      const author = await pb.collection('user').getFirstListItem(`id="${newComment.user}"`)
      newComment.author = author.name
      setComments([newComment, ...comments])
      commentRef.current!.value = ''
    } catch (e) {
      // 400s instead of 403 because of API rule, but works as intended, so we ball
      console.log(e)
    }
  }
  function removeCommentById(comments: RecordModel[], idToRemove: string): RecordModel[] {
    return comments.filter((comment) => comment.id !== idToRemove)
  }

  const deleteComment = async (id: string) => {
    try {
      const deleted = await pb.collection('comments').delete(id)

      if (deleted) {
        setComments(removeCommentById(comments, id))
      }
    } catch (e) {
      // 404s instead of 403 because of API rule, but works as intended, so we ball

      console.log(e)
    }
  }

  const commentRef = useRef<HTMLTextAreaElement | null>(null)
  return (
    <div className="w-full ">
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            <Textarea
              placeholder="Share your thoughts..."
              className="min-h-[100px]"
              ref={commentRef}
            />
            <div className="flex justify-end gap-2">
              <Button onClick={createComment}>Post Comment</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full  flex items-center justify-center">J</div>
                  <div>
                    <p className="font-medium">{comment.author}</p>
                    {/* <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      comment.timestamp
                      </div> */}
                  </div>
                </div>
                {/* <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" />
                  {comment.likes}
                  </Button> */}
              </div>
              <p className="mt-4">{comment.comment}</p>
              {comment.user === userId && (
                <div className="flex justify-end gap-2">
                  <Button className="bg-red-500" onClick={() => deleteComment(comment.id)}>
                    Delete Post
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default BlogComments
