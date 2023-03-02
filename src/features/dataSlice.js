import { createSlice } from "@reduxjs/toolkit";
import { dummyArtists } from "../data/dummyData";
// import { dummyPlaylists } from "../data/dummyData";

const playlistsFromLS = JSON.parse(localStorage.getItem("playlists")) || [];
const favoriteSongsFromLS =
  JSON.parse(localStorage.getItem("Spotify-favoriteSongs")) || [];
const favoriteArtistsFromLS =
  JSON.parse(localStorage.getItem("Spotify-favoriteArtists")) ||
  dummyArtists.slice(0, 8);

const initialState = {
  myPlaylists: [],
  playlists: playlistsFromLS,
  favoriteSongs: favoriteSongsFromLS,
  favoriteArtists: favoriteArtistsFromLS,
  loading: true,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    // Get playlists;
    getPlaylists: (state, action) => {
      state.myPlaylists = action.payload;
    },
    // Add playlists
    addPlaylist: (state, action) => {
      state.playlists = [...state.playlists, action.payload];
    },
    setIsLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Add a song to the playlist
    addToPlaylist: (state, action) => {
      state.playlists = state.playlists.map((playlist) => {
        if (playlist.id === action.payload.playlistId) {
          return {
            ...playlist,
            songs: [...playlist.songs, action.payload.song],
          };
        }
        return playlist;
      });
    },
    // Edit playlist
    editPlaylist: (state, action) => {
      state.playlists = state.playlists.map((playlist) => {
        if (playlist.id === action.payload.playlistId) {
          return {
            ...playlist,
            title: action.payload.title,
          };
        }
        return playlist;
      });
    },
    // Delete playlist
    deletePlaylist: (state, action) => {
      state.playlists = state.playlists.filter(
        (playlist) => playlist.id !== action.payload
      );
    },
    // Add Songs to favorite
    addToFavorite: (state, action) => {
      const favoriteSong = state.favoriteSongs.find(
        (song) => song.id === action.payload.id
      );
      if (favoriteSong) {
        state.favoriteSongs = state.favoriteSongs.filter(
          (song) => song.id !== action.payload.id
        );
      } else {
        state.favoriteSongs = [...state.favoriteSongs, action.payload];
      }
    },
    // Add artists to favorite
    addArtistToFavorite: (state, action) => {
      const favoriteArtist = state.favoriteArtists.find(
        (artist) => artist.id === action.payload.id
      );
      if (favoriteArtist) {
        state.favoriteArtists = state.favoriteArtists.filter(
          (artist) => artist.id !== action.payload.id
        );
      } else {
        state.favoriteArtists = [...state.favoriteArtists, action.payload];
      }
    },
  },
});

export default dataSlice.reducer;

export const dataStore = (state) => state.data;

export const {
  getPlaylists,
  setIsLoading,
  addPlaylist,
  addToPlaylist,
  editPlaylist,
  deletePlaylist,
  addToFavorite,
  addArtistToFavorite,
} = dataSlice.actions;
