import { motion } from "framer-motion";
import { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import AlbumList from "./AlbumList";

const AlbumsInfo = ({ title, albums }) => {
  const albumContainer = useRef(null);
  const scrollAlbumContainer = (direction) => {
    direction === "right"
      ? (albumContainer.current.scrollLeft += 200)
      : (albumContainer.current.scrollLeft -= 200);
  };

  return (
    <div className="mt-4 mb-10">
      <div className="flex-center-between">
        <h1 className="font-semibold text-xl">{title}</h1>
        <div className="flex-align-center">
          <motion.div
            className="icon-box hover:bg-dark-light/60 sm:cursor-pointer transition-a text-green-500"
            whileTap={{ scale: 0.6 }}
            onClick={() => scrollAlbumContainer("left")}
          >
            <FiChevronLeft />
          </motion.div>
          <motion.div
            className="icon-box hover:bg-dark-light/60 sm:cursor-pointer transition-a text-green-500"
            whileTap={{ scale: 0.6 }}
            onClick={() => scrollAlbumContainer("right")}
          >
            <FiChevronRight />
          </motion.div>
        </div>
      </div>
      <AlbumList albums={albums} albumContainer={albumContainer} />
    </div>
  );
};

export default AlbumsInfo;
