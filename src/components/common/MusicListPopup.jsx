import { useSelector } from "react-redux";
import { uiStore } from "../../features/uiSlice";
import { motion } from "framer-motion";
import { dummySongs } from "../../data/dummyData";
import { BsPause, BsPlay } from "react-icons/bs";
import { useState } from "react";

const MusicListPopup = () => {
  const { isMusicListOpen } = useSelector(uiStore);
  const [songId, setSongId] = useState(1);
  const [playing, setplaying] = useState(false);

  const handlePlay = (id) => {
    setplaying(!playing);
    setSongId(id);
  };

  return (
    <>
      {isMusicListOpen && (
        <motion.div
          className="dropdown absolute left-full bottom-0 mt-1 p-2 !rounded-xl w-72  bg-card-dark z-50"
          initial={{ scale: 0.6, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
        >
          <div className=" h-64 overflow-auto hide-scrollbar pb-16">
            {dummySongs.map(({ id, title, artist }) => (
              <div
                key={id}
                className={`playlist flex-align-center gap-x-3 py-2 hover:text-white hover:!opacity-100 transition-a before:hidden sm:cursor-pointer ${
                  songId === id && playing && "!text-primary !opacity-100"
                }`}
                onClick={() => handlePlay(id)}
              >
                {songId === id && playing ? <BsPause /> : <BsPlay />}
                <span>
                  {title.length > 20 ? `${title.slice(0, 20)}...` : title}
                </span>
                <span className="opacity-60 text-sm">By {artist}</span>
              </div>
            ))}
          </div>
          <div className="absolute w-full h-1/3 bottom-0 left-0 bg-gradient-to-t from-card-dark to-transparent"></div>
        </motion.div>
      )}
    </>
  );
};

export default MusicListPopup;
