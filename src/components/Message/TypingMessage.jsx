import { useEffect, useState } from 'react'

import './_message.scss'

const Typing = () => {
  const [numberOfDots, setDots] = useState(1)

  const incrementDots = () => {
    setDots(numberOfDots === 3 ? 1 : numberOfDots + 1)
  }

  useEffect(() => {
    const timeout = setTimeout(incrementDots, 500)

    return () => {
      clearTimeout(timeout)
    }
  }, [numberOfDots])

  return (
    <p
      className='message message--typing'
      key='typing'
    >
      {`Typing${''.padStart(numberOfDots, '.')}`}
    </p>
  )
}

export default Typing
