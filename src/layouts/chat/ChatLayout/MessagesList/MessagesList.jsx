import { useRef, useLayoutEffect } from 'react'

/* eslint-disable no-unused-vars */
import { Message, TypingMessage } from '@/components/Message'

const MessagesList = ({ messages, botTyping }) => {
  const chatRef = useRef(null)

  useLayoutEffect(() => {
    const chatList = chatRef.current
    if (chatList) {
      chatList.scrollTo({
        top: chatList.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [messages.length])

  return (
    <div className='chat__list' id='message-list' ref={chatRef}>
      {messages.map((message, index) => (
        <Message
          key={message.id}
          message={message}
          nextMessage={Boolean(messages[index + 1])}
          botTyping={botTyping}
        />
      ))}
      {botTyping && <TypingMessage />}
    </div>
  )
}

export default MessagesList
