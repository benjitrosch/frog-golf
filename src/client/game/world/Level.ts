import AABB from '../entity/components/AABB'
import Block from '../entity/solids/Block'
import Wall from '../entity/solids/Wall'
import Grid from './Grid'

import RenderContext2D, { TextAlign } from '../system/RenderContext2D'
import Asset from '../system/Asset'

import { GAME_HEIGHT } from '../Constants'
import Color from '../../utils/Color'
import Fonts from '../../utils/fonts'

type SolidData = {
  x: number
  y: number
  width: number
  height: number
}

type LevelData = {
  title: string
  gravity: number
  blocks: SolidData[]
  walls: SolidData[]
}

export default class Level extends Asset {
  public name: string
  public index: number

  public blocks: Block[]
  public walls: Wall[]

  public grid: Grid

  public gravity: number

  constructor(filePath: string) {
    super(filePath)

    // Initialize values as non-null to prevent errors
    this.name = ''
    this.index = 0

    this.blocks = []
    this.walls = []

    this.grid = new Grid(this)
  }

  async Load(index: number) {
    this.index = index

    // Load JSON lvl data
    await fetch(this.filePath)
      .then((res) => res.json())
      .then((data: LevelData) => {
        this.name = data.title
        this.gravity = data.gravity

        // Parse block data to blocks
        const blocks: Block[] = []
        data.blocks.forEach((block) => {
          blocks.push(
            new Block(
              this,
              new AABB(block.x, block.y, block.width, block.height)
            )
          )
        })

        this.blocks = blocks

        // Parse wall data to walls
        const walls: Wall[] = []
        data.walls.forEach((wall) => {
          walls.push(new Wall(this, wall.x, wall.y, wall.width, wall.height))
        })

        this.walls = walls
      })
  }

  Draw(render2D: RenderContext2D) {
    this.grid.Draw(render2D)

    this.blocks.forEach((block) => block.Draw(render2D))
    this.walls.forEach((wall) => wall.Draw(render2D))

    render2D.text(
      this.name,
      4,
      GAME_HEIGHT * (this.index + 1) - 32,
      this.index,
      Color.Shadow,
      TextAlign.Left,
      12,
      Fonts.Gameboy
    )
  }

  addBlock(block: Block) {
    console.log('added block!')
    this.blocks = []
  }
}
