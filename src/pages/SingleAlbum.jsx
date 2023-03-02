import { useParams } from "react-router-dom";
import RightSidebar from "../components/common/RightSidebar";
import Sidebar from "../components/common/Sidebar";
import SongList from "../components/common/SongList";
import { TopBanner } from "../components/singlePlaylist";
import { dummyAlbums, dummySongs } from "../data/dummyData";

const SingleAlbum = ({ closeDropdowns }) => {
  const { id } = useParams();
  const album = dummyAlbums.find((album) => Number(album.id) === Number(id));

  return (
    <div className="grid md:grid-cols-250-auto">
      <div>
        <Sidebar />
      </div>
      <div
        className="min-h-screen pb-6 bg-card-dark/60 backdrop-blur-md "
        onClick={closeDropdowns}
      >
        <TopBanner title={album.title} allowEditing={false} />

        <div className="px-4 lg:px-6  h-[300px] overflow-x-hidden overflow-y-auto">
          <SongList songs={dummySongs} />
        </div>
      </div>
      <div>
        <RightSidebar />
      </div>
    </div>
  );
};

export default SingleAlbum;
