import Solid from './Solid'

import AABB from '../components/AABB'

import RenderContext2D from '../../system/RenderContext2D'
import Time from '../../system/Time'
import Debug from '../../system/Debug'

import Color from '../../../utils/Color'
import { GAME_HEIGHT } from '../../Constants'

export default class Block extends Solid {
  constructor(level, aabb) {
    super(level, aabb)
  }

  convert() {
    return new AABB(
      this.aabb.x,
      this.aabb.y + this.levelIndex * GAME_HEIGHT,
      this.aabb.width,
      this.aabb.height
    )
  }

  public Load() {
    return
  }

  public Update(time: Time) {
    return
  }

  public Draw(render2D: RenderContext2D) {
    render2D.rectangle(
      this.aabb.x,
      this.aabb.y,
      this.aabb.width,
      this.aabb.height,
      Color.Shadow
    )

    if (Debug.Instance.enabled) {
      render2D.drawAABB(this.aabb)
    }
  }
}
