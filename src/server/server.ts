/* eslint-disable @typescript-eslint/no-var-requires */
// const express = require('express')
const path = require('path')

const levelRouter = require('./routes/levelRouter')
const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, '../../build')))
}

app.use('/level', levelRouter)

app.get('*', (_, res) => {
  res.status(200).sendFile(path.join(__dirname, '../index.html'))
})

app.use((err, _, res) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  }
  const errorObj = Object.assign({}, defaultErr, err)
  return res.status(errorObj.status).json(errorObj.message)
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
