import Level from './Level'

import RenderContext2D from '../system/RenderContext2D'
import PlayableFrog from '../entity/actors/Frog/PlayableFrog'

export default class Map {
  private static _instance: Map

  public levels: Level[]
  public get numLevels() {
    return this.levels.length - 1
  }

  private constructor() {
    this.levels = [
      new Level('world/levels/lvl_0.json'),
      new Level('world/levels/lvl_1.json'),
      new Level('world/levels/lvl_2.json'),
      new Level('world/levels/lvl_3.json'),
      new Level('world/levels/lvl_4.json'),
    ]
    this.levels.forEach((level, i) => level.Load(i))
  }

  public static get Instance() {
    return this._instance || (this._instance = new this())
  }

  Draw(render2D: RenderContext2D) {
    this.levels[PlayableFrog.Instance.levelIndex]?.Draw(render2D)
  }
}
