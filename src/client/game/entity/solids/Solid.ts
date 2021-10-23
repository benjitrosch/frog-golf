import Entity from '../Entity'

import AABB from '../components/AABB'

export default abstract class Solid extends Entity {
  aabb: AABB

  constructor(level, aabb) {
    super()

    this.level = level
    this.aabb = aabb
  }
}
