/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs'

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

exports.levelController = {
  serializeLevelData(req: Request, _res: Response, next): void {
    const { filePath, newBlock } = req.body as unknown as {
      filePath: string
      newBlock: SolidData
    }

    try {
      fs.readFile(filePath, 'utf-8', function (err, data) {
        if (err) throw err

        const levelData: LevelData = JSON.parse(data)
        levelData.blocks.push(newBlock)

        fs.writeFile(filePath, JSON.stringify(levelData), 'utf-8', (err) => {
          if (err) throw err
          return next()
        })
      })
    } catch (err) {
      const errorObj = {
        message: `Error saving level data: ${err}`,
        log: 'Error in levelController.serializeLevelData. Check error error logs',
      }
      return next(errorObj)
    }
  },
}
