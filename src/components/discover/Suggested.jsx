import { dummySongs } from "../../data/dummyData";
import SongList from "../common/SongList";

const Suggested = () => {
  return (
    <div className="mt-10">
      <h1 className="font-semibold text-2xl capitalize">Songs you may like</h1>
      <SongList songs={dummySongs.slice(0, 4)} />
    </div>
  );
};

export default Suggested;
