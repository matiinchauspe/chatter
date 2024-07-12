import React, { useState, useEffect } from 'react'
import { useParams } from 'wouter'
import io from 'socket.io-client'
import useSound from 'use-sound'

// import LatestMessagesContext from '../../../contexts/LatestMessages/LatestMessages';

import { userById, usersList } from '@/utils'
import config from '@/config'
import { useLatestMessages } from '@/hooks'

import TypingMessage from './TypingMessage'
import Header from './Header'
import Footer from './Footer'
import Message from './Message'

import './_messages.scss'

// const socket = io(
//   config.BOT_SERVER_ENDPOINT,
//   { transports: ['websocket', 'polling', 'flashsocket'] }
// );
const socket = io('http://localhost:4001', { transports: ['websocket', 'polling', 'flashsocket'] })

function Messages () {
  const [inputValue, setInputValue] = useState('')
  const [botTyping, setBotTyping] = useState(false)

  const params = useParams()
  const currentUserId = params.userId

  const [playSend] = useSound(config.SEND_AUDIO_URL)
  const [playReceive] = useSound(config.RECEIVE_AUDIO_URL)

  const { setLatestMessage, chatMessages, setChatMessages, selectedUser } = useLatestMessages()

  useEffect(() => {
    socket.on('bot-message', (message) => {
      setLatestMessage('bot', message)
      setChatMessages(selectedUser, message)
      setChatMessages(userById(usersList, currentUserId), message)
      setBotTyping(false)

      playReceive()
    })

    socket.on('bot-typing', () => {
      setBotTyping(true)
    })

    return () => {
      socket.off('bot-message')
      socket.off('bot-typing')
    }
  })

  const handleSendMessage = (e) => {
    if (!inputValue) { return }

    socket.emit('user-message', inputValue)
    setInputValue('')

    playSend()
  }

  const handleChangeMessage = (event) => {
    setInputValue(event.target.value)
  }

  return (
    <div className='messages'>
      <Header />
      <div className='messages__list' id='message-list'>
        {(chatMessages?.messages || []).map((message, index) => (
          <Message
            key={message.id}
            message={message}
            nextMessage={chatMessages[currentUserId].messages[index + 1]}
          />
        ))}
        {botTyping && <TypingMessage />}
      </div>
      <Footer message={inputValue} sendMessage={handleSendMessage} onChangeMessage={handleChangeMessage} />
    </div>
  )
}

export default Messages
