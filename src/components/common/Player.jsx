/* eslint-disable react-hooks/exhaustive-deps */
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BsDownload, BsHeart, BsHeartFill, BsShuffle } from "react-icons/bs";
import {
  FaBackward,
  FaForward,
  FaPause,
  FaPlay,
  FaStepBackward,
  FaStepForward,
} from "react-icons/fa";
import { FiRepeat } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { toggleSmallPlayer } from "../../features/uiSlice";
import Tooltip from "./Tooltip";
import Draggable from "react-draggable";

const Player = ({ closeDropdowns }) => {
  const [play, setPlay] = useState(false);
  const dispatch = useDispatch();
  const progressRef = useRef();
  const [songDuration] = useState(225);
  const [currentTime, setCurrentTime] = useState(112.5);
  const path = useLocation().pathname;
  const [isFavorite, setIsFavorite] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const nodeRef = useRef(null);

  const handleProgress = () => {
    progressRef.current.style.setProperty(
      "--progress",
      `${progressRef.current.value}%`
    );
    setCurrentTime((progressRef.current.value / 100) * songDuration);
  };

  const addZero = (time) => (time < 10 ? `0${time}` : time);
  const calculateTime = (durationInSeconds) => {
    const minutes = addZero(Math.floor(durationInSeconds / 60));
    const seconds = addZero(Math.floor(durationInSeconds % 60));
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    calculateTime(currentTime);
  }, []);

  return (
    path !== "/login" && (
      <Draggable nodeRef={nodeRef} onClick={() => dispatch(closeDropdowns())}>
        <div
          className="fixed bottom-0 w-[98%] sm:w-[77%] right-1 sm:right-16 bg-card-dark shadow-md p-2 sm:p-4 z-40 rounded shadow-primary/10 sm:cursor-pointer"
          onDoubleClick={() => dispatch(toggleSmallPlayer())}
          ref={nodeRef}
        >
          <div className="flex-align-center gap-4">
            <div className="hidden sm:block">
              <img
                src="/images/migos.jpg"
                alt=""
                className="w-16 h-16 rounded-xl object-cover"
              />
            </div>
            <div className=" w-full">
              <div className="mt-2">
                What's the Price - <span className="opacity-60">Migos</span>
              </div>
              <div className="flex-center-between mt-2 sm:mt-0">
                <div className="flex-align-center gap-2">
                  <div className="relative group">
                    <motion.div
                      className="icon-box hover:bg-dark-light/60 sm:cursor-pointer transition-a"
                      whileTap={{ scale: 0.6 }}
                      onClick={() => setIsFavorite(!isFavorite)}
                    >
                      {isFavorite ? (
                        <BsHeartFill className="text-primary" />
                      ) : (
                        <BsHeart />
                      )}
                    </motion.div>
                    <Tooltip
                      content={`${isFavorite ? "Remove" : "Add to favotites"}`}
                    />
                  </div>
                  <div className="relative group">
                    <motion.div
                      className="icon-box hover:bg-dark-light/60 sm:cursor-pointer transition-a"
                      whileTap={{ scale: 0.6 }}
                    >
                      <BsDownload />
                    </motion.div>
                    <Tooltip content="Download" />
                  </div>
                </div>
                <div className="flex-align-center gap-2">
                  <div className="relative group">
                    <motion.div
                      className="icon-box hover:bg-dark-light/60 sm:cursor-pointer transition-a"
                      whileTap={{ scale: 0.6 }}
                    >
                      <FaStepBackward />
                    </motion.div>
                    <Tooltip content="Previous" />
                  </div>
                  <div className="relative group">
                    <motion.div
                      className="icon-box hover:bg-dark-light/60 sm:cursor-pointer transition-a"
                      whileTap={{ scale: 0.6 }}
                    >
                      <FaBackward />
                    </motion.div>
                    <Tooltip content="Backward x2" />
                  </div>
                  <div className="relative group">
                    <motion.div
                      className="play-pause icon-box !h-10 !w-10 bg-gradient-to-tl from-slate-400 to-slate-200 text-slate-600 sm:cursor-pointer transition-a border-2 border-card-dark"
                      whileTap={{ scale: 0.6 }}
                      onClick={() => setPlay(!play)}
                    >
                      {play ? <FaPause /> : <FaPlay />}
                    </motion.div>
                    <Tooltip content={`${play ? "Pause" : "Play"}`} />
                  </div>
                  <div className="relative group">
                    <motion.div
                      className="icon-box hover:bg-dark-light/60 sm:cursor-pointer transition-a"
                      whileTap={{ scale: 0.6 }}
                    >
                      <FaForward />
                    </motion.div>
                    <Tooltip content="Forward x2" />
                  </div>
                  <div className="relative group">
                    <motion.div
                      className="icon-box hover:bg-dark-light/60 sm:cursor-pointer transition-a"
                      whileTap={{ scale: 0.6 }}
                    >
                      <FaStepForward />
                      <Tooltip content="Next" />
                    </motion.div>
                  </div>
                </div>
                <div className="flex-align-center gap-2">
                  <div className="relative group">
                    <motion.div
                      className="icon-box hover:bg-dark-light/60 sm:cursor-pointer transition-a"
                      whileTap={{ scale: 0.6 }}
                      onClick={() => setShuffle(!shuffle)}
                    >
                      <BsShuffle className={`${shuffle && "text-primary"}`} />
                    </motion.div>
                    <Tooltip
                      content={`${shuffle ? "Shuffle (on)" : "Shuffle (off)"}`}
                    />
                  </div>
                  <div className="relative group">
                    <motion.div
                      className="icon-box hover:bg-dark-light/60 sm:cursor-pointer transition-a"
                      whileTap={{ scale: 0.6 }}
                      onClick={() => setRepeat(!repeat)}
                    >
                      <FiRepeat className={`${repeat && "text-primary"}`} />
                    </motion.div>
                    <Tooltip
                      content={`${repeat ? "Repeat (on)" : "Repeat (off)"}`}
                      postion="left"
                    />
                  </div>
                </div>
              </div>

              <div className="flex-center-between gap-6 mt-3">
                <p>{calculateTime(currentTime)}</p>
                <input
                  type="range"
                  name=""
                  id=""
                  className="range w-full duration"
                  onChange={handleProgress}
                  ref={progressRef}
                />
                <p>{calculateTime(songDuration)}</p>
              </div>
            </div>
          </div>
        </div>
      </Draggable>
    )
  );
};

export default Player;
