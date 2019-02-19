const fetch = require('isomorphic-unfetch')

function checkStatus(response) {
  if (response.ok) {
    return response.json()
  } else {
    throw new Error(res.statusText)
  }
}

function playlistGet(base, id, callback) {
  fetch(`${base}/api/playlist/get?id=${id}`)
    .then( response => checkStatus(response) )
    .then(
      data => callback(data),
      err => console.log(err)
    )
}

function playlistSearch(base, query, callback) {
  fetch(`${base}/api/playlist/search?search_query=${query}`)
    .then( response => checkStatus(response) )
    .then(
      data => callback(data),
      err => console.log(err)
    )
}

module.exports = {
  playlistGet,
  playlistSearch
}
