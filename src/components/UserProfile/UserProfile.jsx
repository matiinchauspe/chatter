import { getInitials } from '@/utils'

import './_user-profile.scss'

export default function UserProfile ({ color, name, icon }) {
  return (
    <div className='user-profile' style={{ background: color }}>
      {icon ? <i className={icon} /> : <p>{getInitials(name)}</p>}
    </div>
  )
}
