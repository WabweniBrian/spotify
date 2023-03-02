import { motion } from "framer-motion";
import { BsMusicNoteList, BsPlus, BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { dataStore } from "../../features/dataSlice";
import { openDeleteModal } from "../../features/uiSlice";
import Tooltip from "./Tooltip";

const MyPlaylists = ({ playlistContainer, wrap }) => {
  const { playlists } = useSelector(dataStore);
  const dispatch = useDispatch();
  // Animations
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
        staggerChildren: 0.05,
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

  return playlists.length ? (
    <motion.div
      className={`flex-align-center gap-x-4 mt-3 overflow-auto scroll-smooth hide-scrollbar ${
        wrap && "flex-wrap gap-4"
      }`}
      variants={containerVariant}
      initial="initial"
      animate="visible"
      exit="exit"
      ref={playlistContainer}
    >
      {playlists.map(({ id, title }) => (
        <div className="playlist-box relative" key={id}>
          <Link to={`/playlists/${id}`} className="!opacity-100">
            <motion.div
              className=" h-[100px] overflow-hidden rounded-lg relative flex-shrink-0 w-[200px]"
              variants={childVariants}
            >
              <img
                src="/images/migos.jpg"
                alt=""
                className="w-full h-full object-cover group-hover:scale-125 transition-a"
              />
              <div className="absolute w-full h-full top-0 left-0 bg-black/50 flex-center-center">
                <div>
                  <h1 className="font-semibold">{title}</h1>
                </div>
              </div>
            </motion.div>
          </Link>
          {wrap && (
            <div className="absolute  top-2 right-2  group">
              <div
                className="icon-box bg-primary !hidden text-white"
                onClick={() => dispatch(openDeleteModal(id))}
              >
                <BsTrash />
              </div>
              <Tooltip content="Delete playlist" postion="left" />
            </div>
          )}
        </div>
      ))}
    </motion.div>
  ) : (
    <div
      className={`${
        wrap ? "h-[80vh]" : "h-[120px"
      } flex-center-center flex-col`}
    >
      <BsMusicNoteList className="text-4xl md:text-6xl opacity-40" />
      <h1 className="text-4xl font-bold opacity-40">No Playlists</h1>
      <Link
        to="/playlists"
        className="mt-4 px-3 py-1 bg-primary text-white rounded-full capitalize transition-a hover:bg-[#45d62b] flex-align-center gap-2 !opacity-100"
      >
        <BsPlus className="!opacity-100" />
        <span>Add Playlists</span>
      </Link>
    </div>
  );
};

export default MyPlaylists;
