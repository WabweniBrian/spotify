const baseUrl = "https://api.spotify.com";
const redirectUrl = "http://localhost:3000/";
const clientID = "0424ff8b68fa436da977cce88d7f9846";
const secretID = process.env.SPOTIFY_CLIENT_SECRET;

// These scopes allow user to have access to the specified fields
const scopes = [
  "user-read-recently-played",
  "user-read-currently-playing",
  "playlist-modify-public",
];

// Get login url
export const getLoginUrl = () =>
  `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectUrl}&scope=${encodeURIComponent(
    scopes.join(" ")
  )}&response_type=token`;

//Get access token;
export const getAccessTokenFromURL = () => {
  const params = new URLSearchParams(window.location.hash.substring(1));
  return params.get("access_token");
};

// ENDPOINTS
// getGenre
// getPlaylists
// getplaylistTracks
// addPlaylist
// getGenrePlaylists
// addTrackToPlaylist
// getArtists
// getArtist
// getArtistTracks
// getAlbums
// getArtistAlbums
