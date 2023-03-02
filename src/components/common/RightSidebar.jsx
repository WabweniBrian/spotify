import React from "react";
import { BiBell } from "react-icons/bi";
import { BsHeart } from "react-icons/bs";
import { FaCrown } from "react-icons/fa";
import { GiCog } from "react-icons/gi";
import { motion } from "framer-motion";
import { FiChrome, FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  closeDropdown,
  closeMusicList,
  closePlaylist,
  closeProfileDropdown,
  closeSongDropdown,
  closeThemeMenu,
  toggleProfileDropdown,
  toggleSidebar,
  toggleThemeMenu,
  uiStore,
} from "../../features/uiSlice";
import ThemeMenu from "./ThemeMenu";
import ProfileDropdown from "./ProfileDropdown";
import Tooltip from "./Tooltip";
import { userStore } from "../../features/authSlice";

const RightSidebar = () => {
  const { isSidebarOpen } = useSelector(uiStore);
  const { user } = useSelector(userStore);
  const dispatch = useDispatch();

  const handleCloseDropdown = (e) => {
    dispatch(closeDropdown());
    dispatch(closeMusicList());
    dispatch(closePlaylist());
    dispatch(closeSongDropdown());
    if (!e.target.classList.contains("theme-options"))
      dispatch(closeThemeMenu());
    if (!e.target.classList.contains("profile"))
      dispatch(closeProfileDropdown());
  };

  return (
    <div
      className={`select-none fixed px-2 pb-20 sm:pb-4 py-4 top-0 right-0 w-[64px] h-screen bg-card-dark/60 backdrop-blur-[10px] transition-a flex-center-between flex-col z-[60] translate-x-full md:translate-x-0 border-l border-l-dark-light ${
        isSidebarOpen && "!translate-x-0"
      }`}
      onClick={handleCloseDropdown}
    >
      <div>
        <div className="text-center text-lg">
          <FaCrown className="mx-auto" />
          <h1 className="text-sm mt-1">
            <span className="text-muted">Go</span>{" "}
            <span className="text-slate-100">Pro</span>
          </h1>
        </div>
        <div className="relative group">
          <motion.div
            className="mt-2 relative icon-box hover:bg-dark-light/60 sm:cursor-pointer transition-a"
            whileTap={{ scale: 0.6 }}
          >
            <BiBell />
            <div className="absolute top-2 right-2 w-[6px] h-[6px] rounded-full bg-primary notification-btn" />
          </motion.div>
          <Tooltip content="Notifications" postion="left" />
        </div>
        <div className="relative group">
          <Link to="/favorites" className="!opacity-100">
            <motion.div
              className="mt-2 icon-box hover:bg-dark-light/60 sm:cursor-pointer transition-a"
              whileTap={{ scale: 0.6 }}
            >
              <BsHeart />
            </motion.div>
          </Link>
          <Tooltip content="Favorites" postion="left" />
        </div>
      </div>
      <div>
        <div
          className="relative theme-options"
          onClick={() => dispatch(toggleThemeMenu())}
        >
          <div className="relative group">
            <motion.div
              className="icon-box hover:bg-dark-light/60 sm:cursor-pointer transition-a theme-options"
              whileTap={{ scale: 0.6 }}
            >
              <FiChrome className="theme-options" />
            </motion.div>
            <Tooltip content="Theme Settings" postion="left" />
          </div>
          <ThemeMenu />
        </div>
        <div className="relative group">
          <motion.div
            className="mt-2 icon-box hover:bg-dark-light/60 sm:cursor-pointer transition-a"
            whileTap={{ scale: 0.6 }}
          >
            <Link to="/settings" className="!opacity-100">
              <GiCog />
            </Link>
          </motion.div>
          <Tooltip content="Settings" postion="left" />
        </div>
        <div
          className="relative profile"
          onClick={() => dispatch(toggleProfileDropdown())}
        >
          <motion.div className="mt-3" whileTap={{ scale: 0.6 }}>
            <div className="relative group">
              <img
                src={user?.images[0]?.url || "/images/avatar.png"}
                alt=""
                className="profile w-7 h-7 rounded-full sm:cursor-pointer"
              />
              <Tooltip content="Profile Menu" postion="left" />
            </div>
          </motion.div>
          <ProfileDropdown />
        </div>
      </div>
      <div
        className="absolute bg-primary w-8 h-8 rounded-lg top-2 right-full grid place-items-center text-white rotate-45 sm:cursor-pointer md:hidden"
        onClick={() => dispatch(toggleSidebar())}
      >
        <FiMenu className="!opacity-100 -rotate-45" />
      </div>
    </div>
  );
};

export default RightSidebar;
