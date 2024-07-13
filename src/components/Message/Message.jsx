import cx from 'classnames'

import { USERS } from '@/constants'

import './_message.scss'

const Message = ({ nextMessage, message, botTyping }) => (
  <p
    className={cx(
      'message',
      'animate__animated animate__rubberBand',
      {
        'message--me': message.user === USERS.ME,
        'message--last': (!nextMessage && (!botTyping || message.user === USERS.ME)) ||
          (nextMessage && nextMessage.user !== message.user)
      }
    )}
    key={message.id}
  >
    {message.content}
  </p>
)

export default Message
