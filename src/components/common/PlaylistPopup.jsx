import { useSelector } from "react-redux";
import { uiStore } from "../../features/uiSlice";
import { motion } from "framer-motion";
import { dataStore } from "../../features/dataSlice";
import { BsMusicNoteList } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const PlaylistPopup = () => {
  const { isPlaylistOpen } = useSelector(uiStore);
  const { playlists } = useSelector(dataStore);

  return (
    <>
      {isPlaylistOpen && (
        <motion.div
          className="dropdown absolute left-full bottom-0 mt-1 p-2 !rounded-xl w-64  bg-card-dark z-50 overflow-hidden"
          initial={{ scale: 0.6, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
        >
          {playlists.length ? (
            <div className="h-48 overflow-auto hide-scrollbar pb-10">
              {playlists.map(({ id, title }) => (
                <NavLink
                  to={`/playlists/${id}`}
                  key={id}
                  end
                  className="playlist !opacity-100 flex-align-center gap-x-3 py-2 hover:text-white transition-a before:hidden"
                >
                  <BsMusicNoteList />
                  <span>
                    {title.length > 20 ? `${title.slice(0, 20)}...` : title}
                  </span>
                </NavLink>
              ))}
            </div>
          ) : (
            <div className="flex-center-center flex-col mt-5">
              <BsMusicNoteList className="text-3xl opacity-60" />
              <h1 className="text-2xl font-bold opacity-60">No Playlists!</h1>
              <p>Start by creating some</p>
            </div>
          )}

          <div className="absolute w-full h-1/3 bottom-0 left-0 bg-gradient-to-t from-card-dark to-transparent"></div>
        </motion.div>
      )}
    </>
  );
};

export default PlaylistPopup;
