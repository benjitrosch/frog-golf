import RenderContext2D from '../system/RenderContext2D'
import Debug from '../system/Debug'

import { GAME_HEIGHT, GAME_UNIT_SIZE, GAME_WIDTH } from '../Constants'
import Tile from './Tile'
import Color from '../../utils/Color'

export default class Grid {
  public rows: number
  public columns: number

  public tiles: Tile[]

  constructor() {
    this.rows = GAME_HEIGHT / GAME_UNIT_SIZE
    this.columns = GAME_WIDTH / GAME_UNIT_SIZE

    const tiles = []
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.columns; x++) {
        tiles.push(new Tile(x, y))
      }
    }
    this.tiles = tiles
  }

  Draw(render2D: RenderContext2D) {
    if (Debug.Instance.enabled) {
      if (render2D.canvas.mousePos != null) {
        const x = Math.floor(render2D.canvas.mousePos.x / GAME_UNIT_SIZE)
        const y = Math.floor(
          (GAME_HEIGHT - render2D.canvas.mousePos.y) / GAME_UNIT_SIZE
        )

        this.tiles.forEach((tile) => {
          // tile.Draw(render2D)

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
}
