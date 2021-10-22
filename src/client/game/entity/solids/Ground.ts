import Solid from './Solid'

import AABB from '../components/AABB'

import { GAME_HEIGHT } from '../../Constants'
import RenderContext2D from '../../system/RenderContext2D'
import Time from '../../system/Time'

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

  public Load() {
    throw new Error('Method not implemented.')
  }
  public Update(time: Time) {
    throw new Error('Method not implemented.')
  }
  public Draw(render2D: RenderContext2D, time: Time) {
    throw new Error('Method not implemented.')
  }
}
