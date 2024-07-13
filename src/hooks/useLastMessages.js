import { useState, useEffect } from 'react'

import { MessagesService } from '@/services'

export const useLastMessages = () => {
  const [messages, setMessages] = useState([])

  const fetchMessages = async () => {
    const res = await MessagesService.allMessages()

    setMessages(res.messages ?? {})
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  return [messages, setMessages]
}
