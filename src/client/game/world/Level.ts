import AABB from '../entity/components/AABB'
import Block from '../entity/solids/Block'
import Wall from '../entity/solids/Wall'
import Grid from './Grid'

import RenderContext2D, { TextAlign } from '../system/RenderContext2D'
import Asset from '../system/Asset'

import { GAME_HEIGHT, GAME_UNIT_SIZE } from '../Constants'
import Color from '../../utils/color'
import Fonts from '../../utils/fonts'
import Vector2 from '../entity/components/Vector2'
import { vector2ToString } from '../../utils/string'

export type SolidData = {
  x: number
  y: number
  width: number
  height: number
}

export type LevelData = {
  title: string
  gravity: number
  blocks: SolidData[]
  walls: SolidData[]
}

export default class Level extends Asset {
  public name: string
  public index: number

  public blocks: Block[]
  public get numBlocks() {
    return this.blocks.length
  }
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
          const newBlock = new Block(
            this,
            new AABB(block.x, block.y, block.width, block.height)
          )

          blocks.push(newBlock)

          const x = Math.floor(block.x / GAME_UNIT_SIZE)
          const y = Math.floor((GAME_HEIGHT - block.y) / GAME_UNIT_SIZE)

          this.grid.getTile(new Vector2(x, y)).setBlock(newBlock)
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

    // this.blocks.forEach((block) => block.Draw(render2D))
    this.walls.forEach((wall) => wall.Draw(render2D)) // TODO: remove

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
    this.blocks.push(block)
    return block
  }

  removeBlock(pos: Vector2) {
    if (!this.checkBlock(pos)) {
      throw new Error(
        `No block at ${vector2ToString(pos)} exists in level ${this.fileName}`
      )
    }

    const targetBlock = this.blocks.find(
      (block) => block.x === pos.x && block.y === pos.y
    )

    this.blocks.splice(
      this.blocks.findIndex((block) => block.uuid === targetBlock.uuid),
      1
    )
  }

  serializeToJSON() {
    const body = {
      fileName: this.fileName,
      blocks: this.blocks.map((block) => {
        return {
          x: block.x,
          y: block.y,
          width: block.width,
          height: block.height,
        } as SolidData
      }),
    }

    return JSON.stringify(body)
  }

  checkBlock(pos: Vector2): boolean {
    return !!this.blocks.find((block) => block.x === pos.x && block.y === pos.y)
  }

  getBlock(pos: Vector2): Block | null {
    return (
      this.blocks.find((block) => block.x === pos.x && block.y === pos.y) ??
      null
    )
  }
}
