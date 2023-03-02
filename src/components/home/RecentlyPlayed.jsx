import { BsMusicNote, BsMusicNoteBeamed } from "react-icons/bs";
import { Link } from "react-router-dom";
import { dummySongs } from "../../data/dummyData";
import SongList from "../common/SongList";

const RecentlyPlayed = () => {
  return (
    <>
      {dummySongs.length ? (
        <SongList songs={dummySongs.slice(0, 3)} />
      ) : (
        <div className="flex-center-center flex-col mt-20">
          <BsMusicNoteBeamed className="text-4xl md:text-6xl opacity-40" />
          <h1 className="text-4xl font-bold opacity-40">No songs played</h1>
          <Link
            to="/discover"
            className="!opacity-100 mt-4 px-3 py-1 bg-primary text-white rounded-full capitalize transition-a hover:bg-[#45d62b] flex-align-center gap-2"
          >
            <BsMusicNote className="!opacity-100" />
            <span>Start Listening</span>
          </Link>
        </div>
      )}
    </>
  );
};

export default RecentlyPlayed;
