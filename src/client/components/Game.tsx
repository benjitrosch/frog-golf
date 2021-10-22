/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from 'react'

import Time from '../game/system/Time'
import Canvas from '../game/system/Canvas'
import RenderContext2D from '../game/system/RenderContext2D'
import EntityManager from '../game/entity/EntityManager'

import PlayableFrog from '../game/entity/actors/Frog/PlayableFrog'

import { FRAMERATE, GAME_HEIGHT, GAME_WIDTH } from '../game/Constants'
import Color from '../utils/Color'

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
    // Player frog
    entityManager.AddEntity(new PlayableFrog(GAME_WIDTH / 2, 0))
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
    render2D.clearScreen()

    entityManager.Draw(render2D, time)

    render2D.text('test text!!!', GAME_WIDTH / 2, 100)
  }

  return (
    <canvas
      ref={canvasRef}
      id="cvs"
      width={320}
      height={640}
      style={{
        border: `4px solid ${Color.Shadow}`,
        background: Color.Midtone,
      }}
    />
  )
}

export default Game
