import { useMemo } from 'react'
import { useParams } from 'wouter'
import cx from 'classnames'

import { useLatestMessages } from '@/hooks'
import { usersWithoutCurrent, usersList } from '@/utils'

// eslint-disable-next-line no-unused-vars
import { UserProfile } from '@/components/UserProfile'

import './_user-list.scss'

// eslint-disable-next-line no-unused-vars
function User ({ icon, name, lastActive, isOnline, userId, color }) {
  const { latestMessages, selectUser, selectedUser } = useLatestMessages()

  const handleClickOnUser = () => {
    selectUser(userId)
  }

  return (
    <div
      className={cx('user-list__users__user', {
        'user-list__users__user--active': selectedUser.userId === userId
      })} role='button' onClick={handleClickOnUser}
    >
      <UserProfile icon={icon} name={name} color={color} />
      <div className='user-list__users__user__right-content'>
        <div className='user-list__users__user__title'>
          <p>{name}</p>
          <p className={cx({ 'user-list__users__user__online': isOnline })}>
            {isOnline ? 'Online' : lastActive}
          </p>
        </div>
        <p>{latestMessages[userId]}</p>
      </div>
    </div>
  )
}

export default function UserList () {
  const params = useParams()
  const currentUserId = params.userId ?? 'brandon'

  const users = useMemo(() => {
    return usersWithoutCurrent(usersList, currentUserId)
  }, [currentUserId])

  return (
    <div className='user-list'>
      <div className='user-list__header'>
        <div className='user-list__header__left'>
          <p>All Messages</p>
          <i className='fas fa-chevron-down' />
        </div>
        <i className='fas fa-cog' />
      </div>
      <div className='user-list__users'>
        {users.map(user => <User key={user.name} {...user} />)}
      </div>
    </div>
  )
}
