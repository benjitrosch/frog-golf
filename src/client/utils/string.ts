import Vector2 from '../game/entity/components/Vector2'

export const vector2ToString = (val: Vector2, label?: string): string => {
  return `${label ? `${label}: ` : ''}(${Math.trunc(val.x)}, ${Math.trunc(
    val.y
  )})`
}
