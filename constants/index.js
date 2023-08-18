import {
  AiFillHome,
  AiOutlineSearch,
  AiFillHeart,
  AiOutlineUser,
} from "react-icons/ai";
import { TbActivityHeartbeat } from "react-icons/tb";
import { IoCreateSharp } from "react-icons/io5";
import { BsFillReplyAllFill } from "react-icons/bs";
import { TfiLayoutListPost } from "react-icons/tfi";

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
    route: "/create-post",
    label: "Create Post",
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

export const profileTabs = [
  {
    icon: TfiLayoutListPost,
    value: "posts",
    label: "Posts",
  },
  {
    icon: BsFillReplyAllFill,
    value: "replies",
    label: "Replies",
  },
  {
    icon: AiFillHeart,
    value: "likes",
    label: "Likes",
  },
];
