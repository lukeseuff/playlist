const express = require('express')
const next = require('next')
const playlist = require('./routes/playlist')

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const request = require('./lib/client/request')

app.prepare().then(() => {
  const server = express()

  server.use('/api/playlist', playlist)

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`listening on port ${port}`)
  })
})
