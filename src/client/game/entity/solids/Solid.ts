import Entity from '../Entity'

import AABB from '../components/AABB'
import Level from '../../world/Level'
export default abstract class Solid extends Entity {
  level: Level
  aabb: AABB

  constructor(level, aabb) {
    super()

    this.level = level
    this.aabb = aabb
  }
}
