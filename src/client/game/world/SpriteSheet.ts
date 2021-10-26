import Asset from '../system/Asset'

export default class SpriteSheet extends Asset {
  public image: HTMLImageElement

  public loaded: boolean

  constructor(filePath: string) {
    super(filePath)

    const image = new Image()
    image.src = this.filePath
    image.onload = () => {
      this.loaded = true
    }

    this.image = image
  }
}
