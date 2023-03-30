// services/spotify.js
const SpotifyWebApi = require('spotify-web-api-node');

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

const spotifyApi = new SpotifyWebApi({
  clientId,
  clientSecret,
});

module.exports = spotifyApi;
