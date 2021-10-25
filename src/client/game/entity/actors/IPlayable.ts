export enum ArrowKey {
  LEFT = 'ArrowLeft',
  RIGHT = 'ArrowRight',
  SPACE = ' ',
}

export default interface IPlayable {
  keys: Record<ArrowKey, boolean>
  keyDown: (e: KeyboardEvent) => void
  keyUp: (e: KeyboardEvent) => void
  touchDown: (e: TouchEvent) => void
  touchUp: (e: TouchEvent) => void
}
