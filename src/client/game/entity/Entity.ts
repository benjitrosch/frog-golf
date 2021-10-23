import RenderContext2D from '../system/RenderContext2D'
import Time from '../system/Time'
import Level from '../world/Level'

import { generateUUID } from '../../utils/hash'

export default abstract class Entity {
  public uuid: string

  public level: Level
  public get levelIndex() {
    return this.level.index
  }

  public abstract Load()
  public abstract Update(time: Time)
  public abstract Draw(render2D: RenderContext2D)

  constructor() {
    this.uuid = generateUUID()
  }
}
