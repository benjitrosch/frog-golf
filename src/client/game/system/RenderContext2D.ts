import Canvas from './Canvas'

import Color from '../../utils/Color'
import Fonts from '../../utils/fonts'
import { GAME_HEIGHT, GAME_UNIT_SIZE, GAME_WIDTH } from '../Constants'
import { invertedYCoord } from '../../utils/WorldCoordinates'

export enum TextAlign {
  Center = 'center',
  Left = 'left',
  Right = 'right',
  Justified = 'justified',
}

type Render2DConstructorParameter = Canvas | HTMLCanvasElement

export default class RenderContext2D {
  public graphics: CanvasRenderingContext2D
  public canvas: Canvas

  constructor(canvas: Render2DConstructorParameter) {
    if (canvas instanceof HTMLCanvasElement) {
      this.graphics = canvas.getContext('2d')
      this.canvas = new Canvas(canvas)
    }

    if (canvas instanceof Canvas) {
      this.graphics = canvas.getContext2D()
      this.canvas = canvas
    }
  }

  clearScreen() {
    this.graphics.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

    this.graphics.save()
    this.graphics.fillStyle = Color.Midtone
    this.graphics.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
    this.graphics.restore()
  }

  drawAABB(aabb, levelIndex = 0) {
    this.emptyRectangle(
      aabb.x,
      aabb.y - levelIndex * GAME_HEIGHT,
      aabb.width,
      aabb.height,
      2,
      Color.Red
    )
  }

  rectangle(x, y, w, h, color = Color.Black) {
    this.graphics.save()

    this.graphics.beginPath()
    this.graphics.rect(x, GAME_HEIGHT - y, w, -h)
    this.graphics.fillStyle = color
    this.graphics.fill()

    this.graphics.restore()
  }

  emptyRectangle(x, y, w, h, lineWidth = 2, color = Color.Black) {
    this.graphics.save()

    this.graphics.strokeStyle = color
    this.graphics.lineWidth = lineWidth

    this.graphics.beginPath()
    this.graphics.strokeRect(x, GAME_HEIGHT - y, w, -h)
    this.graphics.stroke()

    this.graphics.restore()
  }

  line(x0, x1, y0, y1, lineWidth = 4, color = Color.Black) {
    this.graphics.save()

    this.graphics.strokeStyle = color
    this.graphics.lineWidth = lineWidth

    this.graphics.beginPath()
    this.graphics.moveTo(x0, GAME_HEIGHT - y0)
    this.graphics.lineTo(x1, GAME_HEIGHT - y1)
    this.graphics.stroke()

    this.graphics.restore()
  }

  text(
    text,
    x,
    y,
    levelIndex = 0,
    color = Color.Black,
    align = TextAlign.Center,
    size = GAME_UNIT_SIZE,
    font = Fonts.Gameboy
  ) {
    this.graphics.save()

    if (font != null) {
      this.graphics.font = font
    }

    this.fontSize(this.graphics.font, size)

    this.graphics.textAlign = align as CanvasTextAlign
    this.graphics.fillStyle = color
    this.graphics.fillText(text, x, invertedYCoord(y, levelIndex, size))

    this.graphics.restore()
  }

  fontSize(font, size) {
    this.graphics.font = font.replace(/\d+px/, `${size}px`)
  }

  getTextWidth(text) {
    return this.graphics.measureText(text).width
  }
}
