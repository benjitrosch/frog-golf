import Tile from './Tile'
import Level from './Level'
import Block from '../entity/solids/Block'
import AABB from '../entity/components/AABB'

import RenderContext2D from '../system/RenderContext2D'
import Debug from '../system/Debug'

import PlayableFrog from '../entity/actors/Frog/PlayableFrog'

import { GAME_HEIGHT, GAME_UNIT_SIZE, GAME_WIDTH } from '../Constants'
import Color from '../../utils/color'
import Vector2 from '../entity/components/Vector2'
import { MouseButton } from '../../utils/input'

export default class Grid {
  private level: Level

  public rows: number
  public columns: number

  public tiles: Tile[]

  private lastMousePos: Vector2
  private get lastMousePosWorld() {
    return new Vector2(
      this.lastMousePos.x * GAME_UNIT_SIZE,
      this.lastMousePos.y * GAME_UNIT_SIZE
    )
  }
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

    this.lastMousePos = new Vector2(0, 0)

    document.addEventListener('mousedown', (e) => {
      this.mouseDown = true
      this.selectTile(e)
    })
    document.addEventListener('mousemove', (e) => {
      if (this.mouseDown) {
        this.selectTile(e)
      }
    })
    document.addEventListener('mouseup', () => {
      this.mouseDown = false
    })
  }

  Draw(render2D: RenderContext2D) {
    if (Debug.Instance.enabled) {
      if (render2D.canvas.mousePos != null) {
        const x = Math.floor(render2D.canvas.mousePos.x / GAME_UNIT_SIZE)
        const y = Math.floor(
          (GAME_HEIGHT - render2D.canvas.mousePos.y) / GAME_UNIT_SIZE
        )

        this.lastMousePos = new Vector2(x, y)

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

  selectTile(e: MouseEvent) {
    if (
      Debug.Instance.enabled &&
      PlayableFrog.Instance.levelIndex === this.level.index
    ) {
      switch (e.button) {
        case MouseButton.LEFT:
          if (this.level.checkBlock(this.lastMousePosWorld)) {
            return
          }

          this.level.addBlock(
            new Block(
              this.level,
              new AABB(
                this.lastMousePosWorld.x,
                this.lastMousePosWorld.y,
                GAME_UNIT_SIZE,
                GAME_UNIT_SIZE
              )
            )
          )
          break

        case MouseButton.RIGHT:
          this.level.removeBlock(this.level.checkBlock(this.lastMousePosWorld))
          break
      }
    }
  }
}
