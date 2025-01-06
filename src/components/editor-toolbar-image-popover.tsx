'use client'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ReactElement, useRef } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'

const ImagePopover = ({
  icon,
  icon2,
  title,
  imageFunction,
}: {
  icon?: ReactElement
  icon2: ReactElement
  title: string
  imageFunction?: (src: string) => void
}) => {
  const urlRef = useRef<HTMLInputElement | null>(null)
  return (
    <div className="flex h-8 py-0">
      <Popover>
        <PopoverTrigger>
          <div className="flex h-8 py-0 items-center opacity-65  hover:bg-slate-300 rounded-md">
            {icon}
            {icon2 && icon2}
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <Card className="border-none">
            <CardHeader>
              <h3 className="bold">{title}</h3>
            </CardHeader>
            <CardContent>
              <div>
                <Label>Image Url</Label>
                <Input ref={urlRef} />
              </div>
            </CardContent>
            {imageFunction && (
              <CardFooter>
                <Button onClick={() => imageFunction(urlRef.current?.value as string)}>
                  {title}
                </Button>
              </CardFooter>
            )}
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default ImagePopover
