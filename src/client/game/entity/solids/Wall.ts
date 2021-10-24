import Solid from './Solid'

import RenderContext2D from '../../system/RenderContext2D'
import Debug from '../../system/Debug'
import Time from '../../system/Time'
import Vector2 from '../components/Vector2'

import Color from '../../../utils/color'
import { GAME_HEIGHT } from '../../Constants'

export default class Wall extends Solid {
  public x0: number
  public x1: number

  public y0: number
  public y1: number

  private width: number
  private height: number

  constructor(level, x0, y0, width, height) {
    super(level, null)

    this.x0 = x0
    this.y0 = y0
    this.x1 = x0 + width
    this.y1 = y0 + height
    this.width = width
    this.height = height
  }

  convert() {
    return new Wall(
      this.level,
      this.x0,
      this.y0 + this.levelIndex * GAME_HEIGHT,
      this.width,
      this.height
    )
  }

  public Load() {
    return
  }

  public Update(time: Time) {
    return
  }

  public Draw(render2D: RenderContext2D) {
    render2D.line(this.x0, this.x1, this.y0, this.y1, 8, Color.Shadow)

    if (Debug.Instance.enabled) {
      render2D.line(this.x0, this.x1, this.y0, this.y1, 8, Color.Red)
    }
  }

  checkCollideAABB(aabb, vx, vy) {
    let collide = this.checkCollide(aabb.x, aabb.y, aabb.x + vx, aabb.y + vy)
      ? new Vector2(aabb.x, aabb.y)
      : this.checkCollide(aabb.X, aabb.y, aabb.X + vx, aabb.y + vy)
      ? new Vector2(aabb.X, aabb.y)
      : this.checkCollide(aabb.x, aabb.Y, aabb.x + vx, aabb.Y + vy)
      ? new Vector2(aabb.x, aabb.Y)
      : this.checkCollide(aabb.X, aabb.Y, aabb.X + vx, aabb.Y + vy)
      ? new Vector2(aabb.X, aabb.Y)
      : undefined

    if (collide != undefined) return { collide, endPoint: false }
    else {
      collide = aabb.checkCollidePoint(this.x0, this.y0)
        ? new Vector2(this.x0, this.y0)
        : aabb.checkCollidePoint(this.x1, this.y1)
        ? new Vector2(this.x1, this.y1)
        : undefined

      return { collide, endPoint: collide ? true : false }
    }
  }

  checkCollide(ax, ay, bx, by) {
    const z0 =
      (this.x1 - this.x0) * (ay - this.y0) -
      (this.y1 - this.y0) * (ax - this.x0)
    const z1 =
      (this.x1 - this.x0) * (by - this.y1) -
      (this.y1 - this.y0) * (bx - this.x1)

    const z2 = (bx - ax) * (this.y0 - ay) - (by - ay) * (this.x0 - ax)
    const z3 = (bx - ax) * (this.y1 - by) - (by - ay) * (this.x1 - bx)

    return z0 * z1 < 0 && z2 * z3 < 0
  }

  getNormal() {
    const res = new Vector2(this.y1 - this.y0, this.x0 - this.x1)
    res.normalize()

    return res
  }
}
