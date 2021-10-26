import Grid from './Grid'
import Block from '../entity/solids/Block'
import SpriteSheet from './SpriteSheet'

import RenderContext2D from '../system/RenderContext2D'

import {
  GAME_HEIGHT,
  GAME_UNIT_SIZE,
  GRAPHICS_SCALE_FACTOR,
} from '../Constants'
import Vector2 from '../entity/components/Vector2'
import { invertedYCoord } from '../../utils/WorldCoordinates'

export default class Tile {
  private grid: Grid

  private block: Block | null

  public x: number
  public get X() {
    return this.x + GAME_UNIT_SIZE
  }
  public get worldX() {
    return this.x * GAME_UNIT_SIZE
  }

  public y: number
  public get Y() {
    return this.y + GAME_UNIT_SIZE
  }
  public get worldY() {
    return this.y * GAME_UNIT_SIZE
  }

  private spriteSheet: SpriteSheet

  public get tileIndex() {
    // This might just be some of the ugliest math ever done
    // Say whatever you will about how easy JS/Typescipt is to pick up and learn
    // but this is the most unreadable garbage ever and the fact I'm allowed to do it
    // just feels plain wrong
    return (
      +!!this.above() * 1 +
      +!!this.left() * 2 +
      +!!this.below() * 4 +
      +!!this.right() * 8
    )
  }

  constructor(grid, x, y) {
    this.grid = grid

    this.x = x
    this.y = y

    this.spriteSheet = new SpriteSheet('world/spritesheets/bricks_SLICED.png')
  }

  Draw(render2D: RenderContext2D) {
    if (this.block != null) {
      this.block.Draw(render2D)
      this.drawTile(render2D.graphics, this.tileIndex, this.worldX, this.worldY)
    }
  }

  drawTile(graphics: CanvasRenderingContext2D, tileIndex, x, y) {
    const startX = tileIndex * (GAME_UNIT_SIZE * (GRAPHICS_SCALE_FACTOR / 2))

    graphics.drawImage(
      this.spriteSheet.image,
      // source rectangle
      startX,
      0,
      GAME_UNIT_SIZE * (GRAPHICS_SCALE_FACTOR / 2),
      GAME_UNIT_SIZE * (GRAPHICS_SCALE_FACTOR / 2),

      // destination
      x,
      invertedYCoord(y, 0, GAME_UNIT_SIZE),
      GAME_UNIT_SIZE,
      GAME_UNIT_SIZE
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

    if (x >= this.x && x <= this.X && y >= this.y && y <= this.Y) {
      return true
    } else return false
  }

  above() {
    return this.grid.checkBlock(
      new Vector2(this.worldX, this.worldY + GAME_UNIT_SIZE)
    )
  }

  below() {
    return this.grid.checkBlock(
      new Vector2(this.worldX, this.worldY - GAME_UNIT_SIZE)
    )
  }

  left() {
    return this.grid.checkBlock(
      new Vector2(this.worldX - GAME_UNIT_SIZE, this.worldY)
    )
  }

  right() {
    return this.grid.checkBlock(
      new Vector2(this.worldX + GAME_UNIT_SIZE, this.worldY)
    )
  }

  setBlock(block: Block) {
    this.block = block
  }

  removeBlock() {
    this.block = null
  }
}
