export const allMessages = async () => {
  try {
    const response = await fetch('api/messages')
    const data = await response.json()
    if (response.ok) {
      return data
    }
  } catch (error) {
    console.error('error', error)
  }
}
