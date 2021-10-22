import Level from './Level'

export default class Map {
  private static _instance: Map

  public levels: Level[]
  public get numLevels() {
    return this.levels.length - 1
  }

  private constructor() {
    this.levels = [
      new Level('SPACE to BOUNCE!', 0),
      new Level("Ain't Easy Being #008000...", 1),
      new Level("Ol' Texas Three-step", 2),
    ]
  }

  public static get Instance() {
    return this._instance || (this._instance = new this())
  }
}
