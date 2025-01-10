'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { userAtom } from '@/jotai'
import { pb } from '@/my-lib/pocketbase'
import { IUser } from '@/types'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect, useRef, useState } from 'react'

const Page = () => {
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null)

  const user = useAtomValue(userAtom) as IUser
  const setUser = useSetAtom(userAtom)

  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    if (user) return
    if (!user && pb.authStore.isValid) {
      setUser(pb.authStore.record)
    }
  }, [])

  const handleSubmit = async () => {
    if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
      setMessage('Passwords do not match.')
      return
    }

    try {
      const res = await fetch(`/api/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: user.id,
          password: passwordRef.current?.value,
          confirmPassword: confirmPasswordRef.current?.value,
        }),
      })

      const data = await res.json()

      console.log(data)

      if (res.ok) {
        setMessage('Password reset successfully. You can now log in.')
        pb.authStore.clear()
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.status === 400) {
        setMessage('Invalid or expired token. Please request a new reset link.')
      } else {
        setMessage('Failed to reset password. Please try again.')
      }
      console.log(error)
    }
  }
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl bold">Reset Password</h1>

      <Card className="dark:bg-dark-500 ">
        <CardContent className="flex flex-col gap-4 py-4">
          <Input type="password" placeholder="New Password" ref={passwordRef} required />
          <Input
            type="password"
            placeholder="Confirm New Password"
            ref={confirmPasswordRef}
            required
          />
          {message && <p className="text-red-500 bold italic">{message}</p>}
        </CardContent>
      </Card>

      <Button onClick={handleSubmit}>Reset Password</Button>
    </div>
  )
}

export default Page
