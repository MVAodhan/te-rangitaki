'use client'

import { Provider as JotaiProvider } from 'jotai'

export const Providers = ({ children }) => {
  return <JotaiProvider>{children}</JotaiProvider>
}
