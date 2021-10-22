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

  constructor(canvas: Render2DConstructorParameter) {
    if (canvas instanceof HTMLCanvasElement) {
      this.graphics = canvas.getContext('2d')
    }

    if (canvas instanceof Canvas) {
      this.graphics = canvas.getContext2D()
    }
  }

  clearScreen() {
    this.graphics.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
  }

  drawAABB(aabb) {
    this.emptyRectangle(aabb.x, aabb.y, aabb.width, aabb.height, Color.Red)
  }

  rectangle(x, y, w, h, color = Color.Black) {
    this.graphics.beginPath()
    this.graphics.rect(x, GAME_HEIGHT - y, w, -h)
    this.graphics.fill()
    this.graphics.fillStyle = color
  }

  emptyRectangle(x, y, w, h, color = Color.Black) {
    this.graphics.beginPath()
    this.graphics.strokeRect(x, GAME_HEIGHT - y, w, -h)
    this.graphics.stroke()
    this.graphics.strokeStyle = color
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
