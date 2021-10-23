import { getMousePos } from '../../utils/WorldCoordinates'
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
  }

  getContext2D() {
    return this.canvas.getContext('2d')
  }

  getMousePos(e) {
    this.mousePos = getMousePos(this.canvas, e)
  }
}
