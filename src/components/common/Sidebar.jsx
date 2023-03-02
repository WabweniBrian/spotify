import { FaSpotify } from "react-icons/fa";
import { FiMenu, FiMoreHorizontal } from "react-icons/fi";
import { Link } from "react-router-dom";
import SidebarLinks from "./SidebarLinks";
import SidebarPlaying from "./SidebarPlaying";
import SidebarPlaylist from "./SidebarPlaylist";
import SidebarSearchInput from "./SidebarSearchInput";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  closeDropdown,
  closeMusicList,
  closePlaylist,
  closeProfileDropdown,
  closeSongDropdown,
  closeThemeMenu,
  toggleLeftSidebar,
  uiStore,
} from "../../features/uiSlice";
import Tooltip from "./Tooltip";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { isLeftSidebarOpen } = useSelector(uiStore);

  const handleCloseDropdown = (e) => {
    if (!e.target.classList.contains("options")) dispatch(closeDropdown());
    if (!e.target.classList.contains("music-list")) dispatch(closeMusicList());
    if (!e.target.classList.contains("play-list")) dispatch(closePlaylist());
    dispatch(closeThemeMenu());
    dispatch(closeProfileDropdown());
    dispatch(closeSongDropdown());
  };

  return (
    <div
      className={`fixed top-0 left-0 w-[64px] md:w-[250px] z-[60] h-screen  bg-card-dark/60 backdrop-blur-[10px] transition-a border-r border-r-dark-light  -translate-x-full md:translate-x-0 ${
        isLeftSidebarOpen && "!-translate-x-0"
      }`}
      onClick={handleCloseDropdown}
    >
      <div className="flex-center-between text-white p-4">
        <Link to="/" className="!opacity-100 flex-align-center gap-x-2">
          <div>
            <FaSpotify className="text-3xl md:text-2xl !opacity-100" />
          </div>
          <h1 className="hidden md:block">
            <span className="font-bold text-xl font-rubik">Spotify</span>
            <sup>&trade;</sup>
          </h1>
        </Link>
        <div className="hidden md:block relative group">
          <motion.div
            className="icon-box hover:bg-dark-light/60 sm:cursor-pointer transition-a !opacity-100"
            whileTap={{ scale: 0.6 }}
          >
            <FiMoreHorizontal />
          </motion.div>
          <Tooltip content="Menu" postion="right" />
        </div>
      </div>
      <SidebarSearchInput />
      <SidebarLinks />
      <SidebarPlaylist />
      <SidebarPlaying />
      <div
        className="absolute bg-primary w-8 h-8 rounded-lg top-2 left-full grid place-items-center text-white rotate-45 sm:cursor-pointer md:hidden"
        onClick={() => dispatch(toggleLeftSidebar())}
      >
        <FiMenu className="!opacity-100 -rotate-45" />
      </div>
    </div>
  );
};

export default Sidebar;
