import RenderContext2D from '../system/RenderContext2D'
import Time from '../system/Time'

import { generateUUID } from '../../utils/hash'

export default abstract class Entity {
  public uuid: string

  public abstract Load()
  public abstract Update(time: Time)
  public abstract Draw(render2D: RenderContext2D, time: Time)

  constructor() {
    this.uuid = generateUUID()
  }
}
