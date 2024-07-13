// standard errors due unused vars 🤔
// eslint-disable-next-line no-unused-vars
import { Router, Route, Redirect } from 'wouter'

import { CoreLayout } from '@/layouts'
import { usersWithoutCurrent, randomUserId, usersList } from '@/utils'

const App = () => (
  <Router>
    <Route path='/'>
      <Redirect to={`/${randomUserId(usersWithoutCurrent(usersList, 'bot'))}`} />
    </Route>
    <Route path='/:userId' component={CoreLayout} />
  </Router>
)

export default App
