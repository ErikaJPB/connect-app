"use client";

import React from "react";
import { sidebarLinks } from "@/constants/index.js";
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
import path from "path";
import { SignOutButton, SignedIn } from "@clerk/nextjs";

function LeftSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <section className="flex sticky left-0 top-0 h-screen w-fit flex-col justify-between overflow-auto border-r border pb-5 pt-28 max-md:hidden mt-5">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          const isActive =
            pathname === link.route ||
            pathname === path.join(link.route, "index");

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`flex relative justify-start gap-4 rounded-lg p-4 ${
                isActive && "bg-secondary"
              } `}
            >
              {link.icon({ size: 30, className: "text-black" })}
              <p className="text-black max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>
      <div className="mt-10 px-6 ">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
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
