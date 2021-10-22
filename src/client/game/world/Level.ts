import Block from '../entity/solids/Block'

export default class Level {
  public name: string
  public index: number

  public blocks: Block[]

  constructor(name: string, index) {
    this.name = name
    this.index = index

    this.blocks = []
  }
}
