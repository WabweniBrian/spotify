import { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ArtistList from "../components/artists/ArtistList";
import RightSidebar from "../components/common/RightSidebar";
import Sidebar from "../components/common/Sidebar";
import { dummyArtists } from "../data/dummyData";
import { dataStore } from "../features/dataSlice";

const Artists = ({ closeDropdowns }) => {
  const { favoriteArtists } = useSelector(dataStore);
  const [showLoadmoreBtn, setShowLoadmoreBtn] = useState(true);
  const [currentArtists, setcurrentArtists] = useState(12);
  const [artistName, setArtistName] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "Spotify-favoriteArtists",
      JSON.stringify(favoriteArtists)
    );
  }, [favoriteArtists]);

  // Controls the current artists
  useEffect(() => {
    if (currentArtists >= dummyArtists.length) setShowLoadmoreBtn(false);
  }, [currentArtists]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(artistName);
  };

  return (
    <div className="grid md:grid-cols-250-auto">
      <div>
        <Sidebar />
      </div>
      <div
        className="min-h-screen px-4  pb-6 lg:px-6 bg-card-dark/60 backdrop-blur-md"
        onClick={closeDropdowns}
      >
        <div className="mt-5 overflow-auto h-[90vh] hide-scrollbar">
          <form onSubmit={handleSearch}>
            <div className="relative max-w-[600px] mx-auto w-full mb-6">
              <BiSearchAlt className="absolute top-1/2 -translate-y-1/2 left-2 opacity-60" />
              <input
                type="text"
                className="w-full border-none outline-none bg-card-dark rounded-full px-4 py-2 pl-8"
                placeholder="Search for artists"
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
              />
            </div>
          </form>
          {favoriteArtists.length ? (
            <ArtistList artists={favoriteArtists} title="Your Artists" />
          ) : (
            <div className="h-[150px] flex-center-center flex-col py-4">
              <FiUsers className="text-4xl md:text-6xl opacity-40" />
              <h1 className="text-4xl font-bold opacity-40">No Artists</h1>
              <Link
                to="/artists"
                className="mt-4 px-3 py-1 bg-primary text-white rounded-full capitalize transition-a hover:bg-[#45d62b] flex-align-center gap-2 !opacity-100"
              >
                <BsPlus className="!opacity-100" />
                <span>Add Artists</span>
              </Link>
            </div>
          )}
          <div className="pt-3 border-t border-t-dark-light">
            <ArtistList
              artists={dummyArtists.slice(0, 10)}
              title="Popular Artists"
            />
          </div>
          <div className="pt-3 border-t border-t-dark-light">
            <ArtistList
              artists={dummyArtists.slice(0, currentArtists)}
              title="Suggested for you"
            />
            {showLoadmoreBtn && dummyArtists.length > 12 && (
              <div className="flex-center-center pb-8 md:pb-0">
                <button
                  className="rounded-full px-4 py-1 border border-primary text-primary"
                  onClick={() => setcurrentArtists(currentArtists + 12)}
                >
                  Load more
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <RightSidebar />
      </div>
    </div>
  );
};

export default Artists;
