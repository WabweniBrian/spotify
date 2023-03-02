import { BsPlus } from "react-icons/bs";
import { FiMinus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addArtistToFavorite, dataStore } from "../../features/dataSlice";
import { motion } from "framer-motion";
import { showToast } from "../../features/uiSlice";

const ArtistCard = ({ id, name, image, songs, albums, variants }) => {
  const { favoriteArtists } = useSelector(dataStore);

  const dispatch = useDispatch();
  let ids = [...new Set(favoriteArtists.map((fav) => fav.id))];
  let isFavorite = ids.includes(id) ? true : false;

  return (
    <motion.div className="text-center" variants={variants}>
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full relative">
        <Link to={`/artists/${id}`} className="!opacity-100">
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </Link>
        <div
          className="icon-box bg-card-dark/60  absolute bottom-0 right-0 border-2 border-card-dark/60"
          onClick={() => {
            dispatch(addArtistToFavorite({ id, name, image, songs, albums }));
            isFavorite
              ? dispatch(
                  showToast({
                    content: "Artist removed from favorites",
                    classType: "danger",
                    icon: "/icons/x-circle.svg",
                  })
                )
              : dispatch(
                  showToast({
                    content: "Artist added to favorites",
                    classType: "success",
                    icon: "/icons/check-circle.svg",
                  })
                );
          }}
        >
          {isFavorite ? (
            <FiMinus className="!text-red-500 text-xl !opacity-100" />
          ) : (
            <BsPlus className="!text-white text-xl !opacity-100" />
          )}
        </div>
      </div>
      <Link to={`/artists/${id}`} className="!opacity-100">
        {name.length > 7 ? `${name.slice(0, 7)}...` : name}
      </Link>
    </motion.div>
  );
};

export default ArtistCard;
