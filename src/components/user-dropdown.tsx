'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'

import React from 'react'
import Link from 'next/link'
import { pb } from '@/my-lib/pocketbase'
import { useAtomValue, useSetAtom } from 'jotai'
import { userAtom } from '@/jotai'
import { IUser } from '@/types'

const UserDropdown = ({ initials }: { initials: string }) => {
  const user = useAtomValue(userAtom) as IUser
  const setUser = useSetAtom(userAtom)
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/profile">
            <DropdownMenuItem>
              <div className="flex">Profile</div>
            </DropdownMenuItem>
          </Link>
          {user && user.role === 'editor' && (
            <Link href="/new">
              <DropdownMenuItem>
                <div className="flex">New</div>
              </DropdownMenuItem>
            </Link>
          )}
          <Link href="/reset-password">
            <DropdownMenuItem>Reset Password</DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => {
              pb.authStore.clear()
              setUser([])
              window.location.href = `/`
            }}
          >
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default UserDropdown
