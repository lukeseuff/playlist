const config = require('./config')
const { google } = require('googleapis')

const headers = {}
if (config.general.host !== undefined) {
  headers['Referer'] = config.general.host
}

const youtube = google.youtube({
  version: 'v3',
  auth: config.secret.YOUTUBE_API_KEY
})

async function getPlaylist (id) {
  const res = await youtube.playlists.list({
  	part: 'id,snippet',
  	id: id,
  	maxResults: '1',
  	headers: headers,
  })
  return res
}

async function findPlaylist (query) {
  const res = await youtube.search.list({
  	part: 'id,snippet',
  	type: 'playlist',
  	q: query,
  	maxResults: '10',
  	headers: headers,
  })
  return res
}

async function getPlaylistItem (id) {
  let allItems = []
  let res = await youtube.playlistItems.list({
  	part: 'snippet,status',
  	playlistId: id,
  	maxResults: 50,
  	headers: headers,
  })

  allItems = allItems.concat(res.data.items)

  while (res.data.nextPageToken) {
  	res = await youtube.playlistItems.list({
	    part: 'snippet,status',
	    playlistId: id,
	    maxResults: 50,
	    pageToken: res.data.nextPageToken,
	    headers: headers,
  	})
  	allItems = allItems.concat(res.data.items)
  }

  return allItems
}

module.exports = {
  getPlaylist,
  findPlaylist,
  getPlaylistItem
}
