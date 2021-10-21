import Solid from './Solid'

import AABB from '../components/AABB'

import { GAME_HEIGHT } from '../../Constants'

export default class Ground extends Solid {
  constructor(level, aabb) {
    super(level, aabb)
  }

  convert() {
    return new AABB(
      this.aabb.x,
      this.aabb.y + this.level.index * GAME_HEIGHT,
      this.aabb.width,
      this.aabb.height
    )
  }
}
