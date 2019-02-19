try {
    secret = require('../../config/secret.json')
} catch(e) {
    if (process.env.YOUTUBE_API_KEY === undefined) {
	throw e
    }

    secret = {
	YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY
    }
}

try {
    general = require('../config/general.json')
} catch {
    general = { host: process.env.host }
}

module.exports.general = general
module.exports.secret = secret
