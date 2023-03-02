import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { GiPlug } from "react-icons/gi";

const BannerInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="h-[100px]">
      <div className="relative h-full w-full">
        <img
          src="/images/halsey (2).jpg"
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute bg-black/50 w-full h-full top-0 left-0 flex-center-center">
          <h1 className="capitalize text-2xl md:text-3xl font-semibold">
            discover new songs
          </h1>
        </div>
      </div>
      <div className="relative h-10 rounded-full bg-dark-light/80 backdrop-blur-md overflow-hidden max-w-[600px] mx-auto -mt-5">
        <BiSearchAlt className="absolute top-1/2 -translate-y-1/2 left-2" />
        <form onSubmit={handleSearch} className="w-full h-full">
          <input
            type="text"
            placeholder="What do you want to listen to?"
            className="border-none outline-none h-full w-full bg-inherit px-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <GiPlug className="absolute top-1/2 -translate-y-1/2 right-2" />
      </div>
    </div>
  );
};

export default BannerInput;
