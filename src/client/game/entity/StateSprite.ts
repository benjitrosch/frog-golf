import Sprite from './Sprite'

import { Direction } from './actors/Actor'

export default class StateSprite<S> extends Sprite {
  public state: S
  public direction: Direction

  constructor(state: S, direction: Direction, filePath: string) {
    super(filePath)

    this.state = state
    this.direction = direction
  }
}
