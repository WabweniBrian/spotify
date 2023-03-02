import { NavLink } from "react-router-dom";
import { links } from "../../data/links";
import { motion } from "framer-motion";
import Tooltip from "./Tooltip";

const SidebarLinks = () => {
  return (
    <motion.div
      className="mt-4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      {links.map(({ id, title, url, icon }) => (
        <div className="relative group" key={id}>
          <NavLink
            to={url}
            end
            className="sidebar-link group flex-align-center gap-x-3 px-4 py-4 md:py-[7px] hover:text-white hover:!opacity-100 transition-a"
          >
            <span className="text-xl md:text-base">{icon}</span>
            <span className="hidden md:block">{title}</span>
          </NavLink>
          <Tooltip content={title} postion="right" hidden={true} />
        </div>
      ))}
    </motion.div>
  );
};

export default SidebarLinks;
