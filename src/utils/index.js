/**
 * [usersWithoutCurrent gimme the users list without the current]
 * @param   {[users[]]}  users
 * @param   {[string]}  userId
 * @return  {[users[]]}
 */
export const usersWithoutCurrent = (users, userId) => {
  return users.filter(user => user.userId !== userId)
}

export const userById = (users, userId) => {
  return users.filter(user => user.userId === userId)
}

export const randomUserId = (users) => {
  return users[Math.floor(Math.random() * users.length)].userId
}

export const getInitials = (string) => {
  return string.match(/\b(\w)/g).slice(0, 2).join('').toUpperCase()
}

export const randomIncrementalId = () => {
  const d = new Date()

  return d.valueOf()
}

export * from './users'
