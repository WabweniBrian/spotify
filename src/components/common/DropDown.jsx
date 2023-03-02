import { useSelector } from "react-redux";
import { uiStore } from "../../features/uiSlice";
import { motion } from "framer-motion";
import { playListOptions } from "../../data/playlistOptions";
import { Link } from "react-router-dom";

const Dropdown = ({ selectedId, id, index, handlePlaylist }) => {
  const { isDropdownOpen } = useSelector(uiStore);

  return (
    <>
      {isDropdownOpen && selectedId === id && (
        <motion.div
          className={`dropdown absolute left-full  mt-1 p-2 !rounded-xl w-52  bg-card-dark z-50 ${
            index > 1 ? "bottom-0" : "top-0"
          }`}
          initial={{ scale: 0.6, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
        >
          {playListOptions.map(({ id, title, icon }) =>
            id === 2 ? (
              <Link
                key={id}
                to="/discover"
                className="!opacity-100 p-2 space-x-3 rounded-lg flex-align-center sm:cursor-pointer dark:bg-card-dark hover:!text-white transition-a"
                onClick={() => handlePlaylist(id)}
              >
                {icon}
                <span className="text-muted">{title}</span>
              </Link>
            ) : (
              <div
                key={id}
                className="p-2 space-x-3 rounded-lg flex-align-center sm:cursor-pointer dark:bg-card-dark hover:!text-white transition-a"
                onClick={() => handlePlaylist(id)}
              >
                {icon}
                <span className="text-muted">{title}</span>
              </div>
            )
          )}
        </motion.div>
      )}
    </>
  );
};

export default Dropdown;
