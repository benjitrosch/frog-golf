import Asset from '../system/Asset'
import Sound from '../system/Sound'

export default class SoundFX extends Asset {
  public name: string
  public clip: HTMLAudioElement

  constructor(name: string, filePath: string) {
    super(filePath)

    this.name = name

    const clip = new Audio()
    clip.src = this.filePath
    this.clip = clip
  }

  play() {
    this.clip.pause()
    this.clip.currentTime = 0
    this.clip.volume = Sound.Instance.volume
    this.clip.play()
  }
}
