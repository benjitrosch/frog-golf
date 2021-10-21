import Canvas from './Canvas'

import { GAME_HEIGHT } from '../Constants'

type Render2DConstructorParameter = Canvas | HTMLCanvasElement

export default class RenderContext2D {
  public graphics: CanvasRenderingContext2D

  constructor(canvas: Render2DConstructorParameter) {
    if (canvas instanceof HTMLCanvasElement) {
      this.graphics = canvas.getContext('2d')
    }

    if (canvas instanceof Canvas) {
      this.graphics = canvas.getContext2D()
    }
  }

  drawAABB(aabb) {
    this.drawBlock(aabb.x, aabb.y, aabb.width, aabb.height)
  }

  drawBlock(x, y, w, h) {
    this.graphics.beginPath()
    this.graphics.rect(x, GAME_HEIGHT - y, w, -h)
    this.graphics.fill()
    this.graphics.fillStyle = 'black' // TODO: remove
  }
}
