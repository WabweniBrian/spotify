import { BsMusicNoteList, BsPlus } from "react-icons/bs";
import { useParams } from "react-router-dom";
import RightSidebar from "../components/common/RightSidebar";
import Sidebar from "../components/common/Sidebar";
import { TopBanner } from "../components/singlePlaylist";
import { useSelector } from "react-redux";
import { dataStore } from "../features/dataSlice";
import SongList from "../components/common/SongList";

const SinglePlayList = ({ closeDropdowns }) => {
  const { id } = useParams();
  const { playlists } = useSelector(dataStore);
  const playlist = playlists.find(
    (playlist) => Number(playlist.id) === Number(id)
  );

  return (
    <div className="grid md:grid-cols-250-auto">
      <div>
        <Sidebar />
      </div>
      <div
        className="min-h-screen pb-6 bg-card-dark/60 backdrop-blur-md "
        onClick={closeDropdowns}
      >
        <TopBanner title={playlist?.title} allowEditing />
        {playlist?.songs.length ? (
          <div className="px-4 lg:px-6  h-[300px] overflow-x-hidden overflow-y-auto">
            <SongList songs={playlist?.songs} />
          </div>
        ) : (
          <div className="flex-center-center flex-col mt-20">
            <BsMusicNoteList className="text-4xl md:text-6xl opacity-40" />
            <h1 className="text-4xl font-bold opacity-40">No Songs</h1>
            <button className="mt-4 px-3 py-1 bg-primary text-white rounded-full capitalize transition-a hover:bg-[#45d62b] flex-align-center gap-2">
              <BsPlus className="!opacity-100" />
              <span>Add Songs</span>
            </button>
          </div>
        )}
      </div>
      <div>
        <RightSidebar />
      </div>
    </div>
  );
};

export default SinglePlayList;
