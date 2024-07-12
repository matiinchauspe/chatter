/* eslint-disable no-unused-vars */
import { Router, Route, Redirect } from 'wouter'

import { CoreLayout } from '@/layouts'
import { usersWithoutCurrent, randomUserId, usersList } from '@/utils'

export default function App () {
  return (
    <Router>
      <Route path='/'>
        <Redirect to={`/${randomUserId(usersWithoutCurrent(usersList, 'bot'))}`} />
      </Route>
      <Route path='/:userId' component={CoreLayout} />
    </Router>
  )
}
