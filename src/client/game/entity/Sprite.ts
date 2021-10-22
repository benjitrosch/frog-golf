import Asset from '../system/Asset'

import { Direction } from './actors/Actor'

export default class Sprite<S> extends Asset {
  public state: S
  public direction: Direction

  public image: HTMLImageElement

  constructor(state: S, direction: Direction, filePath: string) {
    super(filePath)

    this.state = state
    this.direction = direction

    const image = new Image()
    image.src = this.filePath
    this.image = image
  }
}
