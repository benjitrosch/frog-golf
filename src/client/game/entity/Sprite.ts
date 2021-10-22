import Asset from '../system/Asset'

export default class Sprite<S> extends Asset {
  public state: S
  public get image(): HTMLImageElement {
    const image = new Image()
    image.src = this.fileName
    return image
  }

  constructor(state: S, filePath: string) {
    super(filePath)
    this.state = state
  }
}
