import { useDispatch, useSelector } from "react-redux";
import { getTheme, uiStore } from "../../features/uiSlice";
import { motion } from "framer-motion";
import { themeOptions } from "../../data/themeOptions";
import { useEffect } from "react";

const ThemeMenu = ({ selectedId, id, index }) => {
  const { isThemeMenuOpen, theme } = useSelector(uiStore);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("spotifyTheme", JSON.stringify(theme));
  }, [theme]);

  return (
    <>
      {isThemeMenuOpen && (
        <motion.div
          className="dropdown absolute right-full  mt-1 p-2 !rounded-xl w-20 flex-center-center flex-col gap-y-3 bg-card-dark z-50 
            bottom-0"
          initial={{ scale: 0.6, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
        >
          {themeOptions.map(({ id, image }) => (
            <img
              key={id}
              src={image}
              alt=""
              className={`w-10 h-10 object-cover rounded-xl theme sm:cursor-pointer transition-a ${
                theme.imageID === id && "active"
              }`}
              onClick={() => dispatch(getTheme({ image, id }))}
            />
          ))}
        </motion.div>
      )}
    </>
  );
};

export default ThemeMenu;
