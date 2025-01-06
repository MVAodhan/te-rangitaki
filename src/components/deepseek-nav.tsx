'use client'

import { Button } from './ui/button'

import { Sun, Moon } from 'lucide-react'

const DeepseekNav = () => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Title */}
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">My App</h1>

        {/* Right Side: Theme Switcher and Sign In/Out Button */}
        <div className="flex items-center space-x-4">
          {/* Theme Switcher */}
          <div className="flex items-center">
            <Sun className="h-5 w-5 text-gray-900 dark:text-white" />
            Switch
            <Moon className="h-5 w-5 text-gray-900 dark:text-white" />
          </div>

          {/* Sign In/Out Button */}
          <Button variant="outline" className="text-gray-900 dark:text-white">
            sign in
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default DeepseekNav
