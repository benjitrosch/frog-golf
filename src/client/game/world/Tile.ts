import RenderContext2D from '../system/RenderContext2D'

import { GAME_UNIT_SIZE } from '../Constants'
import Color from '../../utils/color'
import Vector2 from '../entity/components/Vector2'

export default class Tile {
  public x: number
  public X: number

  public y: number
  public Y: number

  constructor(x, y) {
    this.x = x
    this.X = x + GAME_UNIT_SIZE

    this.y = y
    this.Y = y + GAME_UNIT_SIZE
  }

  Draw(render2D: RenderContext2D) {
    render2D.emptyRectangle(
      this.x * GAME_UNIT_SIZE,
      this.y * GAME_UNIT_SIZE,
      GAME_UNIT_SIZE,
      GAME_UNIT_SIZE,
      2,
      Color.White
    )
  }

  contains(pos: Vector2) {
    if (
      this.x == null ||
      this.X == null ||
      this.y == null ||
      this.Y == null ||
      pos.x == null ||
      pos.y == null
    )
      return false

    const x = pos.x / GAME_UNIT_SIZE
    const y = pos.y / GAME_UNIT_SIZE

    // console.log(vector2ToString(new Vector2(x, y)))

    if (x >= this.x && x <= this.X && y >= this.y && y <= this.Y) {
      return true
    } else return false
  }
}
