/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from 'react'

import Time from './game/system/Time'
import Canvas from './game/system/Canvas'
import RenderContext2D from './game/system/RenderContext2D'
import EntityManager from './game/entity/EntityManager'

import { FRAMERATE } from './game/Constants'

import PlayableFrog from './game/entity/actors/Frog/PlayableFrog'

const entityManager = new EntityManager()

const Game = (): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (canvasRef.current != null) {
      const canvas = new Canvas(canvasRef.current)
      const render2D = new RenderContext2D(canvas)

      Initialize()
      Run(render2D, new Time())
    }
  }, [])

  const Initialize = () => {
    entityManager.AddEntity(new PlayableFrog(0, 0))
  }

  const Run = (render2D: RenderContext2D, time: Time) => {
    time.currentTime = new Date().getTime()
    time.unscaledTime += time.currentTime - time.previousTime
    time.previousTime = time.currentTime

    while (time.unscaledTime >= FRAMERATE) {
      Update(time)
      Draw(render2D, time)

      time.unscaledTime -= FRAMERATE
      time.totalTime = new Date().getTime()
    }

    requestAnimationFrame(() => Run(render2D, time))
  }

  const Update = (time: Time) => {
    entityManager.Update(time)
  }

  const Draw = (render2D: RenderContext2D, time: Time) => {
    entityManager.Draw(render2D, time)
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <canvas
        ref={canvasRef}
        id="cvs"
        width={320}
        height={640}
        style={{ border: '1px solid red' }}
      />
    </div>
  )
}

export default Game
