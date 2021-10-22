import React from 'react'

import Game from './components/Game'

const Play = (): JSX.Element => {
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
      <span>Frog Golf</span>
      <Game />
      <div>
        <button>{'<'}</button>
        <button>{'>'}</button>
        <button>{'SPACE'}</button>
      </div>
    </div>
  )
}

export default Play
