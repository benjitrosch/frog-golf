import Actor from '../Actor'

import RenderContext2D from '../../../system/RenderContext2D'
import Time from '../../../system/Time'
import Sprite from '../../Sprite'

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

  Load() {
    const idleSprite = new Sprite(FrogState.IDLE, 'frog/idle.png')
    const crouchSprite = new Sprite(FrogState.CROUCH, 'frog/crouch.png')
    const jumpSprite = new Sprite(FrogState.JUMP, 'frog/jump.png')
    const fallSprite = new Sprite(FrogState.FALL, 'frog/fall.png')
    // const defeatSprite = new Sprite('frog/defeat.png')

    this.sprites = [
      idleSprite,
      crouchSprite,
      jumpSprite,
      fallSprite,
      // defeatSprite,
    ]
  }

  Update(time: Time) {
    super.Update(time)
  }

  Draw(render2D: RenderContext2D, time: Time) {
    const { graphics } = render2D

    graphics.drawImage(
      this.getDrawImage().image,
      this.x,
      GAME_HEIGHT - this.size - this.y + this.level.index * GAME_HEIGHT,
      this.size,
      this.size
    )
  }

  getDrawImage() {
    return this.sprites.find((sprite) => sprite.state === this.state)
  }
}
