const { getPlaylist, findPlaylist } = require('./request')
const { formatPlaylistItems, formatPlaylistInfo } = require('./format')

function extractPlaylistId (url) {
  try {
  	const myURL = new URL(url)

  	if (myURL.host !== 'www.youtube.com' && myURL.host !== 'youtube.com') {
  	    return undefined
  	}

  	const playlistId = myURL.searchParams.get('list')

  	if (playlistId.length !== 34) {
      return undefined
  	}

  	return playlistId
  } catch(err) {
	   return undefined
  }
}

async function search (query) {
  let searchResults = {
  	id_result: undefined,
  	keyword_result: undefined
  }

  // try to get playlist ID
  let playlistId = undefined
  if (query.length === 34) {
  	playlistId = query
  } else {
  	playlistId = extractPlaylistId(query)
  }

  // do playlist id search
  if (playlistId !== undefined) {
  	searchResults['id_result'] = formatPlaylistInfo(await getPlaylist(playlistId))
  }

  // do keyword search
  searchResults['keyword_result'] = formatPlaylistInfo(await findPlaylist(query))

  // return json results
  return searchResults
}

module.exports = search
