import { getInitials } from '@/utils'

import './_user-profile.scss'

const UserProfile = ({ color, name, icon }) => (
  <div className='user-profile' style={{ background: color }}>
    {icon ? <i className={icon} /> : <p>{getInitials(name)}</p>}
  </div>
)

export default UserProfile
