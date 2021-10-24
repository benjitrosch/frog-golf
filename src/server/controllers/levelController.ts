import fs from 'fs'
import path from 'path'

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

const levelController = {
  loadLevelData(req, res, next) {
    const fileName = req.params.levelName

    const filePath = path.join(
      __dirname,
      `../../../src/assets/world/levels/${fileName}`
    )

    try {
      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          throw err
        }

        res.locals.levelData = JSON.parse(data)
        return next()
      })
    } catch (err) {
      const errorObj = {
        message: `Error loading level data: ${err}`,
        log: 'Error in levelController.loadLevelData. Check error error logs',
      }
      return next(errorObj)
    }
  },

  serializeLevelData(req, _res, next) {
    const { fileName, blocks } = req.body as unknown as {
      fileName: string
      blocks: SolidData[]
    }

    const filePath = path.join(
      __dirname,
      `../../../src/assets/world/levels/${fileName}`
    )

    console.log(fileName)
    console.log(filePath)

    try {
      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          throw err
        }

        const levelData: LevelData = JSON.parse(data)
        levelData.blocks = blocks

        fs.writeFile(filePath, JSON.stringify(levelData), 'utf-8', (err) => {
          if (err) {
            throw err
          }

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

export default levelController
