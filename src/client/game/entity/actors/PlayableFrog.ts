import {
  JUMP_CHARGE_SPEED,
  JUMP_HEIGHT,
  SIDE_JUMP_HEIGHT,
} from '../../Constants'
import Frog, { FrogState } from './Frog'
import IPlayable, { ArrowKey } from './IPlayable'

export default class PlayableFrog extends Frog implements IPlayable {
  keys: Record<ArrowKey, boolean>

  constructor(x, y) {
    super(x, y)

    document.onkeydown = this.keyDown
    document.onkeyup = this.keyUp
  }

  update(deltaTime: number) {
    super.update(deltaTime)

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
          : (this.jumpGauge += deltaTime / JUMP_CHARGE_SPEED)
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

        this.vy = this.jumpGauge * JUMP_HEIGHT
        this.jumpGauge = 0

        this.setState(FrogState.JUMP)
        this.onGround = false

        this.totalJumps++
      }
    }
  }

  keyDown(e: KeyboardEvent) {
    this.keys[e.key] = true
  }

  keyUp(e: KeyboardEvent) {
    this.keys[e.key] = false
  }
}
