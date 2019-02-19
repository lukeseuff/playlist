const express = require('express')
const router = express.Router()
const request = require('../lib/server/request')
const search = require('../lib/server/search')
const format = require('../lib/server/format')

router.get('/search', function (req, res) {
  res.set('Access-Control-Allow-Origin', 'localhost')

  search(req.query.search_query).then((results) => {
    res.json(results)
  }).catch((err) => {
    console.log(err)
    res.sendStatus(500)
  })
})


router.get('/get', function (req, res) {
  res.set('Access-Control-Allow-Origin', 'localhost')

  request.getPlaylistItem(req.query.id).then((items) => {
  	const videos = format.formatPlaylistItems(items)
    res.json(videos)
  }).catch((err) => {
  	console.log(err)
  	res.sendStatus(500)
  })
})

module.exports = router
