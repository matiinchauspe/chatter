import { UserProfile } from '@/components/UserProfile' // eslint-disable-line no-unused-vars
import { useLatestMessages } from '@/hooks'

export default function Header () {
  const { selectedUser } = useLatestMessages()

  const isBot = selectedUser.userId === 'bot'
  const isOnline = selectedUser.isOnline

  return (
    <div className='messages__header'>
      <div className='messages__header__left-content'>
        <UserProfile
          name={selectedUser.name}
          color={selectedUser.color}
          {...(selectedUser.icon && { icon: selectedUser.icon })}
        />
        <div className='messages__header__left-content__text'>
          <h1>{selectedUser.name} {isOnline && <div className='messages__header__online-dot' />}</h1>
          {isBot && <p>Cloud, The Internet</p>}
          {!isOnline && <p>{selectedUser.lastActive}</p>}
        </div>
      </div>
      {isBot && (
        <div className='messages__header__right-content'>
          <div className='messages__header__status'>
            <i className='mdi mdi-eye-outline' />
            <p className='no-margin'>carol-beep-boop</p>
          </div>
          <div className='messages__header__status'>
            <i className='far fa-clock' />
            <p className='no-margin'>5m</p>
          </div>
        </div>
      )}
    </div>
  )
}
