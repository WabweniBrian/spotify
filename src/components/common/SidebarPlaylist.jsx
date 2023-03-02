/* eslint-disable react-hooks/exhaustive-deps */
import { BiPlus } from "react-icons/bi";
import { BsMusicNoteList } from "react-icons/bs";
import { FiChevronLeft, FiChevronRight, FiMoreVertical } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import Dropdown from "./DropDown";
import {
  openDeleteModal,
  openDropdown,
  openEditModal,
  showToast,
  togglePlaylist,
} from "../../features/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import PlaylistPopup from "./PlaylistPopup";
import { addPlaylist, dataStore } from "../../features/dataSlice";
import EditModal from "../EditModal";
import DeleteModal from "../DeleteModal";
import Tooltip from "./Tooltip";

const SidebarPlaylist = () => {
  const [showInput, setShowInput] = useState(false);
  const [playlistTitle, setPlaylistTitle] = useState("New Playlist");
  const [selectedId, setSelectedId] = useState(1676270905860);
  const [playlistEditTitle, setPlaylistEditTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [playlistsPerPage] = useState(3);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { playlists } = useSelector(dataStore);

  // Pagination
  const endIndex = currentPage * playlistsPerPage;
  const startIndex = endIndex - playlistsPerPage;
  const currentPlaylists = playlists.slice(startIndex, endIndex);
  const numberOfPages = Math.ceil(playlists.length / playlistsPerPage);

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
      navigate(`/playlists/${newPlaylist.id}`);
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

  // Handle The playlist options dropdown
  const handleDropDown = (id) => {
    setSelectedId(id);
    dispatch(openDropdown());
  };

  //--------- Save Playlist to local storage---------------------------------------------------------
  useEffect(() => {
    localStorage.setItem("playlists", JSON.stringify(playlists));
  }, [playlists]);

  // Controls the current playlists
  useEffect(() => {
    currentPage >= numberOfPages && setCurrentPage(numberOfPages);
    currentPage <= 0 && setCurrentPage(1);
  }, [numberOfPages]);

  // ------------------------------Editing & Deleting Playlist modals---------------------------------------------
  const playlistToEdit = playlists.find(
    (playlist) => playlist.id === selectedId
  );

  const handlePlaylist = (id) => {
    if (id === 4) {
      dispatch(openDeleteModal(selectedId));
    }
    if (id === 3) {
      dispatch(
        openEditModal({ id: playlistToEdit.id, title: playlistToEdit.title })
      );
      setPlaylistEditTitle(playlistToEdit.title);
    }
  };

  //----------------- Animations-------------------------------------------------------
  const containerVariant = {
    initial: {
      opacity: 0,
      x: 40,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        mass: 0.4,
        delay: 0,
        damping: 8,
        staggerChildren: 0.1,
      },
    },
    exit: {
      x: 40,
    },
  };
  const childVariants = {
    initial: {
      opacity: 0,
      x: 40,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  return (
    <div className="hidden px-4 pb-2 mt-3 select-none md:block">
      <div className="pb-2 border-b border-dark-light">
        <div className="flex-center-between text-slate-400">
          <p className="text-sm uppercase">playlists</p>
          <div className="flex-align-center gap-1">
            <div className="relative group">
              <motion.div
                className="icon-box hover:bg-dark-light/60 sm:cursor-pointer transition-a"
                whileTap={{ scale: 0.6 }}
                onClick={() => setShowInput(!showInput)}
              >
                <BiPlus />
              </motion.div>
              <Tooltip content="Add Playlist" />
            </div>
            <div
              className="!opacity-100 relative play-list"
              onClick={() => dispatch(togglePlaylist())}
            >
              <div className="relative group">
                <motion.div
                  className="icon-box hover:bg-dark-light/60 sm:cursor-pointer transition-a play-list"
                  whileTap={{ scale: 0.6 }}
                >
                  <BsMusicNoteList className="play-list" />
                </motion.div>
                <Tooltip content="All Playlists" />
              </div>
              <PlaylistPopup />
            </div>
            <div className="flex-align-center">
              <div className="relative group">
                <motion.div
                  className="icon-box hover:bg-dark-light/60 sm:cursor-pointer transition-a text-green-500"
                  whileTap={{ scale: 0.6 }}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  <FiChevronLeft />
                </motion.div>
                <Tooltip content="Previous" />
              </div>
              <div className="relative group">
                <motion.div
                  className="icon-box hover:bg-dark-light/60 sm:cursor-pointer transition-a text-green-500"
                  whileTap={{ scale: 0.6 }}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  <FiChevronRight />
                </motion.div>
                <Tooltip content="Next" />
              </div>
            </div>
          </div>
        </div>
        <div>
          {/* --------------Add Playlist Input ---------------- */}
          {showInput && (
            <motion.div
              className="hidden flex-align-center gap-x-3"
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
            >
              <span>
                <BsMusicNoteList />
              </span>
              <form onSubmit={handleAddPlaylist}>
                <input
                  type="text"
                  className="w-11/12 px-2 py-1 border-none outline-none bg-card-dark"
                  value={playlistTitle}
                  onChange={(e) => setPlaylistTitle(e.target.value)}
                  onClick={(e) => e.target.select()}
                />
              </form>
            </motion.div>
          )}
          <motion.div
            variants={containerVariant}
            initial="initial"
            animate="visible"
            exit="exit"
          >
            {playlists.length ? (
              <>
                {currentPlaylists.map(({ id, title }, i) => (
                  <motion.div
                    className="flex-center-between relative"
                    key={id}
                    variants={childVariants}
                  >
                    <NavLink
                      to={`/playlists/${id}`}
                      className="playlist flex-align-center gap-x-3 py-2 hover:text-white hover:!opacity-100 transition-a before:hidden"
                    >
                      <span>
                        <BsMusicNoteList />
                      </span>
                      <span>
                        {title.length > 15 ? `${title.slice(0, 15)}...` : title}
                      </span>
                    </NavLink>
                    <div className="relative group">
                      <motion.div
                        className="options icon-box hover:bg-dark-light/60 sm:cursor-pointer transition-a"
                        whileTap={{ scale: 0.6 }}
                        onClick={() => handleDropDown(id)}
                      >
                        <FiMoreVertical className="options" />
                      </motion.div>
                      <Tooltip content="Playlist options" postion="right" />
                    </div>
                    <Dropdown
                      selectedId={selectedId}
                      id={id}
                      index={i}
                      handlePlaylist={handlePlaylist}
                    />
                  </motion.div>
                ))}
              </>
            ) : (
              <>
                <div className="flex-center-center flex-col mt-5">
                  <BsMusicNoteList className="text-3xl opacity-60" />
                  <h1 className="text-2xl font-bold opacity-60">
                    No Playlists
                  </h1>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>

      {/* Modals */}
      <EditModal
        playlistEditTitle={playlistEditTitle}
        setPlaylistEditTitle={setPlaylistEditTitle}
        playlistToEdit={playlistToEdit}
      />
      <DeleteModal />
    </div>
  );
};

export default SidebarPlaylist;
