import Grid from './Grid'

import RenderContext2D, { TextAlign } from '../system/RenderContext2D'

import { GAME_HEIGHT, GAME_TILE_SIZE, GAME_UNIT_SIZE } from '../Constants'
import Color from '../../utils/color'
import Vector2 from '../entity/components/Vector2'
import Block from '../entity/solids/Block'

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

  // TODO: implement spritesheet and slicing
  private spriteSheet: unknown

  public get tileIndex() {
    let sum = 0

    if (this.above()) sum += 1
    if (this.below()) sum += 4
    if (this.left()) sum += 2
    if (this.right()) sum += 8

    return sum
  }

  constructor(grid, x, y) {
    this.grid = grid

    this.x = x
    this.y = y
  }

  Draw(render2D: RenderContext2D) {
    if (this.block != null) {
      this.block.Draw(render2D)
    }
  }

  drawTile(context, tileIndex, x, y) {
    const xStart = tileIndex * GAME_TILE_SIZE

    context.drawImage(
      this.spriteSheet,
      // source rectangle
      xStart,
      0,
      GAME_TILE_SIZE,
      GAME_TILE_SIZE,

      // destination
      x,
      y,
      GAME_TILE_SIZE,
      GAME_TILE_SIZE
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
