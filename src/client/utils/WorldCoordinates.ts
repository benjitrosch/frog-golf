import { GAME_HEIGHT } from '../game/Constants'

export const invertedYCoord = (y, levelIndex = 0, size?) => {
  return GAME_HEIGHT - size - y + levelIndex * GAME_HEIGHT
}
