import { createContext } from 'react'

import { initialMessages } from './constants'

const initialState = {
  // latest chat messages
  latestMessages: initialMessages,
  setLatestMessage: (userId, value) => {},
  // chat messages
  chatMessages: {},
  setChatMessages: ({ userId, message, userIdAsKey }) => {},
  // selected user
  selectedUser: {},
  selectUser: (userId) => {}
}

export const LatestMessagesContext = createContext(initialState)

export const LatestMessagesProvider = LatestMessagesContext.Provider

export { initialMessages } from './constants'
