import express from 'express'

import levelController from '../controllers/levelController'

const router = express.Router()

router.get('/load/:levelName', levelController.loadLevelData, (_, res) => {
  return res.status(200).json(res.locals.levelData)
})

router.post('/save', levelController.serializeLevelData, (_, res) => {
  return res.sendStatus(200)
})

export default router
