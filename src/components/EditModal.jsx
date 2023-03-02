import { useDispatch, useSelector } from "react-redux";
import { closeEditModal, showToast, uiStore } from "../features/uiSlice";
import { dataStore, editPlaylist } from "../features/dataSlice";

const EditModal = ({
  playlistEditTitle,
  setPlaylistEditTitle,
  playlistToEdit,
}) => {
  const { editmodal } = useSelector(uiStore);
  const dispatch = useDispatch();
  const { playlists } = useSelector(dataStore);

  const handleCloseModal = (e) => {
    if (e.target.classList.contains("modal")) dispatch(closeEditModal());
  };

  // --------------------Handle Editing playlist---------------------------------------------------
  const handleEdit = () => {
    const playLists = playlists.filter(
      (playlist) => playlist.id !== playlistToEdit.id
    );

    const playListTitles = playLists.map((playlist) => playlist.title);

    if (playListTitles.includes(playlistEditTitle)) {
      dispatch(
        showToast({
          content: "Playlist already exists",
          classType: "danger",
          icon: "/icons/x-circle.svg",
        })
      );
      return;
    }

    if (playlistEditTitle) {
      dispatch(
        editPlaylist({
          playlistId: editmodal?.id,
          title: playlistEditTitle,
        })
      );
      dispatch(
        showToast({
          content: "Playlist title updated",
          classType: "success",
          icon: "/icons/check-circle.svg",
        })
      );
      dispatch(closeEditModal());
    }
  };

  return (
    <div
      className={`modal fixed w-screen h-screen bg-black/50 top-0 left-0 z-[99] opacity-0 pointer-events-none transition-opacity duration-300 ${
        editmodal.showEditModal &&
        "!pointer-events-auto !opacity-100 flex-center-center"
      }`}
      onClick={handleCloseModal}
    >
      <div
        className={`max-w-[400px] w-[96%] bg-card-dark p-4 rounded-lg hidden text-center ${
          editmodal.showEditModal && "!block"
        }`}
      >
        <div className="py-3">
          <h1 className="text-lg">Enter playlist name!</h1>
        </div>

        <input
          type="text"
          className="border-none outline-none bg-dark-light w-full px-4 py-2"
          value={playlistEditTitle}
          onChange={(e) => setPlaylistEditTitle(e.target.value)}
          onClick={(e) => e.target.select()}
        />
        <div className="flex-align-center gap-2 justify-end mt-3">
          <button
            className="px-3 py-1 bg-dark-light hover:bg-[#3b3d4e]"
            onClick={() => dispatch(closeEditModal())}
          >
            Cancel
          </button>
          <button
            className={`px-3 py-1 bg-primary text-white hover:bg-[#45d62b] ${
              !playlistEditTitle && "opacity-60"
            }`}
            disabled={!playlistEditTitle}
            onClick={handleEdit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
