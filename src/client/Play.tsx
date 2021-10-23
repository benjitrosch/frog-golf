import React from 'react'

import Game from './components/Game'

// import { slogans } from './utils/slogans'

// const generateRandomSlogan = () => {
//   return slogans[Math.ceil(Math.random() * slogans.length - 1)]
// }

const Play = (): JSX.Element => {
  // const slogan = useRef<string>(generateRandomSlogan())

  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* <div className="absolute float-left flex flex-col top-4 left-4">
        <span className="text-shadow text-5xl" style={titleStyle}>
          FROG GOLF
        </span>
        <span className="text-shadow text-md max-w-md" style={titleStyle}>
          "{slogan.current}"
        </span>
      </div> */}

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
