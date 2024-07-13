import { useChat, useSocket } from '@/hooks'

import { UserProfile } from '@/components/UserProfile' // eslint-disable-line no-unused-vars

const Header = () => {
  // const [online, toggleState] = useState(false)
  const { selectedUser } = useChat()

  const socket = useSocket() // eslint-disable-line no-unused-vars

  const isBot = selectedUser.userId === 'bot'
  const isOnline = selectedUser.isOnline

  return (
    <div className='chat__header'>
      <div className='chat__header__left-content'>
        <UserProfile
          name={selectedUser.name}
          color={selectedUser.color}
          {...(selectedUser.icon && { icon: selectedUser.icon })}
        />
        <div className='chat__header__left-content__text'>
          <h1>{selectedUser.name} {isOnline && <div className='chat__header__online-dot' />}</h1>
          {isBot && <p>Cloud, The Internet</p>}
          {!isOnline && <p>{selectedUser.lastActive}</p>}
        </div>
      </div>
      {isBot && (
        <div className='chat__header__right-content'>
          <div className='chat__header__status'>
            <i className='mdi mdi-eye-outline' />
            <p className='no-margin'>carol-beep-boop</p>
          </div>
          <div className='chat__header__status'>
            <i className='far fa-clock' />
            <p className='no-margin'>5m</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header
