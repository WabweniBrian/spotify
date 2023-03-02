import { useState } from "react";
import { BsMusicNoteList, BsPlus } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  addPlaylist,
  addToPlaylist,
  dataStore,
} from "../../features/dataSlice";
import {
  closeAddToPlaylistModal,
  showToast,
  uiStore,
} from "../../features/uiSlice";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AddToPlaylistModal = () => {
  const { modal } = useSelector(uiStore);
  const { playlists } = useSelector(dataStore);
  const [showInput, setShowInput] = useState(false);
  const [selected, setSelected] = useState("");
  const [playlistTitle, setPlaylistTitle] = useState("New Playlist");
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          content: "Playlist created, hit save button",
          classType: "success",
          icon: "/icons/check-circle.svg",
        })
      );
      setSelected(newPlaylist.id);
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

  const handleAdd = (playlistId) => {
    const playlist = playlists.find((pl) => pl.id === playlistId);
    const songInPlaylist = playlist.songs.find(
      (song) => song.id === modal.song.id
    );

    if (songInPlaylist) {
      dispatch(
        showToast({
          content: "Song already in that playlist",
          classType: "danger",
          icon: "/icons/x-circle.svg",
        })
      );
      return;
    } else {
      dispatch(addToPlaylist({ playlistId, song: modal.song }));
      dispatch(
        showToast({
          content: "Song added to this playlist",
          classType: "success",
          icon: "/icons/check-circle.svg",
        })
      );
      setSelected("");
      dispatch(closeAddToPlaylistModal());
      navigate(`/playlists/${playlistId}`);
    }
  };

  const handleCancelAdding = (e) => {
    dispatch(closeAddToPlaylistModal());
    setSelected("");
    setShowInput(false);
  };

  const handleCloseModal = (e) => {
    if (e.target.classList.contains("modal")) {
      dispatch(closeAddToPlaylistModal());
      setSelected("");
      setShowInput(false);
    }
  };

  return (
    <div
      className={`modal fixed w-full h-full bg-black/50 top-0 left-0 z-[99] opacity-0 pointer-events-none transition-opacity duration-300 ${
        modal.showAddToPlaylistModal &&
        "!pointer-events-auto !opacity-100 flex-center-center"
      }`}
      onClick={handleCloseModal}
    >
      <div
        className={`max-w-[400px] w-[96%] bg-card-dark p-4 rounded-lg hidden ${
          modal.showAddToPlaylistModal && "!block"
        }`}
      >
        <h1 className="text-xl font-semibold pb-2 border-b border-dark-light">
          Select/add your playlist
        </h1>
        <div className="relative mt-3">
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
          {playlists.length ? (
            <>
              <div className="h-48 overflow-auto hide-scrollbar pb-16 mt-4">
                {playlists.map(({ id, title }) => (
                  <div
                    to={`/playlists/${id}`}
                    key={id}
                    className={`playlist !opacity-100 flex-align-center gap-x-3 py-2 hover:text-white transition-a before:hidden cursor-default sm:cursor-pointer ${
                      selected === id && "!text-primary"
                    }`}
                    onClick={() => setSelected(id)}
                  >
                    <BsMusicNoteList />
                    <span>
                      {title.length > 20 ? `${title.slice(0, 20)}...` : title}
                    </span>
                  </div>
                ))}
              </div>
              <div className="absolute w-full h-1/3 bottom-0 left-0 bg-gradient-to-t from-card-dark to-transparent flex items-end justify-end gap-x-3 ">
                <button
                  className="px-3 py-1 bg-dark-light hover:bg-[#3b3d4e]"
                  onClick={handleCancelAdding}
                >
                  Cancel
                </button>
                <button
                  className={`px-3 py-1 bg-primary text-white hover:bg-[#45d62b] ${
                    !selected && "opacity-60"
                  }`}
                  disabled={!selected}
                  onClick={() => handleAdd(selected)}
                >
                  Save
                </button>
              </div>
            </>
          ) : (
            <div className="flex-center-center flex-col mt-5">
              <BsMusicNoteList className="text-3xl opacity-60" />
              <h1 className="text-2xl font-bold opacity-60">No Playlists!</h1>
              <p>Start by creating one</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddToPlaylistModal;
