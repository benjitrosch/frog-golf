/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express'

// import levelController from '../controllers/levelController'

const router = express.Router()

router.get('/load', (_, res) => {
  return res.status(200).json({ message: 'hi' })
})

router.post('/save', (_, res) => {
  console.log('hiiiii')
  return res.status(200).json({ message: 'bye' })
})

export default router
