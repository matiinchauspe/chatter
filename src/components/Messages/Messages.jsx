import { useState, useEffect } from 'react'
import { useParams } from 'wouter'
import { io } from 'socket.io-client'
import useSound from 'use-sound'

import config from '@/config'
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
const socket = io('http://localhost:4001', {
  transports: ['websocket', 'polling', 'flashsocket']
  // query: {
  //   userId,
  // }
})

const Messages = () => {
  const [inputValue, setInputValue] = useState('')
  const [botTyping, setBotTyping] = useState(false)

  const params = useParams()
  const senderUserId = params.userId

  const [playSend] = useSound(config.SEND_AUDIO_URL)
  const [playReceive] = useSound(config.RECEIVE_AUDIO_URL)

  const { setLatestMessage, chatMessages, setChatMessages, selectedUser } =
    useLatestMessages()

  useEffect(() => {
    socket.emit(EVENTS.SENDER_ROOM, senderUserId)

    socket.on(EVENTS.BOT_MESSAGE, (message) => {
      debugger // eslint-disable-line
      setLatestMessage(USERS.BOT, message)
      // selected user chats
      setChatMessages(USERS.BOT, message)
      // bot typing state
      setBotTyping(false)

      playReceive()
    })

    socket.on(EVENTS.USER_MESSAGE, (message) => {
      setLatestMessage(selectedUser.userId, message)
      // selected user chats
      setChatMessages(USERS.ME, message)

      playReceive()
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

    // this one only will act for bot
    if (selectedUser.userId === USERS.BOT) {
      socket.emit(EVENTS.USER_MESSAGE, { message: inputValue, sender: senderUserId })
    } else {
      // I need to do this for the other users
    }

    setInputValue('')
    // sender user chats
    setChatMessages(USERS.ME, inputValue)

    playSend()
  }

  const handleChangeMessage = (event) => {
    setInputValue(event.target.value)
  }

  return (
    <div className='messages'>
      <Header />
      <div className='messages__list' id='message-list'>
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
