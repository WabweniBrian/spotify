import { BiPulse } from "react-icons/bi";
import { GiMicrophone, GiRadioTower } from "react-icons/gi";
import { BsFillHouseFill, BsJournalAlbum } from "react-icons/bs";
import { FaPodcast } from "react-icons/fa";

export const links = [
  {
    id: 1,
    title: "Home",
    icon: <BsFillHouseFill />,
    url: "/",
  },
  {
    id: 2,
    title: "Discover",
    icon: <BiPulse />,
    url: "/discover",
  },
  {
    id: 3,
    title: "Radio",
    icon: <GiRadioTower />,
    url: "/radio",
  },
  {
    id: 4,
    title: "Artists",
    icon: <GiMicrophone />,
    url: "/artists",
  },
  {
    id: 5,
    title: "Albums",
    icon: <BsJournalAlbum />,
    url: "/albums",
  },
  {
    id: 6,
    title: "Podcasts",
    icon: <FaPodcast />,
    url: "/podcasts",
  },
];
