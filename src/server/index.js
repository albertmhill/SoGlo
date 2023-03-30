// server/index.js
const express = require('express');
const cors = require('cors');
const spotifyApi = require('../services/spotify');

const app = express();
app.use(cors());

app.get('/login', (req, res) => {
  const scopes = 'user-read-private user-read-email';
  const redirectUri = 'http://localhost:3000/callback';
  const state = 'react-milkdrop-spotify';
  const showDialog = true;

  const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state, showDialog);
  res.redirect(authorizeURL);
});

app.get('/callback', async (req, res) => {
  const { code } = req.query;
  try {
    const data = await spotifyApi.authorizationCodeGrant(code);
    const { access_token, refresh_token } = data.body;
    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);

    res.redirect('http://localhost:3000');
  } catch (err) {
    console.log('Error getting tokens:', err);
    res.redirect('/#/error/invalid_token');
  }
});

app.listen(4000, () => {
  console.log('Authentication server is running on port 4000');
});
