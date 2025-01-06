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
    <div className="flex container mx-auto px-4 py-8 h-full items-center justify-center">
      <section className="mb-12 text-center ">
        <h1 className="text-4xl font-bold mb-1 italic text-opacity-90">Te Rangitaki</h1>
        <span className="text-2xl italic ">The Blog</span>
        <p className=" mt-6">A community blogging Platform</p>
      </section>
    </div>
  )
}

export default Page
