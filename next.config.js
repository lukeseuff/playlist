module.exports = {
  publicRuntimeConfig: {
    clientCredentials: process.env.FIREBASE_CLIENT_CREDENTIALS ? JSON.parse(process.env.FIREBASE_CLIENT_CREDENTIALS) : undefined
  }
}
