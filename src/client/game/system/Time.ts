export default class Time {
  public startTime: number
  public previousTime: number
  public currentTime: number
  public totalTime: number

  public unscaledTime: number
  public get deltaTime() {
    return this.unscaledTime * this.timeScale
  }

  public timeScale: number

  constructor() {
    this.previousTime = new Date().getTime()
    this.startTime = new Date().getTime()

    this.unscaledTime = 0

    this.timeScale = 1
  }
}
