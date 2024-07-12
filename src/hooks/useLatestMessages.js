import { useContext } from 'react'

import { LatestMessagesContext } from '@/contexts'

export function useLatestMessages () {
  const context = useContext(LatestMessagesContext)

  if (!context) {
    throw new Error('useLatestMessages must be used within a LatestMessagesProvider')
  }

  return context
}
