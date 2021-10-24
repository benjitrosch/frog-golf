import express from 'express'
import path from 'path'

import levelRouter from './routes/levelRouter'

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/level', levelRouter)

// if (process.env.NODE_ENV === 'production') {
// app.use('/', express.static(path.join(__dirname, '../../build')))
// } else {
app.get('*', (_, res) => {
  res.status(200).sendFile(path.join(__dirname, '../index.html'))
})
// }

app.use((err, _, res, _next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  }
  const errorObj = Object.assign({}, defaultErr, err)
  return res.status(errorObj.status).json(errorObj.message)
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
