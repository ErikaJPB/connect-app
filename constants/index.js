import {
  AiFillHome,
  AiOutlineSearch,
  AiFillHeart,
  AiOutlineUser,
} from "react-icons/ai";
import { TbActivityHeartbeat } from "react-icons/tb";
import { IoCreateSharp } from "react-icons/io5";

export const sidebarLinks = [
  {
    icon: AiFillHome,
    route: "/",
    label: "Home",
  },
  {
    icon: AiOutlineSearch,
    route: "/search",
    label: "Search",
  },
  {
    icon: TbActivityHeartbeat,
    route: "/activity",
    label: "Activity",
  },
  {
    icon: IoCreateSharp,
    route: "/post",
    label: "Post",
  },
  {
    icon: AiFillHeart,
    route: "/liked",
    label: "Liked",
  },

  {
    icon: AiOutlineUser,
    route: "/profile",
    label: "Profile",
  },
];
