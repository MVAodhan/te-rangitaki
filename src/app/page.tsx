'use client'

import { userAtom } from '@/jotai'
import { pb } from '@/my-lib/pocketbase'
import { IUser } from '@/types'

import { useAtomValue, useSetAtom } from 'jotai'
import React, { useEffect } from 'react'

const Page = () => {
  const user = useAtomValue(userAtom) as IUser
  const setUser = useSetAtom(userAtom)

  useEffect(() => {
    if (user) return
    if (!user && pb.authStore.isValid) {
      setUser(pb.authStore.record)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-1 italic text-opacity-90">Te Rangitaki</h1>
        <span className="text-2xl italic opacity-55">The Blog</span>
        <p className="text-gray-600 mt-6">A community blogging Platform</p>
      </header>
    </div>
  )
}

export default Page
