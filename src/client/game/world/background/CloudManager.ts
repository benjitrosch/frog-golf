import Cloud from './Cloud'

import RenderContext2D from '../../system/RenderContext2D'
import Time from '../../system/Time'
import Sprite from '../../entity/Sprite'

import { randomInt } from '../../../utils/calc'
import { GAME_HEIGHT, GAME_WIDTH } from '../../Constants'

const MAX_NUM_CLOUDS = 16
const CLOUD_POS_OFFSET = 48

export default class CloudManager {
  private static _instance: CloudManager
  public static get Instance() {
    return this._instance || (this._instance = new this())
  }

  private numClouds: number

  private clouds: Cloud[]
  private cloudSprites: Sprite[]

  private constructor() {
    this.clouds = []
    this.cloudSprites = []
  }

  Load() {
    this.cloudSprites = [
      new Sprite('world/clouds/Cloud_00.png'),
      new Sprite('world/clouds/Cloud_01.png'),
      new Sprite('world/clouds/Cloud_02.png'),
      new Sprite('world/clouds/Cloud_03.png'),
      new Sprite('world/clouds/Cloud_04.png'),
    ]

    this.generateClouds()
  }

  Update(time: Time) {
    this.clouds.forEach((cloud) => cloud.Update(time))
  }

  Draw(render2D: RenderContext2D) {
    this.clouds.forEach((cloud) => cloud.Draw(render2D))
  }

  generateClouds() {
    this.clouds = []

    this.numClouds = Math.floor(Math.random() * MAX_NUM_CLOUDS) + 1

    for (let i = 0; i < this.numClouds; i++) {
      const posX = Math.floor(Math.random() * 10)
      const posY = Math.floor(Math.random() * 10)

      this.clouds.push(
        new Cloud(
          -GAME_WIDTH + CLOUD_POS_OFFSET * posX,
          GAME_HEIGHT / 2 + CLOUD_POS_OFFSET * posY,
          this.cloudSprites[randomInt(0, this.cloudSprites.length - 1)]
        )
      )
    }
  }
}
