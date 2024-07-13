import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { useParams } from 'wouter'
import { io } from 'socket.io-client'
import useSound from 'use-sound'

import receive from '@/assets/receive.mp3'
import send from '@/assets/send.mp3'

import { USERS, EVENTS } from '@/constants'
import { useLatestMessages } from '@/hooks'
/* eslint-disable no-unused-vars */
import TypingMessage from './TypingMessage'
import Header from './Header'
import Footer from './Footer'
import Message from './Message'

import './_messages.scss'

// const socket = io(
//   config.BOT_SERVER_ENDPOINT,
//   { transports: ['websocket', 'polling', 'flashsocket'] }
// );
const socket = io('/', {
  transports: ['websocket', 'polling', 'flashsocket']
})

const Messages = () => {
  const [inputValue, setInputValue] = useState('')
  const [botTyping, setBotTyping] = useState(false)

  // chat ref
  const chatRef = useRef(null)

  const params = useParams()
  const senderUserId = params.userId

  const [playSend] = useSound(send)
  const [playReceive] = useSound(receive)

  const { setLatestMessage, chatMessages, setChatMessages, selectedUser } =
    useLatestMessages()

  useEffect(() => {
    socket.emit(EVENTS.SENDER_ROOM, senderUserId)

    socket.on(EVENTS.BOT_MESSAGE, (message) => {
      setLatestMessage(USERS.BOT, message)
      // selected user chats
      setChatMessages({ userId: USERS.BOT, message })
      // bot typing state
      setBotTyping(false)

      playReceive()
    })

    socket.on(EVENTS.USER_MESSAGE, (message) => {
      setLatestMessage(selectedUser.userId, message)
      // selected user chats
      setChatMessages({ userId: USERS.ME, message })
    })

    // private messages between users
    socket.on('receive-user-private-message', ({ message, sender }) => {
      // setLatestMessage(sender, message)
      // selected user chats
      setChatMessages({ userId: sender, message, userIdAsKey: true })
    })

    socket.on(EVENTS.BOT_TYPING, () => {
      setBotTyping(true)
    })

    return () => {
      socket.off(EVENTS.BOT_MESSAGE)
      socket.off(EVENTS.BOT_TYPING)
    }
  }, [])

  useLayoutEffect(() => {
    const chatList = chatRef.current
    if (chatList) {
      chatList.scrollTo({
        top: chatList.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [chatMessages[selectedUser.userId].length])

  const handleSendMessage = () => {
    if (!inputValue) {
      return
    }

    // This one only will act for bot
    if (selectedUser.userId === USERS.BOT) {
      socket.emit(EVENTS.USER_MESSAGE, { message: inputValue, sender: senderUserId })
    } else {
      socket.emit('user-private-message', {
        message: inputValue,
        sender: senderUserId,
        receiver: selectedUser.userId
      })
    }

    setInputValue('')
    // sender user chats
    setChatMessages({ userId: USERS.ME, message: inputValue })

    playSend()
  }

  const handleChangeMessage = (event) => {
    setInputValue(event.target.value)
  }

  return (
    <div className='messages'>
      <Header />
      <div className='messages__list' id='message-list' ref={chatRef}>
        {(chatMessages[selectedUser.userId] || []).map((message, index) => (
          <Message
            key={message.id}
            message={message}
            nextMessage={Boolean(chatMessages[index + 1])}
            botTyping={botTyping}
          />
        ))}
        {botTyping && <TypingMessage />}
      </div>
      <Footer
        message={inputValue}
        sendMessage={handleSendMessage}
        onChangeMessage={handleChangeMessage}
      />
    </div>
  )
}

export default Messages
