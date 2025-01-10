'use client'

import { Card, CardContent } from '@/components/ui/card'

const Message = ({
  message = 'You need to be an editor to create a post',
}: {
  message?: string
}) => {
  // Sample blog post data - in practice, this would come from props or an API

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 ">
      <Card className="mb-8 dark:bg-dark-500">
        <CardContent className="pt-6">
          <p>{message}</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default Message
