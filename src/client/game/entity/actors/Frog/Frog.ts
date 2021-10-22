import Actor from '../Actor'

import RenderContext2D from '../../../system/RenderContext2D'
import Time from '../../../system/Time'

import { levels } from '../../../world/Map'
import { GAME_HEIGHT } from '../../../Constants'

export enum FrogState {
  IDLE = 'idle',
  CROUCH = 'crouch',
  JUMP = 'jump',
  FALL = 'fall',
  DEFEAT = 'defeat',
}

export default class Frog extends Actor<FrogState> {
  protected jumpGauge: number

  public levelMax: number
  public totalJumps: number
  public secondsPlayed: number

  constructor(x, y) {
    super(x, y, 32)

    this.state = FrogState.IDLE
    this.jumpGauge = 0

    this.level = levels[0]
    this.levelMax = 0
  }

  Update(time: Time) {
    super.Update(time)
  }

  Draw(render2D: RenderContext2D, time: Time) {
    const { graphics } = render2D

    graphics.drawImage(
      this.sprites[this.getDrawImage()?.filePath],
      this.x,
      GAME_HEIGHT - this.size - this.y + this.level.index * GAME_HEIGHT,
      this.size,
      this.size
    )

    graphics.beginPath()
    graphics.rect(941, GAME_HEIGHT - 779, 52, -14)
    graphics.stroke()
    render2D.drawBlock(
      this.x - 10,
      this.y + 50 - GAME_HEIGHT * this.level.index,
      Math.trunc(this.jumpGauge * 50),
      8
    )
  }

  getDrawImage() {
    return this.sprites.find(
      (sprite) =>
        sprite.filePath ===
        this.state + (this.direction === -1 ? '_LEFT' : '_RIGHT')
    )
  }
}
