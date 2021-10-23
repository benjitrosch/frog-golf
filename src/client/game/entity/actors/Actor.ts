import Entity from '../Entity'

import Vector2 from '../components/Vector2'
import AABB from '../components/AABB'
import Sprite from '../Sprite'
import SoundFX from '../SoundFX'

import Time from '../../system/Time'
import Map from '../../world/Map'

import {
  BOUND_FRICTION,
  DEFAULT_GRAVITY,
  GAME_HEIGHT,
  GAME_WIDTH,
  LINEAR_DRAG,
} from '../../Constants'
import { heightToLevel } from '../../../utils/WorldCoordinates'
import { getIntersect } from '../../../utils/collision'

export enum Direction {
  LEFT = -1,
  RIGHT = 1,
}

export enum CollisionDirection {
  LEFT,
  RIGHT,
  TOP,
  BOTTOM,
  WALL,
}

type CollisionResponse = {
  side: CollisionDirection
  set: number
  ref?: {
    x: number
    y: number
  }
}

export default abstract class Actor<S> extends Entity {
  protected x: number
  protected y: number
  public get position() {
    return new Vector2(this.x, this.y)
  }
  public set position(pos: Vector2) {
    this.x = pos.x
    this.y = pos.y
  }

  protected vx: number
  protected vy: number
  public get velocity() {
    return new Vector2(this.vx, this.vy)
  }
  public set velocity(vel: Vector2) {
    this.vx = vel.x
    this.vy = vel.y
  }

  protected size: number

  protected direction: Direction
  protected onGround: boolean

  public state: S
  protected spritesLeft: Sprite<S>[]
  protected spritesRight: Sprite<S>[]
  protected soundFX: Record<string, SoundFX>

  constructor(x, y, size) {
    super()

    this.x = x - size / 2
    this.y = y - size / 2
    this.vx = 0
    this.vy = 0

    this.size = size
    this.direction = Direction.RIGHT
    this.onGround = true
  }

  public get aabb() {
    return new AABB(this.x, this.y, this.size, this.size)
  }

  public get center() {
    return {
      x: this.x + this.size / 2,
      y: this.y + this.size / 2,
    }
  }

  Load() {
    throw new Error('Load not implemented')
  }

  Update(time: Time) {
    //Apply previous acceleration
    this.vx *= LINEAR_DRAG
    this.vy *= LINEAR_DRAG
    if (Math.abs(this.vx) < 0.0001) this.vx = 0
    if (Math.abs(this.vy) < 0.0001) this.vy = 0

    this.x += this.vx
    this.y += this.vy

    // Set level to total height / screen height,
    // max out at total # levels
    if (heightToLevel(this.y) <= Map.Instance.numLevels) {
      this.level = Map.Instance.levels[heightToLevel(this.y)]
    }

    //Apply gravity
    if (
      this.testCollide(0, -(this.level?.gravity ?? DEFAULT_GRAVITY)).side ==
      undefined
    ) {
      this.vy -= this.level.gravity ?? DEFAULT_GRAVITY
      this.onGround = false
    }

    //Test if current acceleration make collision happen or not
    const testColl = this.testCollide(this.vx, this.vy)

    if (testColl.side != undefined) {
      this.reponseCollide(testColl)
    }
  }

  abstract getDrawImage(): Sprite<S>

  setState(state: S) {
    if (this.state !== state) {
      this.state = state
    }
  }

  testCollide(nvx, nvy): CollisionResponse {
    let side
    let set

    const box = this.aabb
    box.move(nvx, nvy)

    if (box.x < 0) {
      side = CollisionDirection.LEFT
      set = 0
    } else if (box.X > GAME_WIDTH) {
      side = CollisionDirection.RIGHT
      set = GAME_WIDTH
    } else if (box.y < 0) {
      side = CollisionDirection.BOTTOM
      set = 0
    } else if (
      box.y > GAME_HEIGHT &&
      heightToLevel(this.y) > Map.Instance.numLevels
    ) {
      side = CollisionDirection.TOP
      set = this.y
    } else {
      for (const b of this.level.blocks) {
        const aabb = b.convert()
        const r = aabb.checkCollideBox(box)

        if (r.collide) {
          if (r.lb && r.lt) {
            side = CollisionDirection.LEFT
            set = aabb.X
          } else if (r.rb && r.rt) {
            side = CollisionDirection.RIGHT
            set = aabb.x
          } else if (r.lb && r.rb) {
            side = CollisionDirection.BOTTOM
            set = aabb.Y
          } else if (r.lt && r.rt) {
            side = CollisionDirection.TOP
            set = aabb.y
          } else if (r.lb) {
            const bx = box.x - this.vx
            if (bx > aabb.X) {
              side = CollisionDirection.LEFT
              set = aabb.X
            } else {
              side = CollisionDirection.BOTTOM
              set = aabb.Y
            }
          } else if (r.rb) {
            const bx = box.X - this.vx
            if (bx < aabb.x) {
              side = CollisionDirection.RIGHT
              set = aabb.x
            } else {
              side = CollisionDirection.BOTTOM
              set = aabb.Y
            }
          } else if (r.lt) {
            const bx = box.x - this.vx
            if (bx > aabb.X) {
              side = CollisionDirection.LEFT
              set = aabb.X
            } else {
              side = CollisionDirection.TOP
              set = aabb.y
            }
          } else if (r.rt) {
            const bx = box.X - this.vx
            if (bx < aabb.x) {
              side = CollisionDirection.RIGHT
              set = aabb.x
            } else {
              side = CollisionDirection.TOP
              set = aabb.y
            }
          }

          return { side, set }
        }
      }

      for (let w of this.level.walls) {
        w = w.convert()
        const r = w.checkCollideAABB(box, nvx, nvy)

        if (r.collide != undefined) {
          side = CollisionDirection.WALL
          const nv = new Vector2(nvx, nvy)
          let n

          if (!r.endPoint) {
            const hitPoint = getIntersect(
              w.x0,
              w.y0,
              w.x1,
              w.y1,
              r.collide.x,
              r.collide.y,
              r.collide.x + nvx,
              r.collide.y + nvy
            )

            set = new Vector2(box.x, box.y).add(hitPoint.sub(r.collide))
            n = w.getNormal()
          } else {
            n = new Vector2(w.x0, w.y0).sub(new Vector2(w.x1, w.y1))
            n.normalize()
            set = new Vector2(box.x, box.y).sub(nv.mul(3))
          }

          const ref = nv.sub(n.mul(2).mul(nv.dot(n)))

          return { side, set, ref }
        }
      }
    }

    return { side, set }
  }

  reponseCollide(c: CollisionResponse) {
    switch (c.side) {
      case CollisionDirection.LEFT:
        this.collideToLeft(c.set)
        break
      case CollisionDirection.RIGHT:
        this.collideToRight(c.set)
        break
      case CollisionDirection.BOTTOM:
        this.collideToBottom(c.set)
        break
      case CollisionDirection.TOP:
        this.collideToTop(c.set)
        break
      case CollisionDirection.WALL:
        this.collideToWall(c.set, c.ref)
        break
    }
  }

  collideToLeft(w, onHit?: () => void) {
    this.x = w
    this.vx *= -1 * BOUND_FRICTION

    this.direction = Math.sign(this.vx)

    if (onHit != null) {
      onHit()
    }
  }

  collideToRight(w, onHit?: () => void) {
    this.x = w - this.size
    this.vx *= -1 * BOUND_FRICTION

    this.direction = Math.sign(this.vx)

    if (onHit != null) {
      onHit()
    }
  }

  collideToTop(w, onHit?: () => void) {
    this.y = w - this.size
    this.vy *= -1 * BOUND_FRICTION

    if (onHit != null) {
      onHit()
    }
  }

  collideToBottom(w, onHit?: () => void) {
    this.y = w
    this.vx = 0
    this.vy = 0

    this.onGround = true

    if (onHit != null) {
      onHit()
    }
  }

  collideToWall(s, r, onHit?: () => void) {
    this.x = s.x
    this.y = s.y
    this.vx = r.x * LINEAR_DRAG
    this.vy = r.y

    this.direction = Math.sign(this.vx)

    if (onHit != null) {
      onHit()
    }
  }

  moveTo(pos: Vector2) {
    this.x = pos.x - this.size / 2
    this.y = pos.y - this.size / 2
  }
}
