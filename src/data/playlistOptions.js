import { BiPlusCircle, BiRename } from "react-icons/bi";
import { BsPlayFill, BsTrash } from "react-icons/bs";

export const playListOptions = [
  {
    id: 1,
    title: "Play",
    icon: <BsPlayFill />,
  },
  {
    id: 2,
    title: "Add Song",
    icon: <BiPlusCircle />,
  },
  {
    id: 3,
    title: "Rename",
    icon: <BiRename />,
  },
  {
    id: 4,
    title: "Delete",
    icon: <BsTrash />,
  },
];
