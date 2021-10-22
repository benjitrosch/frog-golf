import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Game from './Game'

const App = (): JSX.Element => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Game} />
      </Switch>
    </>
  )
}

export default App
