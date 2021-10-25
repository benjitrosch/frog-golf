import Canvas from './Canvas'

export enum GameMode {
  PLAY,
  MENU,
}

export default class GameManager {
  private static _instance: GameManager
  public static get Instance() {
    return this._instance || (this._instance = new this())
  }

  public gameMode: GameMode

  public canvas: Canvas

  private constructor() {
    this.gameMode = GameMode.PLAY
  }

  setGameMode(gameMode: GameMode) {
    if (this.gameMode !== gameMode) {
      this.gameMode = gameMode
    }
  }

  setCanvas(canvas: Canvas) {
    if (this.canvas == null) {
      this.canvas = canvas
    }
  }
}
