import { useSelector } from "react-redux";
import { uiStore } from "../../features/uiSlice";
import { motion } from "framer-motion";
import { profileOptions } from "../../data/profileOptions";
import { NavLink } from "react-router-dom";

const ProfileDropdown = ({ selectedId, id, index }) => {
  const { isProfileDropdownOpen } = useSelector(uiStore);

  return (
    <>
      {isProfileDropdownOpen && selectedId === id && (
        <motion.div
          className="dropdown absolute right-full bottom-0 mt-1 p-2 !rounded-xl w-52  bg-card-dark z-50"
          initial={{ scale: 0.6, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
        >
          {profileOptions.map(({ id, title, icon, url }) => (
            <NavLink
              to={url}
              end
              key={id}
              className="!opacity-100 flex-align-center gap-x-3 py-2 hover:text-white transition-a before:hidden"
            >
              {icon}
              <span className="text-muted">{title}</span>
            </NavLink>
          ))}
        </motion.div>
      )}
    </>
  );
};

export default ProfileDropdown;
