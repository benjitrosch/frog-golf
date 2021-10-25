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
  public get levelIndex() {
    return this.level.index
  }

  public rows: number
  public columns: number

  public tiles: Tile[]

  private lastMouseButton: MouseButton
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
        tiles.push(new Tile(this, x, y))
      }
    }
    this.tiles = tiles

    this.lastMousePos = new Vector2(0, 0)

    document.addEventListener('mousedown', (e) => {
      this.mouseDown = true
      this.lastMouseButton = e.button

      this.selectTile()
    })
    document.addEventListener('mousemove', () => {
      if (this.mouseDown) {
        this.selectTile()
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

    this.tiles.forEach((tile) => {
      tile.Draw(render2D)
    })
  }

  checkBlock(pos: Vector2) {
    return this.level.checkBlock(pos)
  }

  getTile(pos: Vector2): Tile | null {
    return this.tiles.find((tile) => tile.x === pos.x && tile.y === pos.y)
  }

  selectTile() {
    if (
      Debug.Instance.enabled &&
      PlayableFrog.Instance.levelIndex === this.level.index
    ) {
      switch (this.lastMouseButton) {
        case MouseButton.LEFT: {
          if (this.level.checkBlock(this.lastMousePosWorld)) {
            return
          }

          const newblock = this.level.addBlock(
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

          this.getTile(this.lastMousePos)?.setBlock(newblock)
          break
        }

        case MouseButton.RIGHT:
          this.level.removeBlock(this.lastMousePosWorld)
          this.getTile(this.lastMousePos).removeBlock()
          break
      }
    }
  }
}

// type GridCoordinate = {
//   // x coordinate
//   [key: string]: {
//     // y coordinate
//     [key: string]: Tile
//   }[]
// }

// const tiles: GridCoordinate[] = []

// for (let y = 0; y < this.rows; y++) {
//   const yCoord = {
//     [`${y}`]: [],
//   }

//   console.log(yCoord)

//   for (let x = 0; x < this.columns; x++) {
//     // tiles.push(new Tile(this, x, y))
//     yCoord[`${y}`].push({
//       [`${x}`]: new Tile(this, x, y),
//     })
//   }

//   tiles.push(yCoord)
// }
// this.tiles = tiles
