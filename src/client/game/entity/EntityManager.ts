import RenderContext2D from '../system/RenderContext2D'
import Time from '../system/Time'

import Entity from './Entity'

export default class EntityManager {
  public entities: Entity[]

  private addQueue: Entity[]
  private removeQueue: Entity[]

  constructor() {
    this.entities = []

    this.addQueue = []
    this.removeQueue = []
  }

  Update(time: Time) {
    this.entities.forEach((entity) => entity.Update(time))

    this.entities = this.entities.filter(
      (entity) => !this.removeQueue.map((r) => r.uuid).includes(entity.uuid)
    )
    this.removeQueue = []

    this.addQueue.forEach((entity) => entity.Load())
    this.entities = this.entities.concat(this.addQueue)
    this.addQueue = []
  }

  Draw(render2D: RenderContext2D, time: Time) {
    this.entities.forEach((entity) => entity.Draw(render2D, time))
  }

  AddEntity<T extends Entity>(entity: T) {
    this.addQueue.push(entity)
  }

  RemoveEntity<T extends Entity>(entity: T) {
    this.removeQueue.push(entity)
  }
}
