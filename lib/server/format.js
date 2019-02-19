function formatPlaylistItems (items) {
    let newList = []
    items.forEach((video) => {
	let id = video.snippet.resourceId.videoId
	let thumbnail = video.snippet.thumbnails ? video.snippet.thumbnails.default.url : undefined
	let title = video.snippet.title
	let position = video.snippet.position

	if (video.status === undefined) {
	    return
	}

	newList.push({
	    id: id,
	    title: title,
	    thumbnail: thumbnail,
	    position: position,
	})
    })
    return newList
}

function formatPlaylistInfo (response) {
  var newList = []
  response.data.items.forEach((list) => {
  	let id = list.id.playlistId || list.id
  	let thumbnail = list.snippet.thumbnails.default.url
  	let channel = list.snippet.channelTitle
  	let title = list.snippet.title
  	newList.push({
	    id: id,
	    title: title,
	    thumbnail: thumbnail,
	    channel: channel
  	})
  })
  return newList
}


module.exports = {
  formatPlaylistItems,
  formatPlaylistInfo
}
