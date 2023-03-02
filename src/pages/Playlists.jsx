import { motion } from "framer-motion";
import { useState } from "react";
import { BsPlus } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import MyPlaylists from "../components/common/MyPlaylists";
import RightSidebar from "../components/common/RightSidebar";
import Sidebar from "../components/common/Sidebar";
import { addPlaylist, dataStore } from "../features/dataSlice";
import { showToast } from "../features/uiSlice";

const Playlists = ({ closeDropdowns }) => {
  const { playlists } = useSelector(dataStore);
  const [showInput, setShowInput] = useState(false);
  const [playlistTitle, setPlaylistTitle] = useState("New Playlist");

  const dispatch = useDispatch();
  //----------------------------- Adding playlist--------------------------------------------
  const handleAddPlaylist = (e) => {
    e.preventDefault();
    const newPlaylist = {
      id: new Date().getTime().toString(),
      title: playlistTitle,
      songs: [],
    };
    const playListTitles = playlists.map((playlist) => playlist.title);
    if (playListTitles.includes(playlistTitle)) {
      dispatch(
        showToast({
          content: "Playlist already exists",
          classType: "danger",
          icon: "/icons/x-circle.svg",
        })
      );
      return;
    }
    if (playlistTitle) {
      dispatch(addPlaylist(newPlaylist));
      dispatch(
        showToast({
          content: "Playlist created",
          classType: "success",
          icon: "/icons/check-circle.svg",
        })
      );
      setShowInput(false);
      setPlaylistTitle("New Playlist");
    } else {
      dispatch(
        showToast({
          content: "cannot create playlist without a title",
          classType: "danger",
          icon: "/icons/x-circle.svg",
        })
      );
    }
  };

  return (
    <div className="grid md:grid-cols-250-auto">
      <div>
        <Sidebar />
      </div>
      <div
        className="h-screen px-4 lg:px-6 bg-card-dark/60 backdrop-blur-md overflow-auto hide-scrollbar pb-10"
        onClick={closeDropdowns}
      >
        <div className="max-w-[500px] w-full mx-auto mt-8">
          <motion.button
            className="w-full py-[8px] flex-center-center gap-x-2 bg-dark-light hover:bg-[#3b3d4e]"
            whileTap={{ scale: 0.6 }}
            onClick={() => setShowInput(!showInput)}
          >
            <BsPlus />
            <span>Add playlist</span>
          </motion.button>
          {/* --------------Add Playlist Input ---------------- */}
          {showInput && (
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
            >
              <form onSubmit={handleAddPlaylist}>
                <input
                  type="text"
                  className="w-full px-2 py-[8px] border-none outline-none bg-dark-light mt-3"
                  value={playlistTitle}
                  onChange={(e) => setPlaylistTitle(e.target.value)}
                  onClick={(e) => e.target.select()}
                />
              </form>
            </motion.div>
          )}
        </div>
        <div className="mt-4">
          <div className="flex-center-between">
            <h1 className="font-semibold text-xl">Your Playlists</h1>
          </div>
          <MyPlaylists wrap={true} />
        </div>
      </div>
      <div>
        <RightSidebar />
      </div>
    </div>
  );
};

export default Playlists;
