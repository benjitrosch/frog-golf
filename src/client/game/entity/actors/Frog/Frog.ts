import Actor, { Direction } from '../Actor'

import RenderContext2D from '../../../system/RenderContext2D'
import Time from '../../../system/Time'
import StateSprite from '../../StateSprite'
import SoundFX from '../../SoundFX'
import Map from '../../../world/Map'

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

    this.level = Map.Instance.levels[0]
    this.levelMax = 0
  }

  Load() {
    // Frog Sprites
    const idleLeft = new StateSprite(
      FrogState.IDLE,
      Direction.LEFT,
      'frog/sprites/idle_LEFT.png'
    )
    const idleRight = new StateSprite(
      FrogState.IDLE,
      Direction.RIGHT,
      'frog/sprites/idle_RIGHT.png'
    )

    const crouchLeft = new StateSprite(
      FrogState.CROUCH,
      Direction.LEFT,
      'frog/sprites/crouch_LEFT.png'
    )
    const crouchRight = new StateSprite(
      FrogState.CROUCH,
      Direction.RIGHT,
      'frog/sprites/crouch_RIGHT.png'
    )

    const jumpLeft = new StateSprite(
      FrogState.JUMP,
      Direction.LEFT,
      'frog/sprites/jump_LEFT.png'
    )
    const jumpRight = new StateSprite(
      FrogState.JUMP,
      Direction.RIGHT,
      'frog/sprites/jump_RIGHT.png'
    )

    const fallLeft = new StateSprite(
      FrogState.FALL,
      Direction.LEFT,
      'frog/sprites/fall_LEFT.png'
    )
    const fallRight = new StateSprite(
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

    this.levelMax = Math.max(this.levelIndex, this.levelMax)
  }

  Draw(render2D: RenderContext2D) {
    const { graphics } = render2D

    const sprite = this.getDrawImage()

    // Only draw if HTMLImageElement has successfully loaded
    if (sprite.loaded) {
      graphics.drawImage(
        sprite.image,
        this.x,
        invertedYCoord(this.y, this.levelIndex, this.size),
        this.size,
        this.size
      )
    }

    // render2D.text('test', this.x, this.y, this.levelIndex)
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

  collideToWall(s, r) {
    super.collideToWall(s, r, () => {
      this.soundFX.bounce.play()
    })
  }
}
