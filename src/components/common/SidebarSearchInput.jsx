import { BiSearchAlt } from "react-icons/bi";
import { GiPlug } from "react-icons/gi";

const SidebarSearchInput = () => {
  return (
    <div className="px-4 hidden md:block">
      <div className="relative h-10 rounded-full bg-dark-light/60 overflow-hidden">
        <BiSearchAlt className="absolute top-1/2 -translate-y-1/2 left-2" />
        <input
          type="text"
          placeholder="Search for songs"
          className="border-none outline-none w-full h-full bg-inherit px-8"
        />
        <GiPlug className="absolute top-1/2 -translate-y-1/2 right-2" />
      </div>
    </div>
  );
};

export default SidebarSearchInput;
