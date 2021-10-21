export default class Vector2 {
  x: number
  y: number

  constructor(x, y) {
    this.x = x
    this.y = y
  }

  normalize() {
    const length = this.getLength()

    this.x /= length
    this.y /= length
  }

  getLength() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  dot(v) {
    return this.x * v.x + this.y * v.y
  }

  cross(v) {
    return this.y * v.x - this.x * v.y
  }

  add(v) {
    return new Vector2(this.x + v.x, this.y + v.y)
  }

  sub(v) {
    return new Vector2(this.x - v.x, this.y - v.y)
  }

  div(v) {
    return new Vector2(this.x / v, this.y / v)
  }

  mul(v) {
    return new Vector2(this.x * v, this.y * v)
  }

  equals(v) {
    return this.x == v.x && this.y == v.y
  }
}
