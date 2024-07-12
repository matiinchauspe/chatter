import { LatestMessagesProvider } from '@/components/LatestMessagesProvider'
import { ContactPanel } from '@/components/ContactPanel'
import UserList from '@/components/UserList'
import { Messages } from '@/components/Messages'
import { IconBackground } from '../IconBackground'

import './_core-layout.scss'

export default function CoreLayout () {
  return (
    <div className='core'>
      <IconBackground />
      <LatestMessagesProvider>
        <UserList />
        <Messages />
        <ContactPanel />
      </LatestMessagesProvider>
    </div>
  )
}
