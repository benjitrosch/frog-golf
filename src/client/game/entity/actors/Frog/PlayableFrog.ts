import Frog, { FrogState } from './Frog'
import IPlayable, { ArrowKey } from '../IPlayable'

import RenderContext2D from '../../../system/RenderContext2D'
import Time from '../../../system/Time'
import Debug from '../../../system/Debug'

import {
  GAME_HEIGHT,
  GAME_WIDTH,
  JUMP_CHARGE_SPEED,
  JUMP_HEIGHT,
  SIDE_JUMP_HEIGHT,
} from '../../../Constants'

export default class PlayableFrog extends Frog implements IPlayable {
  private static _instance: PlayableFrog
  public keys: Record<ArrowKey, boolean>

  private constructor() {
    super(GAME_WIDTH / 2, 0)

    this.keys = { ArrowLeft: false, ArrowRight: false, ' ': false }

    document.onkeydown = (e) => this.keyDown(e)
    document.onkeyup = (e) => this.keyUp(e)
  }

  public static get Instance() {
    return this._instance || (this._instance = new this())
  }

  Update(time: Time) {
    super.Update(time)

    if (this.onGround) {
      // Space down and not crouching
      if (this.keys[' '] && this.state !== FrogState.CROUCH) {
        this.setState(FrogState.CROUCH)
      }
      // Space down and crouching but jump gauge not full
      else if (
        this.keys[' '] &&
        this.state === FrogState.CROUCH &&
        this.jumpGauge != 1
      ) {
        this.jumpGauge >= 1
          ? (this.jumpGauge = 1)
          : (this.jumpGauge += time.deltaTime / JUMP_CHARGE_SPEED)
      }
      // Space up and crouching
      // or
      // Space down and jump gauge full
      else if (
        (!this.keys[' '] && this.state === FrogState.CROUCH) ||
        (this.keys[' '] && this.jumpGauge >= 1)
      ) {
        if (this.jumpGauge < 0.1) {
          this.setState(FrogState.IDLE)
          this.jumpGauge = 0
          return
        }

        if (this.keys.ArrowLeft) this.vx = -SIDE_JUMP_HEIGHT
        else if (this.keys.ArrowRight) this.vx = SIDE_JUMP_HEIGHT

        if (this.keys.ArrowLeft || this.keys.ArrowRight) {
          this.direction = Math.sign(this.vx)
        }

        this.vy = this.jumpGauge * JUMP_HEIGHT
        this.jumpGauge = 0

        this.setState(FrogState.JUMP)
        this.onGround = false
        this.soundFX.jump.play()

        this.totalJumps++
      }
    }
  }

  Draw(render2D: RenderContext2D, time: Time) {
    super.Draw(render2D, time)

    render2D.rectangle(
      this.x - 8,
      this.y + 32 - GAME_HEIGHT * this.level.index,
      Math.trunc(this.jumpGauge * 50),
      4
    )

    if (Debug.Instance.enabled) render2D.drawAABB(this.aabb)
  }

  keyDown(e: KeyboardEvent) {
    this.keys[e.key] = true

    // Enable/disable debug mode
    if (e.key === '`') {
      Debug.Instance.toggleDebug()
    }
  }

  keyUp(e: KeyboardEvent) {
    this.keys[e.key] = false
  }
}
