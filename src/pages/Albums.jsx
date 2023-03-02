import RightSidebar from "../components/common/RightSidebar";
import Sidebar from "../components/common/Sidebar";
import AlbumsInfo from "../components/albums/AlbumsInfo";
import { dummyAlbums } from "../data/dummyData";

const Albums = ({ closeDropdowns }) => {
  return (
    <div className="grid md:grid-cols-250-auto">
      <div>
        <Sidebar />
      </div>
      <div
        className="h-screen px-4 lg:px-6 bg-card-dark/60 backdrop-blur-md overflow-auto hide-scrollbar pb-10"
        onClick={closeDropdowns}
      >
        <AlbumsInfo title="Popular Albums" albums={dummyAlbums.slice(0, 8)} />

        <AlbumsInfo
          title="Suggested for you"
          albums={dummyAlbums.slice(5, dummyAlbums.length)}
        />
      </div>
      <div>
        <RightSidebar />
      </div>
    </div>
  );
};

export default Albums;
