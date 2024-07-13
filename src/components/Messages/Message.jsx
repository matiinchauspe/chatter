import cx from 'classnames'

import { USERS } from '@/constants'

const Message = ({ nextMessage, message, botTyping }) => (
  <p
    className={cx(
      'messages__message',
      'animate__animated animate__rubberBand',
      {
        'messages__message--me': message.user === USERS.ME,
        'messages__message--last': (!nextMessage && (!botTyping || message.user === USERS.ME)) ||
          (nextMessage && nextMessage.user !== message.user)
      }
    )}
    key={message.id}
  >
    {message.content}
  </p>
)

export default Message
