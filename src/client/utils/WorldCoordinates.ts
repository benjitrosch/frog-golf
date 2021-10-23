import { GAME_HEIGHT } from '../game/Constants'
import Vector2 from '../game/entity/components/Vector2'

export const invertedYCoord = (y, levelIndex = 0, size = 0): number => {
  return GAME_HEIGHT - size - y + levelIndex * GAME_HEIGHT
}

export const heightToLevel = (y): number => {
  return Math.trunc(y / GAME_HEIGHT)
}

export const getMousePos = (canvas: HTMLCanvasElement, e): Vector2 => {
  const rect = canvas.getBoundingClientRect()
  return new Vector2(e.clientX - rect.left, e.clientY - rect.top)
}
