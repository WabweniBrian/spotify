import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AlbumList = ({ albums, albumContainer }) => {
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

  return (
    <motion.div
      className="flex-align-center gap-x-4 mt-3 overflow-auto scroll-smooth hide-scrollbar"
      variants={containerVariant}
      initial="initial"
      animate="visible"
      exit="exit"
      ref={albumContainer}
    >
      {albums.map(({ id, title, artist, number_of_songs, image }) => (
        <Link to={`/albums/${id}`} className="!opacity-100" key={id}>
          <motion.div
            className="h-[200px] overflow-hidden rounded-lg group relative flex-shrink-0 w-[300px]"
            variants={childVariants}
          >
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover group-hover:scale-125 transition-a"
            />
            <div className="absolute w-full h-full top-0 left-0 bg-black/50 flex-center-center">
              <div>
                <h1 className="font-semibold text-2xl">{title}</h1>
                <p>By {artist}</p>
                <h1>
                  <span className="font-semibold text-3xl mt-2">
                    {number_of_songs}
                  </span>
                  <span>Songs</span>
                </h1>
              </div>
            </div>
          </motion.div>
        </Link>
      ))}
    </motion.div>
  );
};

export default AlbumList;
