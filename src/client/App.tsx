import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Play from './Play'

const App = (): JSX.Element => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Play} />
      </Switch>
    </>
  )
}

export default App
