/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { dataStore } from "../../features/dataSlice";
import { hideToast, uiStore } from "../../features/uiSlice";

const Toast = () => {
  const { playlists, favoriteSongs, favoriteArtists } = useSelector(dataStore);
  const { toast } = useSelector(uiStore);

  const { showToast, content, classType, icon } = toast;

  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(hideToast());
    }, 3000);
    return () => clearTimeout(timeout);
  }, [playlists, favoriteArtists, favoriteSongs]);

  return (
    <div
      className={`toast p-3 bg-card-dark rounded-lg w-[300px] md:w-[400px] fixed left-1/2 -translate-x-1/2 -translate-y-32 text-center transition-a top-5  flex-center-between gap-3 px-4 z-[999] ${classType} ${
        showToast && "show"
      }`}
    >
      <div className="flex-align-center gap-x-2">
        <img src={icon} alt="" width={20} />
        {content}
      </div>
      <div className="icon-box" onClick={() => dispatch(hideToast())}>
        <FiX />
      </div>
    </div>
  );
};

export default Toast;
