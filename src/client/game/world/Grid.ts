import Tile from './Tile'
import Level from './Level'
import Block from '../entity/solids/Block'
import AABB from '../entity/components/AABB'

import RenderContext2D from '../system/RenderContext2D'
import Debug from '../system/Debug'

import { GAME_HEIGHT, GAME_UNIT_SIZE, GAME_WIDTH } from '../Constants'
import Color from '../../utils/Color'
import Vector2 from '../entity/components/Vector2'

export default class Grid {
  private level: Level

  public rows: number
  public columns: number

  public tiles: Tile[]

  private lastMousPos: Vector2
  private mouseDown: boolean

  constructor(level: Level) {
    this.level = level

    this.rows = GAME_HEIGHT / GAME_UNIT_SIZE
    this.columns = GAME_WIDTH / GAME_UNIT_SIZE

    const tiles = []
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.columns; x++) {
        tiles.push(new Tile(x, y))
      }
    }
    this.tiles = tiles

    this.lastMousPos = new Vector2(0, 0)

    document.addEventListener('mousedown', () => {
      this.mouseDown = true
      this.selectTile()
    })
    // TODO: implement way to handle duplicate tile coords so we don't stack hundreds of tiles upon each other per frame
    // document.addEventListener('mouseup', () => {
    //   this.mouseDown = false
    // })
    // document.addEventListener('mousemove', () => {
    //   if (this.mouseDown) {
    //     this.selectTile()
    //   }
    // })
  }

  Draw(render2D: RenderContext2D) {
    if (Debug.Instance.enabled) {
      if (render2D.canvas.mousePos != null) {
        const x = Math.floor(render2D.canvas.mousePos.x / GAME_UNIT_SIZE)
        const y = Math.floor(
          (GAME_HEIGHT - render2D.canvas.mousePos.y) / GAME_UNIT_SIZE
        )

        this.lastMousPos = new Vector2(x, y)

        this.tiles.forEach((tile) => {
          if (tile.x === x && tile.y === y) {
            render2D.rectangle(
              tile.x * GAME_UNIT_SIZE,
              tile.y * GAME_UNIT_SIZE,
              GAME_UNIT_SIZE,
              GAME_UNIT_SIZE,
              Color.White
            )
          }
        })
      }
    }
  }

  selectTile() {
    if (Debug.Instance.enabled) {
      this.level.addBlock(
        new Block(
          this.level,
          new AABB(
            this.lastMousPos.x * GAME_UNIT_SIZE,
            this.lastMousPos.y * GAME_UNIT_SIZE,
            GAME_UNIT_SIZE,
            GAME_UNIT_SIZE
          )
        )
      )
    }
  }
}
