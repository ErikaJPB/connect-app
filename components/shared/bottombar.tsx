"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AiFillHome,
  AiOutlineSearch,
  AiFillHeart,
  AiOutlineUser,
} from "react-icons/ai";
import { TbActivityHeartbeat, TbLogout } from "react-icons/tb";
import { IoCreateSharp } from "react-icons/io5";

import { sidebarLinks } from "@/constants";

function Bottombar() {
  const pathname = usePathname();

  return (
    <section className="bottom-bar">
      <div className="bottom-bar-container">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`bottom-bar-link ${isActive && "bg-secondary"}`}
            >
              {link.icon({ size: 30, className: "text-black" })}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Bottombar;
