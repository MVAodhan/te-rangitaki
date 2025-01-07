'use client'

import { User, Lock } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import { useAtomValue, useSetAtom } from 'jotai'
import { userAtom } from '@/store'
import { IUser } from '@/types'
import { useEffect, useState } from 'react'
import { pb } from '@/my-lib/pocketbase'
import { Input } from '@/components/ui/input'

const ProfilePage = () => {
  // This would typically come from your auth/user context
  const user = useAtomValue(userAtom) as IUser
  const setUser = useSetAtom(userAtom)
  const [showPasswordSection, setShowPasswordSection] = useState(false)
  const profile = {
    name: 'Sarah Johnson',
    username: '@sarahjohnson',
    avatar: '/api/placeholder/150/150',
    bio: 'Tech blogger | Software Engineer | Coffee enthusiast. Writing about web development, React, and the future of technology.',
    location: 'San Francisco, CA',
    email: 'sarah@example.com',
    website: 'blog.sarahjohnson.dev',
    joinDate: 'January 2024',
    stats: {
      posts: 142,
      followers: 1205,
      following: 891,
    },
  }

  useEffect(() => {
    if (user) return
    if (!user && pb.authStore.isValid) {
      setUser(pb.authStore.record)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Profile Header */}

      <Card>
        <CardContent>
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <div className="flex flex-col gap-2">
                <div>
                  <h1 className="text-2xl font-bold">{user?.name}</h1>
                  <p className="">{profile.username}</p>
                  <div className="flex items-center pt-2">
                    <User className="w-4 h-4 mr-2 " />
                    <span>Joined {user?.created.split(' ')[0]}</span>
                  </div>
                </div>
                <p className=" ">{profile.bio}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Stats */}
      {/* <Card>
        <CardContent className="grid grid-cols-3 gap-4 p-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{profile.stats.posts}</div>
            <div className="text-gray-600">Posts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{profile.stats.followers}</div>
            <div className="text-gray-600">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{profile.stats.following}</div>
            <div className="text-gray-600">Following</div>
          </div>
        </CardContent>
      </Card> */}

      {/* Profile Details */}
      {/* <Card>
        <CardHeader className="text-lg font-semibold">Profile Info</CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <Mail className="w-4 h-4" />
            <span>{profile.email}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{profile.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Link2 className="w-4 h-4" />
            <a href={`https://${profile.website}`} className="text-blue-600 hover:underline">
              {profile.website}
            </a>
          </div> 
          
        </CardContent>
      </Card> */}
      <Card className="dark:bg-dark-100">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <Lock className="w-4 h-4" />
            <span className="text-lg font-semibold">Password Settings</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPasswordSection((showPasswordSection) => !showPasswordSection)}
          >
            {showPasswordSection ? 'Cancel' : 'Change Password'}
          </Button>
        </CardHeader>
        <CardContent>
          {showPasswordSection && (
            <div className="flex flex-col gap-8">
              <div className="space-y-2">
                <Input name="currentPassword" placeholder="Enter current password" />
              </div>
              <div className="space-y-2">
                <Input name="newPassword" placeholder="Enter new password" />
              </div>
              <div className="space-y-2">
                <Input name="confirmPassword" placeholder="Confirm new password" />
              </div>
              <Button type="submit" className="w-full">
                Update Password
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfilePage
