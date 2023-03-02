import { useEffect, useRef, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaSnapchat,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { FiClipboard } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { closeshareModal, uiStore } from "../features/uiSlice";
import { motion } from "framer-motion";

const ShareModal = () => {
  const { showShareModal } = useSelector(uiStore);
  const dispatch = useDispatch();
  const urlInput = useRef(null);
  const [showCopied, setShowCopied] = useState(false);

  const handleCloseModal = (e) => {
    if (e.target.classList.contains("modal")) dispatch(closeshareModal());
  };

  const handleCopyToClipboard = () => {
    let textarea = document.createElement("textarea");
    textarea.innerText = urlInput.current.value;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    setShowCopied(true);
    textarea.remove();
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowCopied(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [showCopied]);

  return (
    <div
      className={`modal fixed w-screen h-screen bg-black/50 top-0 left-0 z-[99] opacity-0 pointer-events-none transition-opacity duration-300 ${
        showShareModal && "!pointer-events-auto !opacity-100 flex-center-center"
      }`}
      onClick={handleCloseModal}
    >
      <div
        className={`max-w-[400px] w-[96%] bg-card-dark p-4 rounded-lg hidden text-center ${
          showShareModal && "!block"
        }`}
      >
        <h1>Share to your social accounts</h1>
        <div className="flex-center-center gap-x-3 mt-3">
          <div className="icon-box !w-9 !h-9 text-white hover:scale-125 transition-a !bg-blue-600 !opacity-100 sm:cursor-pointer">
            <FaFacebook />
          </div>
          <div className="icon-box !w-9 !h-9 text-white hover:scale-125 transition-a !bg-pink-600 !opacity-100 sm:cursor-pointer">
            <FaInstagram />
          </div>
          <div className="icon-box !w-9 !h-9 text-white hover:scale-125 transition-a !bg-cyan-500 !opacity-100 sm:cursor-pointer">
            <FaTwitter />
          </div>
          <div className="icon-box !w-9 !h-9 text-white hover:scale-125 transition-a !bg-yellow-500 !opacity-100 sm:cursor-pointer">
            <FaSnapchat />
          </div>
          <div className="icon-box !w-9 !h-9 text-white hover:scale-125 transition-a !bg-red-600 !opacity-100 sm:cursor-pointer">
            <FaYoutube />
          </div>
        </div>
        <div className="mt-5">
          <p>Song URL:</p>
          <div className="flex-center-between px-2 py-1 bg-dark-light w-full mt-2">
            <input
              type="text"
              className="w-full  border-none outline-none bg-transparent"
              value="https://spotify.com/without-you/W7ho87VeJK05"
              onChange={() => {}}
              onClick={(e) => e.target.select()}
              ref={urlInput}
            />
            <div
              className="icon-box hover:bg-hover-color-dark !rounded-sm sm:cursor-pointer relative"
              onClick={handleCopyToClipboard}
            >
              <FiClipboard />
              {showCopied && (
                <motion.div
                  className="absolute -top-8 -left-10 bg-primary text-white px-3 py-[2px]"
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Copied!
                </motion.div>
              )}
            </div>
          </div>
        </div>
        <div className="flex-align-center gap-2 justify-end mt-3">
          <button
            className="px-3 py-1 bg-dark-light hover:bg-[#3b3d4e]"
            onClick={() => dispatch(closeshareModal())}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
