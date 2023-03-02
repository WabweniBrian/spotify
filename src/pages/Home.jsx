import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useSelector } from "react-redux";
import ArtistList from "../components/artists/ArtistList";
import Playlists from "../components/common/MyPlaylists";
import RightSidebar from "../components/common/RightSidebar";
import Sidebar from "../components/common/Sidebar";
import Songs from "../components/common/Songs";
import { FavoriteArtists, RecentlyPlayed } from "../components/home";
import { dummyArtists } from "../data/dummyData";
import { dataStore } from "../features/dataSlice";

const Home = ({ closeDropdowns }) => {
  const artistContainer = useRef(null);
  const playlistContainer = useRef(null);
  const [showLoadmoreBtn, setShowLoadmoreBtn] = useState(true);
  const [currentArtists, setcurrentArtists] = useState(12);
  const { favoriteSongs } = useSelector(dataStore);
  const scrollContainer = (direction) => {
    direction === "right"
      ? (artistContainer.current.scrollLeft += 200)
      : (artistContainer.current.scrollLeft -= 200);
  };

  const scrollPlaylistContainer = (direction) => {
    direction === "right"
      ? (playlistContainer.current.scrollLeft += 200)
      : (playlistContainer.current.scrollLeft -= 200);
  };

  // Controls the current artists
  useEffect(() => {
    if (currentArtists >= dummyArtists.length) setShowLoadmoreBtn(false);
  }, [currentArtists]);

  return (
    <div className="grid md:grid-cols-250-auto">
      <div>
        <Sidebar />
      </div>
      <div
        className="h-screen px-4 lg:px-6 bg-card-dark/60 backdrop-blur-md overflow-auto hide-scrollbar pb-10"
        onClick={closeDropdowns}
      >
        <div className="mt-4">
          <div className="mt-2">
            <h1 className="font-semibold text-xl">Recently played</h1>
            <RecentlyPlayed />
          </div>
          <div className="mt-4">
            <div className="flex-center-between">
              <h1 className="font-semibold text-xl">Your Playlists</h1>
              <div className="flex-align-center">
                <motion.div
                  className="icon-box hover:bg-dark-light/60 sm:cursor-pointer transition-a text-green-500"
                  whileTap={{ scale: 0.6 }}
                  onClick={() => scrollPlaylistContainer("left")}
                >
                  <FiChevronLeft />
                </motion.div>
                <motion.div
                  className="icon-box hover:bg-dark-light/60 sm:cursor-pointer transition-a text-green-500"
                  whileTap={{ scale: 0.6 }}
                  onClick={() => scrollPlaylistContainer("right")}
                >
                  <FiChevronRight />
                </motion.div>
              </div>
            </div>
            <Playlists playlistContainer={playlistContainer} wrap={false} />
          </div>
          <div className="mt-4">
            <div className="flex-center-between">
              <h1 className="font-semibold text-xl">Your Artists</h1>
              <div className="flex-align-center">
                <motion.div
                  className="icon-box hover:bg-dark-light/60 sm:cursor-pointer transition-a text-green-500"
                  whileTap={{ scale: 0.6 }}
                  onClick={() => scrollContainer("left")}
                >
                  <FiChevronLeft />
                </motion.div>
                <motion.div
                  className="icon-box hover:bg-dark-light/60 sm:cursor-pointer transition-a text-green-500"
                  whileTap={{ scale: 0.6 }}
                  onClick={() => scrollContainer("right")}
                >
                  <FiChevronRight />
                </motion.div>
              </div>
            </div>
            <FavoriteArtists artistContainer={artistContainer} />
          </div>
          <div className="mt-6">
            <Songs
              currentSongsPerPage={5}
              title="Your Favorite Songs"
              songs={favoriteSongs}
            />
          </div>
          <div className="mt-2">
            <ArtistList
              artists={dummyArtists.slice(0, currentArtists)}
              title="Suggested for you"
            />
            {showLoadmoreBtn && dummyArtists.length > 12 && (
              <div className="flex-center-center pb-8 md:pb-0">
                <button
                  className="rounded-full px-4 py-1 border border-primary text-primary"
                  onClick={() => setcurrentArtists(currentArtists + 12)}
                >
                  Load more
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <RightSidebar />
      </div>
    </div>
  );
};

export default Home;
