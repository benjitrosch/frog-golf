export default class Debug {
  private static _instance: Debug

  public enabled: boolean

  private constructor() {
    this.enabled = false
  }

  public static get Instance() {
    return this._instance || (this._instance = new this())
  }

  public toggleDebug() {
    this.enabled = !this.enabled
  }
}
