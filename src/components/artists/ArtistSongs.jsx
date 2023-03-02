import { dummySongs } from "../../data/dummyData";
import Songs from "../common/Songs";

const ArtistSongs = () => {
  return (
    <div className="px-4 lg:px-6">
      <Songs currentSongsPerPage={6} title="All Songs" songs={dummySongs} />
    </div>
  );
};

export default ArtistSongs;
