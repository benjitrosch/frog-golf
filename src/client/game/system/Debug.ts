import PlayableFrog from '../entity/actors/Frog/PlayableFrog'

import RenderContext2D, { TextAlign } from './RenderContext2D'
import Time from './Time'

import Color from '../../utils/Color'
import Fonts from '../../utils/fonts'
import { vector2ToString } from '../../utils/string'
import { GAME_HEIGHT, GAME_WIDTH } from '../Constants'

const LINE_HEIGHT = 16

export default class Debug {
  private static _instance: Debug

  public enabled: boolean

  private constructor() {
    this.enabled = false
  }

  public static get Instance() {
    return this._instance || (this._instance = new this())
  }

  toggleDebug() {
    this.enabled = !this.enabled
  }

  Draw(render2D: RenderContext2D, time: Time) {
    if (!this.enabled) {
      return
    }

    // build
    render2D.text(
      'release alpha 0.0.1',
      GAME_WIDTH - 8,
      GAME_HEIGHT - LINE_HEIGHT * 2,
      0,
      Color.White,
      TextAlign.Right,
      14,
      Fonts.Rainyhearts
    )

    // ticks per second
    render2D.text(
      `${Math.trunc(time.unscaledTime)} tps`,
      GAME_WIDTH - 8,
      GAME_HEIGHT - LINE_HEIGHT * 3,
      0,
      Color.White,
      TextAlign.Right,
      14,
      Fonts.Rainyhearts
    )

    // spacer
    render2D.text(
      '---',
      GAME_WIDTH - 8,
      GAME_HEIGHT - LINE_HEIGHT * 4,
      0,
      Color.White,
      TextAlign.Right,
      14,
      Fonts.Rainyhearts
    )

    // player current level
    render2D.text(
      `level: ${PlayableFrog.Instance.level.index}`,
      GAME_WIDTH - 8,
      GAME_HEIGHT - LINE_HEIGHT * 5,
      0,
      Color.White,
      TextAlign.Right,
      14,
      Fonts.Rainyhearts
    )

    // player position
    render2D.text(
      vector2ToString(PlayableFrog.Instance.position, 'pos'),
      GAME_WIDTH - 8,
      GAME_HEIGHT - LINE_HEIGHT * 6,
      0,
      Color.White,
      TextAlign.Right,
      14,
      Fonts.Rainyhearts
    )

    // player velocity
    render2D.text(
      vector2ToString(PlayableFrog.Instance.velocity, 'vel'),
      GAME_WIDTH - 8,
      GAME_HEIGHT - LINE_HEIGHT * 7,
      0,
      Color.White,
      TextAlign.Right,
      14,
      Fonts.Rainyhearts
    )

    // player jump gauge
    render2D.text(
      `jump power: ${Math.round(PlayableFrog.Instance.jumpGauge * 100)} / 100`,
      GAME_WIDTH - 8,
      GAME_HEIGHT - LINE_HEIGHT * 8,
      0,
      Color.White,
      TextAlign.Right,
      14,
      Fonts.Rainyhearts
    )

    // spacer
    render2D.text(
      '---',
      GAME_WIDTH - 8,
      GAME_HEIGHT - LINE_HEIGHT * 9,
      0,
      Color.White,
      TextAlign.Right,
      14,
      Fonts.Rainyhearts
    )

    // player socket id
    render2D.text(
      'uid: ##########',
      GAME_WIDTH - 8,
      GAME_HEIGHT - LINE_HEIGHT * 10,
      0,
      Color.White,
      TextAlign.Right,
      14,
      Fonts.Rainyhearts
    )

    // player display name
    render2D.text(
      'display: "abcdefg123"',
      GAME_WIDTH - 8,
      GAME_HEIGHT - LINE_HEIGHT * 11,
      0,
      Color.White,
      TextAlign.Right,
      14,
      Fonts.Rainyhearts
    )
  }
}
