
// import React, { useState, useRef } from 'react';
// import './App.css';
// import MilkdropVisualizer from './components/MilkdropVisualizer';
// import spotifyApi from './services/spotify';

// const App = () => {
//   const [tracks, setTracks] = useState([]);
//   const [currentTrack, setCurrentTrack] = useState(null);
//   const audioRef = useRef(null);

//   const searchTracks = async (query) => {
//     try {
//       const { body } = await spotifyApi.searchTracks(query);
//       setTracks(body.tracks.items);
//     } catch (error) {
//       console.error('Error searching tracks:', error);
//     }
//   };

//   const playTrack = (track) => {
//     setCurrentTrack(track);
//     audioRef.current.src = track.preview_url;
//     audioRef.current.play();
//   };

//   return (
//     <div className="App">
//       <h1>Milkdrop Spotify Visualizer</h1>
//     <a href="http://localhost:4000/login" className="login-button">
//       Login with Spotify
//     </a>
//       <input
//         type="text"
//         placeholder="Search for a track"
//         onChange={(e) => searchTracks(e.target.value)}
//       />
//       <div className="track-list">
//         {tracks.map((track) => (
//           <div
//             key={track.id}
//             className="track"
//             onClick={() => playTrack(track)}
//           >
//             {track.name} - {track.artists[0].name}
//           </div>
//         ))}
//       </div>
//       <MilkdropVisualizer audioElement={audioRef.current} />
//       <audio ref={audioRef} />
//     </div>
//   );
// };

// export default App;
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import MilkdropVisualizer from './components/MilkdropVisualizer';
import SpotifyWebApi from 'spotify-web-api-js';
import dotenv from 'dotenv';

dotenv.config(); // Load .env variables

const spotifyApi = new SpotifyWebApi();

const App = () => {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    // Authenticate with Spotify API
    const authenticate = async () => {
      const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.REACT_APP_SPOTIFY_CLIENT_ID}:${process.env.REACT_APP_SPOTIFY_CLIENT_SECRET}`
          ).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: {
          grant_type: 'client_credentials',
        },
        json: true,
      };

      try {
        const response = await fetch(authOptions.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams(authOptions.form),
        });
        const { access_token } = await response.json();
        spotifyApi.setAccessToken(access_token);
      } catch (error) {
        console.error('Error authenticating with Spotify:', error);
      }
    };
    authenticate();
  }, []);

  const searchTracks = async (query) => {
    try {
      const { body } = await spotifyApi.searchTracks(query);
      setTracks(body.tracks.items);
    } catch (error) {
      console.error('Error searching tracks:', error);
    }
  };

  const playTrack = (track) => {
    setCurrentTrack(track);
    audioRef.current.src = track.preview_url;
    audioRef.current.play();
  };

  return (
    <div className="App">
      <h1>Milkdrop Spotify Visualizer</h1>
      <input
        type="text"
        placeholder="Search for a track"
        onChange={(e) => searchTracks(e.target.value)}
      />
      <div className="track-list">
        {tracks.map((track) => (
          <div
            key={track.id}
            className="track"
            onClick={() => playTrack(track)}
          >
            {track.name} - {track.artists[0].name}
          </div>
        ))}
      </div>
      <MilkdropVisualizer audioElement={audioRef.current} />
      <audio ref={audioRef} />
    </div>
  );
};

export default App;
