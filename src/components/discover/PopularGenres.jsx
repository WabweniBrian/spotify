import { dummyGenres } from "../../data/dummyData";
import { motion } from "framer-motion";
import { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const PopularGenres = () => {
  const genreContainer = useRef(null);
  const scrollGenreContainer = (direction) => {
    direction === "right"
      ? (genreContainer.current.scrollLeft += 200)
      : (genreContainer.current.scrollLeft -= 200);
  };
  return (
    <div className="mt-6">
      <div className="flex-center-between">
        <h1 className="font-semibold text-xl">Browse by genre</h1>
        <div className="flex-align-center">
          <motion.div
            className="icon-box hover:bg-dark-light/60 sm:cursor-pointer transition-a text-green-500"
            whileTap={{ scale: 0.6 }}
            onClick={() => scrollGenreContainer("left")}
          >
            <FiChevronLeft />
          </motion.div>
          <motion.div
            className="icon-box hover:bg-dark-light/60 sm:cursor-pointer transition-a text-green-500"
            whileTap={{ scale: 0.6 }}
            onClick={() => scrollGenreContainer("right")}
          >
            <FiChevronRight />
          </motion.div>
        </div>
      </div>
      <div
        className="flex-align-center gap-4 overflow-auto mt-4 scroll-smooth hide-scrollbar"
        ref={genreContainer}
      >
        {dummyGenres.map(({ id, title, bg }) => (
          <div
            className={`h-[80px] flex-shrink-0 w-[200px] ${bg} rounded-lg flex-center-center text-white sm:cursor-pointer`}
            key={id}
          >
            <h1>{title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularGenres;
