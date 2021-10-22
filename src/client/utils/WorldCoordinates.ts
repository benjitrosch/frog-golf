import Map from '../game/world/Map'

import { GAME_HEIGHT } from '../game/Constants'

export const invertedYCoord = (y, levelIndex = 0, size?): number => {
  return GAME_HEIGHT - size - y + levelIndex * GAME_HEIGHT
}

export const heightToLevel = (y): number => {
  return Math.trunc(y / GAME_HEIGHT)
}
