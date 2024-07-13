import { createContext } from 'react'

const initialState = {
  // latest chat messages
  latestMessages: {},
  setLatestMessage: (userId, value) => {},
  // chat messages
  chatMessages: {},
  setChatMessages: ({ userId, message, userIdAsKey }) => {},
  // selected user
  selectedUser: {},
  selectUser: (userId) => {}
}

export const ChatContext = createContext(initialState)

export const ChatProvider = ChatContext.Provider
