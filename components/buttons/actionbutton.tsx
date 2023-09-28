"use client";
import React, { useState } from "react";
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
import { deletePost } from "@/lib/actions/post-actions";

interface ActionButtonProps {
  userId: string;
  postId: string;
  content: string;
}

function ActionButton({ postId, userId, content }: ActionButtonProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [EditedContent, setEditedContent] = useState(content);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleEdit = () => {
    console.log("Edit Post");
  };

  const handleDelete = async () => {
    try {
      const result = await deletePost(postId, userId);

      if (result.success) {
        console.log("Post deleted successfully");
        closeDeleteModal();
      }
    } catch (error: any) {
      console.error("Error deleting post", error);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="cursor-pointer transition">
            <SlOptionsVertical
              size={16}
              className="text-black cursor-pointer object-contain"
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="drop-down-menu">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={openEditModal}>
            <CiEdit size={25} className="drop-down-menu-item" />
            Edit Post
          </DropdownMenuItem>
          <DropdownMenuItem onClick={openDeleteModal}>
            <MdDeleteOutline size={25} className="drop-down-menu-item" />
            Delete Post
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white mx-auto p-5 rounded-lg shadow-lg z-50">
            <h2 className="text-xl font-semibold mb-4">
              Are you sure you want to delete this post?
            </h2>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 mr-2 bg-secondary text-gray-900 rounded hover:bg-red-500"
                onClick={handleDelete}
              >
                Yes
              </button>
              <button
                className="px-4 py-2 bg-secondary text-gray-900 rounded hover:bg-gray-500"
                onClick={closeDeleteModal}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center ">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white mx-auto p-5 rounded-lg shadow-lg z-50 w-80">
            <h2 className="text-xl font-semibold mb-4">Edit Post</h2>
            <textarea
              className="w-full h-52 p-2 border rounded-md resize-none"
              value={EditedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 mr-2 bg-secondary text-gray-900 rounded hover:bg-red-500"
                onClick={handleEdit}
              >
                Save
              </button>
              <button
                className="px-4 py-2 bg-secondary text-gray-900 rounded hover:bg-gray-500"
                onClick={closeEditModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ActionButton;
