import React, { useRef } from 'react'

import Game from './components/Game'
import Color from './utils/Color'
import { slogans } from './utils/slogans'

const generateRandomSlogan = () => {
  return slogans[Math.ceil(Math.random() * slogans.length - 1)]
}

const titleStyle = {
  textShadow: `0px 2px ${Color.Black}`,
}

const Play = (): JSX.Element => {
  const slogan = useRef<string>(generateRandomSlogan())

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      {/* <span className="text-shadow text-4xl text-center" style={titleStyle}>
        FROG GOLF
      </span>
      <span
        className="text-shadow text-md text-center max-w-xs"
        style={titleStyle}
      >
        "{slogan.current}"
      </span> */}

      <Game />

      {/* <div>
        <button>{'<'}</button>
        <button>{'>'}</button>
        <button>{'SPACE'}</button>
      </div> */}
    </div>
  )
}

export default Play
