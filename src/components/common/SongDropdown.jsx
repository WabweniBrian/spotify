import { useDispatch, useSelector } from "react-redux";
import {
  openAddToPlaylistModal,
  openshareModal,
  uiStore,
} from "../../features/uiSlice";
import { motion } from "framer-motion";
import { songOptions } from "../../data/songOptions";

const SongDropdown = ({ selectedId, id, index, song }) => {
  const { isSongDropdownOpen } = useSelector(uiStore);
  const dispatch = useDispatch();

  const handleAddToPlaylist = (id) => {
    if (id === 2) {
      dispatch(openAddToPlaylistModal(song));
    }
    if (id === 3) {
      dispatch(openshareModal());
    }
  };

  return (
    <>
      {isSongDropdownOpen && selectedId === id && (
        <motion.div
          className={`dropdown absolute right-full  mt-1 p-2 !rounded-xl w-52  bg-card-dark z-50 ${
            index > 1 ? "bottom-0" : "top-0"
          }`}
          initial={{ scale: 0.6, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
        >
          {songOptions.map(({ id, title, icon }) => (
            <div
              key={id}
              className="p-2 space-x-3 rounded-lg flex-align-center cursor-default sm:cursor-pointer dark:bg-card-dark hover:!text-white transition-a"
              onClick={() => handleAddToPlaylist(id)}
            >
              {icon}
              <span className="text-muted">{title}</span>
            </div>
          ))}
        </motion.div>
      )}
    </>
  );
};

export default SongDropdown;
