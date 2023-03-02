import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
import AddToPlaylistModal from "./components/common/AddToPlaylistModal";
import BackToTopButton from "./components/common/BackToTopButton";
import Loader from "./components/common/Loader";
import Player from "./components/common/Player";
import SmallerPlayer from "./components/common/SmallerPlayer";
import Toast from "./components/common/Toast";
import ShareModal from "./components/ShareModal";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import {
  closeDropdown,
  closeMusicList,
  closePlaylist,
  closeProfileDropdown,
  closeSongDropdown,
  closeThemeMenu,
  uiStore,
} from "./features/uiSlice";

import {
  Home,
  Login,
  Albums,
  Artists,
  Discover,
  Podcasts,
  Radio,
  SinglePlayList,
  PageNotFound,
  Settings,
  Profile,
  Favorites,
  Playlists,
  SingleArtist,
  SingleAlbum,
} from "./pages";
function App() {
  const [showButton, setShowButton] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const { theme, showSmallPlayer } = useSelector(uiStore);
  const dispatch = useDispatch();
  const route = useLocation();

  // Show/Hide scroll to top button
  window.addEventListener("scroll", () => {
    window.scrollY > 500 ? setShowButton(true) : setShowButton(false);
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  // Loader when page is loading
  window.addEventListener("load", () => {
    setShowLoader(false);
  });

  const closeDropdowns = (e) => {
    dispatch(closeDropdown());
    dispatch(closeMusicList());
    dispatch(closePlaylist());
    dispatch(closeThemeMenu());
    dispatch(closeProfileDropdown());
    if (!e.target.classList.contains("song-options"))
      dispatch(closeSongDropdown());
  };

  //NProgress
  useEffect(() => {
    NProgress.start();
    NProgress.done();
  }, [route]);

  return (
    <>
      {showLoader && <Loader />}
      <AddToPlaylistModal />
      <ShareModal />
      <Toast />
      <div className={`${theme.imageID === 2 && "!text-slate-200"}`}>
        <div
          className={`bg-image ${theme.imageID === 1 && "!grayscale"}`}
          style={{ background: `url('${theme.image}')` }}
        ></div>
        <div className="min-h-screen">
          <Routes>
            <Route
              path="/"
              element={<Home closeDropdowns={closeDropdowns} />}
            />
            <Route
              path="/discover"
              element={<Discover closeDropdowns={closeDropdowns} />}
            />
            <Route
              path="/radio"
              element={<Radio closeDropdowns={closeDropdowns} />}
            />
            <Route
              path="/artists"
              element={<Artists closeDropdowns={closeDropdowns} />}
            />
            <Route
              path="/albums"
              element={<Albums closeDropdowns={closeDropdowns} />}
            />
            <Route
              path="/podcasts"
              element={<Podcasts closeDropdowns={closeDropdowns} />}
            />
            <Route
              path="/playlists/:id"
              element={<SinglePlayList closeDropdowns={closeDropdowns} />}
            />
            <Route
              path="/settings"
              element={<Settings closeDropdowns={closeDropdowns} />}
            />
            <Route
              path="/profile"
              element={<Profile closeDropdowns={closeDropdowns} />}
            />
            <Route
              path="/favorites"
              element={<Favorites closeDropdowns={closeDropdowns} />}
            />
            <Route
              path="/playlists"
              element={<Playlists closeDropdowns={closeDropdowns} />}
            />
            <Route
              path="/artists/:id"
              element={<SingleArtist closeDropdowns={closeDropdowns} />}
            />
            <Route
              path="/albums/:id"
              element={<SingleAlbum closeDropdowns={closeDropdowns} />}
            />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <BackToTopButton showButton={showButton} />
        {showSmallPlayer ? (
          <SmallerPlayer closeDropdowns={closeDropdowns} />
        ) : (
          <Player closeDropdowns={closeDropdowns} />
        )}
      </div>
    </>
  );
}

export default App;
