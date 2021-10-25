export default class Sound {
  private static _instance: Sound
  public static get Instance() {
    return this._instance || (this._instance = new this())
  }

  public volume: number

  private constructor() {
    this.volume = 0.1
  }
}
