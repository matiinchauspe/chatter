/* eslint-disable no-unused-vars */
import { ChatLayout } from '@/layouts'
import { SocketProvider, ChatProvider } from '@/components/_providers'
import { ContactPanel } from '@/components/ContactPanel'
import { UserList } from '@/components/UserList'
import { IconBackground } from './IconBackground'

import './_core-layout.scss'

const CoreLayout = () => (
  <div className='core'>
    <SocketProvider>
      <IconBackground />
      <ChatProvider>
        <UserList />
        <ChatLayout />
        <ContactPanel />
      </ChatProvider>
    </SocketProvider>
  </div>
)

export default CoreLayout
