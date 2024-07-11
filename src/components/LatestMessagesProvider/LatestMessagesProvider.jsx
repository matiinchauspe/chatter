import { useState, useCallback, useMemo } from 'react'

import { userById, usersList } from '@/utils'
import { LatestMessagesProvider as LatestMessagesProv, initialMessages } from '@/contexts'

export default function LatestMessagesProvider ({ children }) {
  // latest chat messages
  const [lastMessages, setLastMessages] = useState(initialMessages)
  const handleSetLatestMessage = useCallback((userId, value) => {
    setLastMessages((prevMessages) => ({ ...prevMessages, [userId]: value }))
  }, [])

  // chat messages
  const [chatMessages, setChatMessages] = useState()
  const handleSetChatMessages = useCallback(({ userId, user }, message) => {
    setChatMessages((prevMessages) => {
      return {
        ...prevMessages,
        [userId]: {
          user,
          messages: [...prevMessages[userId].messages, message]
        }
      }
    })
  }, [])

  // selected user
  const [bot] = userById(usersList, 'bot')
  const [selectedUser, setSelectedUser] = useState(bot)

  const handleSelectUser = (userId) => {
    const [userSelected] = userById(usersList, userId)

    setSelectedUser(userSelected)
  }

  console.log(selectedUser)

  const providerValue = useMemo(() => ({
    // latest chat messages
    latestMessages: lastMessages,
    setLatestMessage: handleSetLatestMessage,
    // chat messages
    chatMessages,
    setChatMessages: handleSetChatMessages,
    // selected user
    selectedUser,
    selectUser: handleSelectUser
  }), [
    // latest chat messages
    JSON.stringify(lastMessages),
    handleSetLatestMessage,
    // chat messages
    JSON.stringify(chatMessages),
    handleSetChatMessages,
    // selected user
    selectedUser,
    handleSelectUser
  ])

  return (
    <LatestMessagesProv value={providerValue}>
      {children}
    </LatestMessagesProv>
  )
}
