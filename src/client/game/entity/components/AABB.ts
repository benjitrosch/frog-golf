export default class AABB {
  public x: number
  public X: number

  public y: number
  public Y: number

  public width: number
  public height: number

  constructor(x, y, w, h) {
    this.x = x
    this.y = y
    this.X = x + w
    this.Y = y + h

    this.width = w
    this.height = h
  }

  checkCollidePoint(px, py) {
    if (px > this.x && px < this.X && py > this.y && py < this.Y) return true
    else return false
  }

  checkCollideBox(aabb: AABB) {
    const leftTop = this.checkCollidePoint(aabb.x, aabb.Y)
    const rightTop = this.checkCollidePoint(aabb.X, aabb.Y)
    const leftBottom = this.checkCollidePoint(aabb.x, aabb.y)
    const rightBottom = this.checkCollidePoint(aabb.X, aabb.y)

    const res = {
      collide: leftBottom || rightBottom || leftTop || rightTop,
      lb: leftBottom,
      rb: rightBottom,
      lt: leftTop,
      rt: rightTop,
    }

    return res
  }

  move(dx, dy) {
    this.x += dx
    this.y += dy
    this.X += dx
    this.Y += dy
  }
}
