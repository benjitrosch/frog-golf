import Sprite from '../../entity/Sprite'

import RenderContext2D from '../../system/RenderContext2D'
import Time from '../../system/Time'

import Vector2 from '../../entity/components/Vector2'
import { invertedYCoord } from '../../../utils/WorldCoordinates'
import { GAME_WIDTH } from '../../Constants'

const CLOUD_SPEED = 0.1

// TODO: should I make this an entity??
export default class Cloud {
  public x: number
  public y: number
  public get position() {
    return new Vector2(this.x, this.y)
  }

  private sprite: Sprite

  constructor(x, y, sprite) {
    this.x = x
    this.y = y

    this.sprite = sprite
  }

  Update(time: Time) {
    this.x += CLOUD_SPEED

    if (this.x > GAME_WIDTH) this.x = -GAME_WIDTH
  }

  Draw(render2D: RenderContext2D) {
    const { graphics } = render2D

    if (this.sprite.loaded) {
      graphics.drawImage(
        this.sprite.image,
        this.x,
        invertedYCoord(this.y),
        192 * 2,
        96 * 2
      )
    }
  }
}
