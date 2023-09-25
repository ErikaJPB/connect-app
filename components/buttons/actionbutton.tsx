"use client";
import React from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function ActionButton() {
  const handleEdit = () => {
    console.log("Edit Post");
  };
  const handleDelete = () => {
    console.log("Delete Post");
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="cursor-pointer hover:opacity-75 transition">
            <SlOptionsVertical
              size={16}
              className="text-black cursor-pointer object-contain"
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="drop-down-menu">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleEdit}>
            <CiEdit size={25} className="text-black mr-2 h-4 w-4" />
            Edit Post
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete}>
            <MdDeleteOutline size={25} className="text-black mr-2 h-4 w-4" />
            Delete Post
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default ActionButton;
