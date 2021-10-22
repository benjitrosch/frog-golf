import Entity from '../Entity'

import AABB from '../components/AABB'
import Level from '../../world/Level'
import RenderContext2D from '../../system/RenderContext2D'
import Time from '../../system/Time'

export default class Solid extends Entity {
  level: Level
  aabb: AABB

  constructor(level, aabb) {
    super()

    this.level = level
    this.aabb = aabb
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
