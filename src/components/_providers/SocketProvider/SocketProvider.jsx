import { useEffect, useMemo } from 'react'
import { useParams } from 'wouter'
import { io } from 'socket.io-client'

// eslint-disable-next-line no-unused-vars
import { SocketProvider as SocketContextProvider } from '@/contexts'

const SocketProvider = ({ children }) => {
  const params = useParams()
  const userId = params.userId

  const socket = io('/', {
    auth: {
      userId
    },
    transports: ['websocket', 'polling', 'flashsocket']
  })

  useEffect(() => {
    return () => {
      socket.disconnect()
    }
  }, [])

  const socketValue = useMemo(() => socket, [socket])

  return (
    <SocketContextProvider value={socketValue}>
      {children}
    </SocketContextProvider>
  )
}

export default SocketProvider
