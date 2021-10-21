export default class Canvas {
  public canvas: HTMLCanvasElement

  constructor(elementId: string) {
    const canvas = document.getElementById(elementId)

    if (canvas == null) {
      throw new Error(
        `Could not find element of id ${elementId} in the document`
      )
    }

    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new Error(
        `The element of id "${elementId}" is not a HTMLCanvasElement`
      )
    }

    this.canvas = canvas
  }

  getContext2D() {
    return this.canvas.getContext('2d')
  }
}
