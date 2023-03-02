import { useDispatch, useSelector } from "react-redux";
import { closeDeleteModal, showToast, uiStore } from "../features/uiSlice";
import { FiX } from "react-icons/fi";
import { deletePlaylist } from "../features/dataSlice";
import { useNavigate } from "react-router-dom";

const DeleteModal = () => {
  const { deletemodal } = useSelector(uiStore);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCloseModal = (e) => {
    if (e.target.classList.contains("modal")) dispatch(closeDeleteModal());
  };

  // Handle Delete Playlist
  const handleDelete = () => {
    dispatch(
      showToast({
        content: "Playlist deleted",
        classType: "danger",
        icon: "/icons/x-circle.svg",
      })
    );
    dispatch(deletePlaylist(deletemodal.id));
    dispatch(closeDeleteModal());
    navigate("/playlists");
  };

  return (
    <div
      className={`modal fixed w-screen h-screen bg-black/50 top-0 left-0 z-[99] opacity-0 pointer-events-none transition-opacity duration-300 ${
        deletemodal.showDeleteModal &&
        "!pointer-events-auto !opacity-100 flex-center-center"
      }`}
      onClick={handleCloseModal}
    >
      <div
        className={`max-w-[400px] w-[96%] bg-card-dark p-4 rounded-lg hidden text-center ${
          deletemodal.showDeleteModal && "!block"
        }`}
      >
        <div className="flex-center-center">
          <div className="icon-box !w-10 !h-10 bg-red-500 !opacity-100 text-white">
            <FiX className="text-3xl font-bold" />
          </div>
        </div>
        <h1 className="text-2xl font-semibold mt-3">
          Are you sure you want to delete this playlist
        </h1>
        <p className="mt-2">All the songs saved will be lost</p>
        <div className="flex-align-center gap-2 justify-end mt-3">
          <button
            className="px-3 py-1 bg-dark-light hover:bg-[#3b3d4e]"
            onClick={() => dispatch(closeDeleteModal())}
          >
            Cancel
          </button>
          <button
            className="px-3 py-1 bg-red-500 text-white hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
