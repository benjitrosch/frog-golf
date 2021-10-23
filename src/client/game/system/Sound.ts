export default class Sound {
  private static _instance: Sound

  public volume: number

  private constructor() {
    this.volume = 0
  }

  public static get Instance() {
    return this._instance || (this._instance = new this())
  }
}
