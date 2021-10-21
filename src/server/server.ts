/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const path = require('path')

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, '../../build')))
}

app.get('*', (_, res) => {
  res.status(200).sendFile(path.join(__dirname, '../index.html'))
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
