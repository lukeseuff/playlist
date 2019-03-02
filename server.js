const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
const playlist = require('./routes/playlist')
const admin = require('firebase-admin')
const session = require('express-session')
const FileStore = require('session-file-store')(session)

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

var serverCredentials
try {
  serverCredentials = require('./config/firebase/server')
} catch(err) {
  serverCredentials = JSON.parse(process.env.FIREBASE_SERVER_CREDENTIALS)
}

const firebase = admin.initializeApp(
  {
    credential: admin.credential.cert(serverCredentials),
    databaseURL: 'https://playlist-36d9e.firebaseio.com'
  },
  'server'
)

app.prepare().then(() => {
  const server = express()

  server.use(bodyParser.json())
  server.use(
    session({
      secret: 'gesundheit',
      saveUninitialized: true,
      // store: new FileStore({ path: '/tmp/sessions', secret: 'gesundheit' }),
      resave: false,
      rolling: true,
      httpOnly: true,
      cookie: { maxAge: 604800000 } // week
    })
  )

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

  server.post('/api/logout', (req, res) => {
    req.session.decodedToken = null
    res.json({ status: true })
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`listening on port ${port}`)
  })
})
