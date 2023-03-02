import { useRef } from "react";
import { useState } from "react";
import { BsCamera, BsMusicNoteList, BsPlayFill } from "react-icons/bs";

const TopBanner = ({ title, allowEditing }) => {
  const [bannerImage, setBannerImage] = useState("");
  const [playlistImage, setPlaylistImage] = useState("");
  const bannerInput = useRef();
  const playlistInput = useRef();

  return (
    <div className="w-full h-[300px] relative">
      <input
        type="file"
        ref={bannerInput}
        onChange={(e) => setBannerImage(e.target.files[0])}
        hidden
      />
      <img
        src={
          bannerImage ? URL.createObjectURL(bannerImage) : "/images/migos.jpg"
        }
        alt=""
        className="w-full h-full object-cover"
      />
      {allowEditing && (
        <div
          className="icon-box !w-10 !h-10 absolute top-2 right-2 bg-card-dark hover:bg-hover-color-dark z-50"
          onClick={() => bannerInput.current.click()}
        >
          <BsCamera className="text-xl" />
        </div>
      )}
      <div className="absolute bottom-0 left-0 flex-center-between z-20 w-full px-3 md:px-10 py-6">
        <div className="flex-align-center flex-col sm:flex-row gap-3">
          <div className="self-start sm:self-auto relative">
            <input
              type="file"
              ref={playlistInput}
              onChange={(e) => setPlaylistImage(e.target.files[0])}
              hidden
            />
            <img
              src={
                playlistImage
                  ? URL.createObjectURL(playlistImage)
                  : "/images/migos-2.jpg"
              }
              alt=""
              className="w-10 h-10  sm:w-20 sm:h-20 object-cover rounded-md sm:rounded-lg"
            />
            {allowEditing && (
              <div
                className="icon-box !w-9 !h-9 absolute -bottom-1 -right-1 bg-card-dark hover:bg-hover-color-dark z-50"
                onClick={() => playlistInput.current.click()}
              >
                <BsCamera className="text-lg" />
              </div>
            )}
          </div>
          <div>
            <BsMusicNoteList className="text-3xl" />
            <h1 className="font-semibold text-2xl">
              {title?.length > 15 ? `${title?.slice(0, 15)}...` : title}
            </h1>
          </div>
        </div>
        <div>
          <button className="px-3 py-1 bg-primary text-white rounded-full capitalize transition-a hover:bg-[#45d62b] flex-align-center gap-2">
            <BsPlayFill />
            <span>play</span>
          </button>
        </div>
      </div>
      <div className="absolute h-full bottom-0 left-0 w-full bg-gradient-to-t from-main-dark to-transparent"></div>
    </div>
  );
};

export default TopBanner;
