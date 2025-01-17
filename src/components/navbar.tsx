'use client'
import { pb } from '@/my-lib/pocketbase'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { isOpenAtom, userAtom } from '@/jotai'
import { IUser } from '@/types'
import { ModeToggle } from './toggle-theme'
import UserDropdown from './user-dropdown'

const Navbar = () => {
  const [isOpen, setIsOpen] = useAtom(isOpenAtom)
  const user = useAtomValue(userAtom) as IUser
  const setUser = useSetAtom(userAtom)
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Posts', href: '/posts' },
  ]

  return (
    <nav className=" shadow-md relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex min-w-1/3 flex-grow-1">
              <span className="text-2xl font-bold  w-full flex">Te Rangitaki</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block w-1/3">
            <div className="flex justify-start">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className=" px-3 py-2 rounded-md text-sm font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {!user && (
              <a href="/login">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </a>
            )}
            {user && <UserDropdown initials={user.name[0].toUpperCase()} />}
            <ModeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden ">
            <ModeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 "
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden ">
          <div className="pb-4 absolute top-0 left-0 right-0 h-screen w-screen  bg-white dark:bg-dark-500 z-10 flex flex-col justify-between">
            <div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 shadow-md ">
                <div className="flex items-center justify-between h-16 ">
                  {/* Logo */}
                  <Link href="/">
                    <div className="flex  flex-grow-1">
                      <span className="text-2xl font-bold w-full flex">Te Rangitaki</span>
                    </div>
                  </Link>

                  {/* Mobile menu button */}
                  <div className="md:hidden ">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(!isOpen)}
                      className="inline-flex items-center justify-center p-2 "
                    >
                      {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                  </div>
                </div>
              </div>

              <div className=" mt-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className=" block px-5 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-4 space-y-2 px-3">
              {!user && (
                <a href="/login" onClick={() => setIsOpen(!isOpen)}>
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </a>
              )}
              {user && (
                <div>
                  <Button
                    className="w-full"
                    onClick={() => {
                      pb.authStore.clear()
                      setUser([])
                      setIsOpen(!isOpen)
                      window.location.reload()
                    }}
                  >
                    Sign Out
                  </Button>
                  {/* <ModeToggle /> */}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
