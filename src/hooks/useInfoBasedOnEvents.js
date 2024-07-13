import { useEffect, useState } from 'react'

import { usersList } from '@/utils'
import { EVENTS } from '@/constants'

// Must be used within the socket provider
export const useUpdateUsersBasedOnEvents = (socket) => {
  const [newUserList, setNewUserList] = useState(usersList)

  useEffect(() => {
    socket.on(EVENTS.USER_CONNECTED, ({ userId }) => {
      const users = usersList.map((user) => {
        if (user.userId === userId) {
          user.isOnline = true
        }
        return user
      })

      setNewUserList(users)
    })

    socket.on(EVENTS.USER_DISCONNECTED, ({ userId }) => {
      const users = usersList.map((user) => {
        if (user.userId === userId) {
          user.isOnline = false
        }
        return user
      })

      setNewUserList(users)
    })
  }, [])

  return newUserList
}
