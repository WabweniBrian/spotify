import { useSelector } from "react-redux";
import RightSidebar from "../components/common/RightSidebar";
import Sidebar from "../components/common/Sidebar";
import Songs from "../components/common/Songs";
import { Artists } from "../components/favorites";
import { dataStore } from "../features/dataSlice";

const Favotites = ({ closeDropdowns }) => {
  const { favoriteSongs } = useSelector(dataStore);

  return (
    <div className="grid md:grid-cols-250-auto">
      <div>
        <Sidebar />
      </div>
      <div
        className="h-screen px-4 lg:px-6 bg-card-dark/60 backdrop-blur-md overflow-auto hide-scrollbar pb-10"
        onClick={closeDropdowns}
      >
        <h1 className="text-2xl font-semibold pb-3 border-b border-b-dark-light">
          Favorites
        </h1>
        <Artists />
        <Songs
          currentSongsPerPage={6}
          title="Your Favorite Songs"
          songs={favoriteSongs}
        />
      </div>
      <div>
        <RightSidebar />
      </div>
    </div>
  );
};

export default Favotites;
