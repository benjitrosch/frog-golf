import { getMousePos } from '../../utils/WorldCoordinates'
import { GAME_HEIGHT } from '../Constants'
import Vector2 from '../entity/components/Vector2'

type CanvasConstructorParameter = string | HTMLCanvasElement

export default class Canvas {
  public canvas: HTMLCanvasElement
  public mousePos: Vector2

  constructor(element: CanvasConstructorParameter) {
    if (typeof element === 'string') {
      const canvas = document.getElementById(element)

      if (canvas == null) {
        throw new Error(
          `Could not find element of id ${element} in the document`
        )
      }

      if (!(canvas instanceof HTMLCanvasElement)) {
        throw new Error(
          `The element of id "${element}" is not a HTMLCanvasElement`
        )
      }

      this.canvas = canvas
    }

    if (element instanceof HTMLCanvasElement) {
      this.canvas = element
    }

    this.canvas.onmousemove = (e) => this.getMousePos(e)
    this.canvas.oncontextmenu = (e) => e.preventDefault()
  }

  getContext2D() {
    return this.canvas.getContext('2d')
  }

  getMousePos(e) {
    this.mousePos = getMousePos(this.canvas, e)
  }

  getTouchPos(e) {
    const rect = this.canvas.getBoundingClientRect()

    return {
      x: Math.trunc(e.touches[0].clientX - rect.left),
      y: GAME_HEIGHT - Math.trunc(e.touches[0].clientY - rect.top),
    }
  }
}
