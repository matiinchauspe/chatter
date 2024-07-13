import './_icon-background.scss'

import { icons } from '@/utils'

const SPACING_PX = 125
const SPACING_MARGIN = SPACING_PX / 4

function getRandomNumber (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

function getRandomIcon () {
  return icons[getRandomNumber(0, icons.length)]
}

// eslint-disable-next-line no-unused-vars
const IconRow = ({ numberOfIcons }) => (
  <div className='icon-background__row'>
    {[...new Array(numberOfIcons)].map((n, i) => {
      const icon = getRandomIcon()

      return (
        <i
          key={i.toString()}
          aria-hidden='true'
          className={icon.name}
          style={{
            transform: icon.noRotation ? undefined : `rotate(${getRandomNumber(0, 360)}deg)`,
            fontSize: `${getRandomNumber(icon.minSize || 10, icon.maxSize)}px`,
            marginTop: `${getRandomNumber(-SPACING_MARGIN, SPACING_MARGIN)}px`,
            marginLeft: `${getRandomNumber(-SPACING_MARGIN, SPACING_MARGIN)}px`
          }}
        />
      )
    })}
  </div>
)

export default function IconBackground () {
  const { height, width } = document.body.getBoundingClientRect()
  const numberOfElsPerRow = parseInt((width / SPACING_PX).toFixed())
  const numberOfRows = parseInt((height / SPACING_PX).toFixed())

  return (
    <div className='icon-background'>
      {[...new Array(numberOfRows)].map((row, i) => (
        <IconRow key={i.toString()} numberOfIcons={numberOfElsPerRow} />
      ))}
    </div>
  )
}
