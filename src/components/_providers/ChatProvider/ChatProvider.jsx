import { useState, useCallback, useMemo } from 'react'

import { USERS } from '@/constants'
import { userById, randomIncrementalId } from '@/utils'
import { useUpdateUsersBasedOnEvents, useSocket, useLastMessages } from '@/hooks'
// eslint-disable-next-line no-unused-vars
import { ChatProvider as ChatProviderContext } from '@/contexts'

const ChatProvider = ({ children }) => {
  // latest chat messages
  const [lastMessages, setLastMessages] = useLastMessages()

  const handleSetLatestMessage = useCallback((userId, value) => {
    setLastMessages((prevMessages) => ({ ...prevMessages, [userId]: value }))
  }, [])

  const socket = useSocket()
  const usersList = useUpdateUsersBasedOnEvents(socket)

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

  // selected user
  const [bot] = userById(usersList, USERS.BOT)
  const [selectedUser, setSelectedUser] = useState(() => bot)

  const handleSetChatMessages = useCallback(({ userId, message, userIdAsKey = false }) => {
    const chatMessagesKey = userIdAsKey ? userId : selectedUser.userId

    setChatMessages((prev) => ({
      ...prev,
      [chatMessagesKey]: [
        ...(prev[chatMessagesKey] ? prev[chatMessagesKey] : []),
        {
          id: randomIncrementalId(),
          user: userId,
          content: message
        }
      ]
    }))
  }, [selectedUser.userId])

  const handleSelectUser = (userId) => {
    const [userSelected] = userById(usersList, userId)

    setSelectedUser(userSelected)
    setChatMessages({
      ...chatMessages,
      [userSelected.userId]: chatMessages[userId] ?? []
    })
  }

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
    <ChatProviderContext value={providerValue}>
      {children}
    </ChatProviderContext>
  )
}

export default ChatProvider
