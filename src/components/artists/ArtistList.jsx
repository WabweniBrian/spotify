import React from "react";
import ArtistCard from "./ArtistCard";
import { motion } from "framer-motion";

const ArtistList = ({ artists, title }) => {
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
    <div className="mb-4">
      <h1 className="font-bold text-2xl capitalize">{title}</h1>
      <motion.div
        variants={containerVariant}
        initial="initial"
        animate="visible"
        exit="exit"
      >
        <div className="mt-4 flex-align-center gap-4 flex-wrap">
          {artists.map((artist) => {
            return (
              <ArtistCard
                {...artist}
                key={artist.id}
                variants={childVariants}
              />
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default ArtistList;
