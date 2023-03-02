import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BsMusicNoteBeamed, BsPlus } from "react-icons/bs";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import SongList from "./SongList";

const Songs = ({ currentSongsPerPage, title, songs }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [songsPerPage] = useState(currentSongsPerPage);

  // Pagination
  const endIndex = currentPage * songsPerPage;
  const startIndex = endIndex - songsPerPage;
  const currentSongs = songs.slice(startIndex, endIndex);
  const numberOfPages = Math.ceil(songs.length / songsPerPage);

  // Controls the current playlists
  useEffect(() => {
    currentPage >= numberOfPages && setCurrentPage(numberOfPages);
    currentPage <= 0 && setCurrentPage(1);
  }, [currentPage, numberOfPages]);

  return (
    <div>
      {/* ------------------ */}
      <div className="mt-4 flex-center-between">
        <h1 className="flex-align-center flex-col sm:flex-row gap-x-3">
          <span className="font-bold text-2xl capitalize">{title}</span>{" "}
          <span className="text-muted self-start sm:self-auto">
            {songs.length} {songs.length === 1 ? "Song" : "Songs"}
          </span>
        </h1>
        <div className="flex-align-center self-start md:self-auto">
          <motion.div
            className="icon-box hover:bg-dark-light/60 sm:cursor-pointer transition-a text-green-500"
            whileTap={{ scale: 0.6 }}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <FiChevronLeft />
          </motion.div>
          <motion.div
            className="icon-box hover:bg-dark-light/60 sm:cursor-pointer transition-a text-green-500"
            whileTap={{ scale: 0.6 }}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <FiChevronRight />
          </motion.div>
        </div>
      </div>
      {songs.length ? (
        <div className="h-[380px] overflow-x-hidden overflow-y-auto">
          <SongList songs={currentSongs} />
        </div>
      ) : (
        <div className="flex-center-center flex-col mt-20">
          <BsMusicNoteBeamed className="text-4xl md:text-6xl opacity-40" />
          <h1 className="text-4xl font-bold opacity-40">No favorite Songs</h1>
          <Link
            to="/discover"
            className="!opacity-100 mt-4 px-3 py-1 bg-primary text-white rounded-full capitalize transition-a hover:bg-[#45d62b] flex-align-center gap-2"
          >
            <BsPlus className="!opacity-100" />
            <span>Add Songs</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Songs;
