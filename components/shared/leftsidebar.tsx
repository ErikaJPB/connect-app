"use client";

import React from "react";
import Link from "next/link";
import {
  AiFillHome,
  AiOutlineSearch,
  AiFillHeart,
  AiOutlineUser,
} from "react-icons/ai";
import { TbActivityHeartbeat, TbLogout } from "react-icons/tb";
import { IoCreateSharp } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";

import { sidebarLinks } from "@/constants/index.js";

function LeftSidebar() {
  const { userId } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <section className="leftside-bar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          if (link.route === "/profile") link.route = `${link.route}/${userId}`;
          return (
            <Link
              href={link.route}
              key={link.label}
              className={`flex relative justify-start gap-3  rounded-lg p-4 ${
                isActive && "bg-secondary"
              } `}
            >
              {link.icon({ size: 28, className: "text-black" })}
              <p className="text-black p-1.5 max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>
      <div className="mt-10 px-6 ">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/")}>
            <div className="flex cursor-pointer gap-4 p-4">
              <TbLogout className="text-black" size={30} />
              <p className="text-black max-lg:hidden ">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
}

export default LeftSidebar;
