const express = require('express')
const next = require('next')

const PORT = process.env.PORT || 3000
const DEV = process.env.NODE_ENV !== 'production'
const app = next({ DEV })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.get('/api', (req, res) => {
    res.send('lol')
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(PORT, err => {
    if (err) throw err
    console.log(`listening on port ${PORT}`)
  })
})
