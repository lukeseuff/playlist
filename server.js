const express = require('express')
const next = require('next')
const playlist = require('./routes/playlist')
const admin = require('firebase-admin')

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const firebase = admin.initializeApp(
  {
    credential: admin.credential.cert(require('./config/firebase/server')),
    databaseURL: 'https://playlist-36d9e.firebaseio.com'
  },
  'server'
)

app.prepare().then(() => {
  const server = express()

  server.use((req, res, next) => {
    req.firebaseServer = firebase
    next()
  })

  server.use('/api/playlist', playlist)

  server.post('/api/login', (req, res) => {
    if (!req.body) return res.sendStatus(400)

    const token = req.body.token
    firebase.auth()
            .verifyIdToken(token)
            .then(decodedToken => {
              req.session.decodedToken = decodedToken
              return decodedToken
            })
            .then(decodedToken => res.json({ status: true, decodedToken }))
            .catch(error => res.json({ error }))
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`listening on port ${port}`)
  })
})
