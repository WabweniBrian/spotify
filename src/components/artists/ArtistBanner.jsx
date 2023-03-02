import { useState } from "react";
import { BsCheck, BsPlayFill, BsPlus } from "react-icons/bs";
import { GiHeadphones } from "react-icons/gi";

const ArtistBanner = ({ title }) => {
  const [following, setFollowing] = useState(true);
  return (
    <div className="w-full h-[300px] relative">
      <img
        src="/images/halsey (1).jpg"
        alt=""
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 flex items-end justify-between sm:flex-center-between z-20 w-full px-3 md:px-10 py-6">
        <div className="flex-align-center gap-3 flex-col sm:flex-row">
          <div className="self-start">
            <img
              src="/images/halsey (3).jpg"
              alt=""
              className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-full"
            />
          </div>
          <div>
            <p className="uppercase">artist</p>
            <div className="flex-align-center gap-2">
              <h1 className="font-bold text-3xl">
                Halsey
                {/* {title.length > 15 ? `${title.slice(0, 15)}...` : title} */}
              </h1>
              <div className="icon-box !w-6 !h-6 text-white bg-blue-500">
                <BsCheck />
              </div>
            </div>
            <div className="flex-align-center sm:gap-2 flex-col sm:flex-row">
              <div className="flex-align-center gap-2 self-start">
                <GiHeadphones />
                <h1>22,564,342</h1>
              </div>
              <p className="opacity-60">monthly Listeners</p>
            </div>
          </div>
        </div>
        <div className="flex-align-center gap-x-2">
          <button className="p-2 sm:px-3 sm:py-1  bg-primary text-white rounded-full capitalize transition-a hover:bg-[#45d62b] flex-align-center gap-2">
            <BsPlayFill />
            <span className="hidden sm:block">play</span>
          </button>
          <button
            className="p-2 sm:px-3 sm:py-1  bg-transparent text-white rounded-full capitalize transition-a border border-primary flex-align-center gap-2"
            onClick={() => setFollowing(!following)}
          >
            {following ? (
              <BsCheck className="!opacity-100 text-primary" />
            ) : (
              <BsPlus className="!opacity-100" />
            )}
            <span className="hidden sm:block">
              {following ? (
                <span className="text-primary">Following</span>
              ) : (
                "Follow"
              )}
            </span>
          </button>
        </div>
      </div>
      <div className="absolute h-full bottom-0 left-0 w-full bg-gradient-to-t from-main-dark to-transparent"></div>
    </div>
  );
};

export default ArtistBanner;
