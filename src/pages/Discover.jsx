import RightSidebar from "../components/common/RightSidebar";
import Sidebar from "../components/common/Sidebar";
import BannerInput from "../components/discover/BannerInput";
import PopularGenres from "../components/discover/PopularGenres";
import Suggested from "../components/discover/Suggested";

const Discover = ({ closeDropdowns }) => {
  return (
    <div className="grid md:grid-cols-250-auto">
      <div>
        <Sidebar />
      </div>
      <div
        className="h-screen bg-card-dark/60 backdrop-blur-md overflow-auto hide-scrollbar pb-10"
        onClick={closeDropdowns}
      >
        <BannerInput />
        <div className="px-4 lg:px-6">
          <PopularGenres />
          <Suggested />
        </div>
      </div>
      <div>
        <RightSidebar />
      </div>
    </div>
  );
};

export default Discover;
