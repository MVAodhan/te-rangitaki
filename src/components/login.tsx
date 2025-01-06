'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRef } from 'react'
import { pb } from '@/my-lib/pocketbase'
import { useRouter } from 'next/navigation'
import { useSetAtom } from 'jotai'
import { userAtom } from '../jotai'

const LoginForm = () => {
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const setUser = useSetAtom(userAtom)
  const router = useRouter()

  const getUser = async () => {
    await pb
      .collection('users')
      .authWithPassword(emailRef.current!.value, passwordRef.current!.value)

    setUser(pb.authStore.record)
    router.push('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="text" ref={emailRef} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" ref={passwordRef} />
            </div>

            <Button className="w-full" onClick={getUser}>
              Sign In
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginForm
