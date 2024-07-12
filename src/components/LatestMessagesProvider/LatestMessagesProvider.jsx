import { useState, useCallback, useMemo } from 'react'

import { USERS } from '@/constants'
import { userById, usersList, randomIncrementalId } from '@/utils'
// eslint-disable-next-line no-unused-vars
import { LatestMessagesProvider as LatestMessagesProv, initialMessages } from '@/contexts'

export default function LatestMessagesProvider ({ children }) {
  // latest chat messages
  const [lastMessages, setLastMessages] = useState(initialMessages)
  const handleSetLatestMessage = useCallback((userId, value) => {
    setLastMessages((prevMessages) => ({ ...prevMessages, [userId]: value }))
  }, [])

  // selected user
  const [bot] = userById(usersList, USERS.BOT)
  const [selectedUser, setSelectedUser] = useState(() => bot)

  const handleSelectUser = (userId) => {
    const [userSelected] = userById(usersList, userId)

    setSelectedUser(userSelected)
    setChatMessages({
      ...chatMessages,
      [userSelected.userId]: chatMessages[userId] ?? []
    })
  }

  // chat messages
  const initialChatMessages = useMemo(() => {
    const messages = {}
    usersList.forEach(({ userId, lastMessage }) => {
      messages[userId] = [{
        id: randomIncrementalId(),
        user: userId,
        content: lastMessage
      }]
    })

    return messages
  }, [])
  const [chatMessages, setChatMessages] = useState(initialChatMessages)
  const handleSetChatMessages = useCallback((userId, message) => {
    setChatMessages((prev) => ({
      ...prev,
      [selectedUser.userId]: [
        ...(prev[selectedUser.userId] ? prev[selectedUser.userId] : []),
        {
          id: randomIncrementalId(),
          user: userId,
          content: message
        }
      ]
    }))
  }, [selectedUser.userId])

  console.log({ chatMessages })
  console.log({ selectedUser })

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
