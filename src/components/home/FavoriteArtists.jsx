import { motion } from "framer-motion";
import { BsPlus } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { dataStore } from "../../features/dataSlice";
import ArtistCard from "../artists/ArtistCard";

const FavoriteArtists = ({ artistContainer }) => {
  const { favoriteArtists } = useSelector(dataStore);
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
  return favoriteArtists.length ? (
    <motion.div
      variants={containerVariant}
      initial="initial"
      animate="visible"
      exit="exit"
      className="relative"
    >
      <div
        className="mt-4 flex-align-center gap-4 overflow-auto scroll-smooth hide-scrollbar"
        ref={artistContainer}
      >
        {favoriteArtists.map((artist) => {
          return (
            <ArtistCard {...artist} key={artist.id} variants={childVariants} />
          );
        })}
      </div>
    </motion.div>
  ) : (
    <div className="h-[120px] flex-center-center flex-col">
      <FiUsers className="text-4xl md:text-6xl opacity-40" />
      <h1 className="text-4xl font-bold opacity-40">No Artists</h1>
      <Link
        to="/artists"
        className="mt-4 px-3 py-1 bg-primary text-white rounded-full capitalize transition-a hover:bg-[#45d62b] flex-align-center gap-2 !opacity-100"
      >
        <BsPlus className="!opacity-100" />
        <span>Add Artists</span>
      </Link>
    </div>
  );
};

export default FavoriteArtists;
