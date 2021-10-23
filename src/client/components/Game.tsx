/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from 'react'

import Time from '../game/system/Time'
import Canvas from '../game/system/Canvas'
import RenderContext2D from '../game/system/RenderContext2D'
import EntityManager from '../game/entity/EntityManager'
import Map from '../game/world/Map'
import Debug from '../game/system/Debug'

import PlayableFrog from '../game/entity/actors/Frog/PlayableFrog'

import { FRAMERATE, GAME_WIDTH, GAME_HEIGHT } from '../game/Constants'

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
    entityManager.AddEntity(PlayableFrog.Instance)
  }

  const Run = (render2D: RenderContext2D, time: Time) => {
    time.currentTime = new Date().getTime()
    time.unscaledTime += time.currentTime - time.previousTime
    time.previousTime = time.currentTime

    while (time.unscaledTime >= FRAMERATE) {
      Update(time)
      Draw(render2D)

      time.unscaledTime -= FRAMERATE
      time.totalTime = new Date().getTime()
    }

    requestAnimationFrame(() => Run(render2D, time))
  }

  const Update = (time: Time) => {
    entityManager.Update(time)
  }

  const Draw = (render2D: RenderContext2D) => {
    render2D.clearScreen()

    if (PlayableFrog.Instance.levelIndex != null) {
      render2D.graphics.filter =
        'hue-rotate(' + 40 * PlayableFrog.Instance.levelIndex + 'deg)'
    }

    Map.Instance.Draw(render2D)
    entityManager.Draw(render2D)
    Debug.Instance.Draw(render2D)
  }

  return (
    <canvas
      ref={canvasRef}
      width={GAME_WIDTH}
      height={GAME_HEIGHT}
      className="bg-mid border-shadow border-8 rounded-2xl"
      style={{ imageRendering: 'pixelated' }}
    />
  )
}

export default Game
