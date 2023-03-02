import { useRef } from "react";
import { BsMusicNoteList, BsVolumeMute, BsVolumeUp } from "react-icons/bs";
import { FiMonitor } from "react-icons/fi";
import { GiCompactDisc } from "react-icons/gi";
import { motion } from "framer-motion";
import { useState } from "react";
import MusicListPopup from "./MusicListPopup";
import { toggleMusicList } from "../../features/uiSlice";
import { useDispatch } from "react-redux";
import Tooltip from "./Tooltip";

const SidebarPlaying = () => {
  const dispatch = useDispatch();
  const [volume, setVolume] = useState(50);
  const title = "Future album title ghdfe";
  const progressRef = useRef();

  const handleProgress = () => {
    progressRef.current.style.setProperty(
      "--volume",
      `${progressRef.current.value}%`
    );
    setVolume(progressRef.current.value);
    progressRef.current.value === 0 && console.log(progressRef.current.value);
  };

  const handleVolume = () => {
    if (volume === 0) {
      setVolume(progressRef.current.value);
      progressRef.current.style.setProperty(
        "--volume",
        `${progressRef.current.value}%`
      );
    } else {
      setVolume(0);
      progressRef.current.style.setProperty("--volume", `${0}%`);
    }
  };

  return (
    <div className="px-4 mt-2 hidden md:block">
      <div className="flex-align-center gap-x-2">
        <div>
          <GiCompactDisc />
        </div>
        <div className="flex-align-center gap-x-5">
          <h1> {title.length > 12 ? `${title.slice(0, 12)}...` : title}</h1>
          <p className="text-sm relative before:absolute before:w-1 before:h-1 before:rounded-full before:bg-slate-300 before:-left-2 before:top-1/2 before:-translate-y-1/2">
            The Migos
          </p>
        </div>
      </div>
      <div className="flex-align-center gap-x-1">
        <div className="relative group">
          <motion.div
            className="icon-box hover:bg-dark-light/60 sm:cursor-pointer transition-a"
            whileTap={{ scale: 0.6 }}
            onClick={handleVolume}
          >
            {volume === 0 ? <BsVolumeMute /> : <BsVolumeUp />}
          </motion.div>
          <Tooltip content="Volume" postion="right" />
        </div>
        <div className="w-1/2">
          <input
            type="range"
            className="range volume w-full"
            onChange={handleProgress}
            ref={progressRef}
          />
        </div>

        <div
          className="music-list relative music-list"
          onClick={() => dispatch(toggleMusicList())}
        >
          <div className="relative group">
            <motion.div
              className="icon-box hover:bg-dark-light/60 sm:cursor-pointer transition-a relative music-list"
              whileTap={{ scale: 0.6 }}
            >
              <BsMusicNoteList className="music-list" />
            </motion.div>
            <Tooltip content="Songs Paying" />
          </div>
          <MusicListPopup />
        </div>
        <motion.div
          className="icon-box hover:bg-dark-light/60 sm:cursor-pointer transition-a"
          whileTap={{ scale: 0.6 }}
        >
          <FiMonitor />
        </motion.div>
      </div>
    </div>
  );
};

export default SidebarPlaying;
