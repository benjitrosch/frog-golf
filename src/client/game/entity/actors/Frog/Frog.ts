import Actor, { Direction } from '../Actor'

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
    const idleLeft = new Sprite(
      FrogState.IDLE,
      Direction.LEFT,
      'frog/idle_LEFT.png'
    )
    const idleRight = new Sprite(
      FrogState.IDLE,
      Direction.RIGHT,
      'frog/idle_RIGHT.png'
    )

    const crouchLeft = new Sprite(
      FrogState.CROUCH,
      Direction.LEFT,
      'frog/crouch_LEFT.png'
    )
    const crouchRight = new Sprite(
      FrogState.CROUCH,
      Direction.RIGHT,
      'frog/crouch_RIGHT.png'
    )

    const jumpLeft = new Sprite(
      FrogState.JUMP,
      Direction.LEFT,
      'frog/jump_LEFT.png'
    )
    const jumpRight = new Sprite(
      FrogState.JUMP,
      Direction.RIGHT,
      'frog/jump_RIGHT.png'
    )

    const fallLeft = new Sprite(
      FrogState.FALL,
      Direction.LEFT,
      'frog/fall_LEFT.png'
    )
    const fallRight = new Sprite(
      FrogState.FALL,
      Direction.RIGHT,
      'frog/fall_RIGHT.png'
    )

    // const defeatSprite = new Sprite('frog/defeat.png')

    this.spritesLeft = [idleLeft, crouchLeft, jumpLeft, fallLeft]
    this.spritesRight = [idleRight, crouchRight, jumpRight, fallRight]
  }

  Update(time: Time) {
    super.Update(time)

    if (this.vy < 0) {
      this.setState(FrogState.FALL)
    }
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

    render2D.drawBlock(
      this.x - 10,
      this.y + 50 - GAME_HEIGHT * this.level.index,
      Math.trunc(this.jumpGauge * 50),
      4
    )
  }

  getDrawImage() {
    return (this.direction === -1 ? this.spritesLeft : this.spritesRight).find(
      (sprite) => sprite.state === this.state
    )
  }

  collideToBottom(w) {
    super.collideToBottom(w, () => this.setState(FrogState.IDLE))
  }
}
