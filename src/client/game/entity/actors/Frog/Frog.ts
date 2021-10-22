import Actor, { Direction } from '../Actor'

import RenderContext2D from '../../../system/RenderContext2D'
import Time from '../../../system/Time'
import Sprite from '../../Sprite'
import SoundFX from '../../SoundFX'

import { levels } from '../../../world/Map'
import { GAME_UNIT_SIZE } from '../../../Constants'
import { invertedYCoord } from '../../../../utils/WorldCoordinates'

export enum FrogState {
  IDLE = 'idle',
  CROUCH = 'crouch',
  JUMP = 'jump',
  FALL = 'fall',
  DEFEAT = 'defeat',
}

export default class Frog extends Actor<FrogState> {
  public jumpGauge: number

  public levelMax: number
  public totalJumps: number
  public secondsPlayed: number

  constructor(x, y) {
    super(x, y, GAME_UNIT_SIZE)

    this.state = FrogState.IDLE
    this.jumpGauge = 0

    this.level = levels[0]
    this.levelMax = 0
  }

  Load() {
    // Frog Sprites
    const idleLeft = new Sprite(
      FrogState.IDLE,
      Direction.LEFT,
      'frog/sprites/idle_LEFT.png'
    )
    const idleRight = new Sprite(
      FrogState.IDLE,
      Direction.RIGHT,
      'frog/sprites/idle_RIGHT.png'
    )

    const crouchLeft = new Sprite(
      FrogState.CROUCH,
      Direction.LEFT,
      'frog/sprites/crouch_LEFT.png'
    )
    const crouchRight = new Sprite(
      FrogState.CROUCH,
      Direction.RIGHT,
      'frog/sprites/crouch_RIGHT.png'
    )

    const jumpLeft = new Sprite(
      FrogState.JUMP,
      Direction.LEFT,
      'frog/sprites/jump_LEFT.png'
    )
    const jumpRight = new Sprite(
      FrogState.JUMP,
      Direction.RIGHT,
      'frog/sprites/jump_RIGHT.png'
    )

    const fallLeft = new Sprite(
      FrogState.FALL,
      Direction.LEFT,
      'frog/sprites/fall_LEFT.png'
    )
    const fallRight = new Sprite(
      FrogState.FALL,
      Direction.RIGHT,
      'frog/sprites/fall_RIGHT.png'
    )

    // const defeatSprite = new Sprite('frog/defeat.png')

    this.spritesLeft = [idleLeft, crouchLeft, jumpLeft, fallLeft]
    this.spritesRight = [idleRight, crouchRight, jumpRight, fallRight]

    // Frog SoundFX
    this.soundFX = {
      jump: new SoundFX('jump', 'frog/sounds/jump.wav'),
      bounce: new SoundFX('bounce', 'frog/sounds/bounce.wav'),
      land: new SoundFX('land', 'frog/sounds/land.wav'),
    }
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
      invertedYCoord(this.y, this.level.index, this.size),
      this.size,
      this.size
    )
  }

  getDrawImage() {
    return (this.direction === -1 ? this.spritesLeft : this.spritesRight).find(
      (sprite) => sprite.state === this.state
    )
  }

  collideToLeft(w) {
    super.collideToLeft(w, () => {
      this.soundFX.bounce.play()
    })
  }

  collideToRight(w) {
    super.collideToRight(w, () => {
      this.soundFX.bounce.play()
    })
  }

  collideToTop(w) {
    super.collideToTop(w, () => {
      this.soundFX.bounce.play()
    })
  }

  collideToBottom(w) {
    super.collideToBottom(w, () => {
      this.setState(FrogState.IDLE)
      this.soundFX.land.play()
    })
  }
}
