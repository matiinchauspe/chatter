import { useState, useEffect } from 'react'
import { useParams } from 'wouter'
import useSound from 'use-sound'

import receive from '@/assets/receive.mp3'
import send from '@/assets/send.mp3'

import { USERS, EVENTS } from '@/constants'
import { useChat, useSocket } from '@/hooks'
/* eslint-disable no-unused-vars */
import { Header } from './Header'
import { Footer } from './Footer'
import { MessagesList } from './MessagesList'

import './_chat-layout.scss'

const ChatLayout = () => {
  const [inputValue, setInputValue] = useState('')
  const [botTyping, setBotTyping] = useState(false)

  const socket = useSocket()

  const params = useParams()
  const senderUserId = params.userId

  const [playSend] = useSound(send)
  const [playReceive] = useSound(receive)

  const { setLatestMessage, chatMessages, setChatMessages, selectedUser } =
    useChat()

  useEffect(() => {
    socket.emit(EVENTS.SENDER_ROOM, senderUserId)

    socket.on(EVENTS.BOT_MESSAGE, (message) => {
      setLatestMessage(USERS.BOT, message)
      setChatMessages({ userId: USERS.BOT, message })
      setBotTyping(false)

      playReceive()
    })

    socket.on(EVENTS.USER_BOT_MESSAGE, (message) => {
      // selected user chats
      setChatMessages({ userId: USERS.ME, message })
      // update latest message
      setLatestMessage(selectedUser.userId, message)
    })

    // private messages between users
    socket.on(EVENTS.USER_PRIVATE_MESSAGE, ({ message, sender }) => {
      // selected user chats
      setChatMessages({ userId: sender, message, userIdAsKey: true })
      // update latest message
      setLatestMessage(sender, message)
    })

    socket.on(EVENTS.BOT_TYPING, () => {
      setBotTyping(true)
    })

    return () => {
      socket.off(EVENTS.BOT_MESSAGE)
      socket.off(EVENTS.BOT_TYPING)
    }
  }, [])

  const handleSendMessage = () => {
    if (!inputValue) {
      return
    }

    // This one only will act for bot
    if (selectedUser.userId === USERS.BOT) {
      socket.emit(EVENTS.USER_BOT_MESSAGE, { message: inputValue, sender: senderUserId })
    } else {
      socket.emit(EVENTS.USER_PRIVATE_MESSAGE, {
        message: inputValue,
        sender: senderUserId,
        receiver: selectedUser.userId
      })
    }
    setInputValue('')
    // sender user chats
    setChatMessages({ userId: USERS.ME, message: inputValue })
    // update latest message
    setLatestMessage(selectedUser.userId, inputValue)

    playSend()
  }

  const handleChangeMessage = (event) => {
    setInputValue(event.target.value)
  }

  return (
    <div className='chat'>
      <Header />
      <MessagesList messages={chatMessages[selectedUser.userId] || []} botTyping={botTyping} />
      <Footer
        message={inputValue}
        sendMessage={handleSendMessage}
        onChangeMessage={handleChangeMessage}
      />
    </div>
  )
}

export default ChatLayout
