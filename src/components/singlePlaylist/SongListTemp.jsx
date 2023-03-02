import { BsClock, BsHeart, BsHeartFill, BsPlayFill } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import { GiHeadphones } from "react-icons/gi";
import { motion } from "framer-motion";
import { openSongDropdown, showToast } from "../../features/uiSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorite, dataStore } from "../../features/dataSlice";
import SongDropdown from "../common/SongDropdown";
import Tooltip from "../common/Tooltip";

const SongListTemp = ({ songs }) => {
  const [selectedId, setSelectedId] = useState(1);
  const { favoriteSongs } = useSelector(dataStore);
  const dispatch = useDispatch();

  // Handle The playlist options dropdown
  const handleDropDown = (id) => {
    setSelectedId(id);
    dispatch(openSongDropdown());
  };

  useEffect(() => {
    localStorage.setItem(
      "Spotify-favoriteSongs",
      JSON.stringify(favoriteSongs)
    );
  }, [favoriteSongs]);

  // Animations
  const containerVariant = {
    initial: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        mass: 0.4,
        delay: 0,
        damping: 8,
        staggerChildren: 0.05,
      },
    },
    exit: {
      y: 40,
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

  const addZero = (time) => (time < 10 ? `0${time}` : time);
  const calculateDuration = (durationInMillSeconds) => {
    const minutes = addZero(Math.floor(durationInMillSeconds / 60 / 1000));
    const seconds = addZero(Math.floor((durationInMillSeconds % 60) / 1000));
    return `${minutes}:${seconds}`;
  };

  return (
    <motion.div
      className="mt-5  w-full"
      variants={containerVariant}
      initial="initial"
      animate="visible"
      exit="exit"
    >
      {songs.map((song, i) => {
        const { id, name, duration_ms, artists } = song?.track;
        let ids = [...new Set(favoriteSongs.map((fav) => fav.id))];
        let isFavorite = ids.includes(id) ? true : false;

        return (
          <motion.div
            key={id}
            className="player flex-center-between sm:cursor-pointer py-3 hover:!text-white transition-a border-b border-b-hover-color-dark md:hover:bg-gradient-to-tl from-card-dark to-transparent gap-x-3 sm:gap-x-6"
            variants={childVariants}
          >
            <div className="flex-align-center gap-3 flex-shrink-0">
              <div>
                <BsPlayFill />
              </div>
              <div className="hidden sm:block">
                <img
                  src="/images/migos-4.jpg"
                  alt=""
                  className="w-10 h-10 object-cover rounded-lg transition-a"
                />
              </div>
              <div className="flex-align-center gap-x-2 md:gap-x-4">
                <h1 className="hidden sm:block">
                  {name.length > 15 ? `${name.slice(0, 15)}...` : name}
                </h1>
                <h1 className="sm:hidden text-sm">
                  {name.length > 10 ? `${name.slice(0, 10)}...` : name}
                </h1>
                <p className="hidden sm:block text-sm">
                  {artists[0]?.name.length > 20
                    ? `${artists[0]?.name.slice(0, 20)}...`
                    : artists[0]?.name}
                </p>
                <p className="sm:hidden text-sm">
                  {artists.length > 10
                    ? `${artists[0]?.name.slice(0, 10)}...`
                    : artists[0]?.name}
                </p>
              </div>
            </div>
            <div className="flex-align-center gap-x-2 sm:gap-x-6 flex-shrink-0">
              <div className="hidden lg:flex-align-center gap-2 ">
                <div>
                  <GiHeadphones />
                </div>
                <p>990,478,382</p>
              </div>
              <div className="hidden md:flex-align-center gap-2">
                <div>
                  <BsClock />
                </div>
                <p>{calculateDuration(duration_ms)}</p>
              </div>
              <motion.div
                className="icon-box hover:bg-dark-light/60 sm:cursor-pointer transition-a"
                whileTap={{ scale: 0.6 }}
                onClick={() => {
                  dispatch(addToFavorite({ ...song }));
                  isFavorite
                    ? dispatch(
                        showToast({
                          content: "Song removed from favorites",
                          classType: "danger",
                          icon: "/icons/x-circle.svg",
                        })
                      )
                    : dispatch(
                        showToast({
                          content: "Song added to favorites",
                          classType: "success",
                          icon: "/icons/check-circle.svg",
                        })
                      );
                }}
              >
                {isFavorite ? (
                  <BsHeartFill className="text-primary" />
                ) : (
                  <BsHeart />
                )}
              </motion.div>
              <div className="relative song-options">
                <div className="relative group">
                  <motion.div
                    className="icon-box hover:bg-dark-light/60 sm:cursor-pointer transition-a song-options"
                    whileTap={{ scale: 0.6 }}
                    onClick={() => handleDropDown(id)}
                  >
                    <FiMoreHorizontal className="song-options" />
                  </motion.div>
                  <Tooltip content="Song Options" postion="left" />
                </div>
                <SongDropdown
                  selectedId={selectedId}
                  id={song.id}
                  index={i}
                  song={song}
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default SongListTemp;
