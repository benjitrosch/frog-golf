/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express'

import levelController from '../controllers/levelController'

const router = express.Router()

router.get('/load', (_, res) => {
  return res.status(200).json({ message: 'hi' })
})

router.post('/save', levelController.serializeLevelData, (_, res) => {
  return res.status(200).json({ message: 'bye' })
})

export default router
