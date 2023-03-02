import { BiLogOut, BiUser } from "react-icons/bi";
import { BsHeart, BsMusicNoteList } from "react-icons/bs";

export const profileOptions = [
  {
    id: 1,
    title: "Profile",
    icon: <BiUser />,
    url: "/profile",
  },
  {
    id: 2,
    title: "Playlists",
    icon: <BsMusicNoteList />,
    url: "/playlists",
  },
  {
    id: 3,
    title: "Favorites",
    icon: <BsHeart />,
    url: "/favorites",
  },
  {
    id: 4,
    title: "Logout",
    icon: <BiLogOut />,
    url: "/login",
  },
];
