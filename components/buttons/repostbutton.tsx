"use client";

import React, { useState } from "react";
import { BiRepost } from "react-icons/bi";
import { createRepost, deleteRepost } from "@/lib/actions/post-actions";

interface RepostButtonProps {
  isReposted: boolean;
  postId: string;
  userId: string;
}

function RepostButton({ isReposted, userId, postId }: RepostButtonProps) {
  const [currentRepost, setCurrentRepost] = useState(isReposted);

  const handleRepost = async () => {
    try {
      if (currentRepost) {
        await deleteRepost(userId, postId);
        setCurrentRepost(false);
      } else {
        await createRepost(userId, postId);
        setCurrentRepost(true);
      }
    } catch (error) {
      console.error("Error reposting post", error);
    }
  };

  return (
    <button
      className="cursor-pointer hover:opacity-75 transition"
      onClick={handleRepost}
    >
      {currentRepost ? (
        <BiRepost
          size={25}
          className="text-gray-500 cursor-pointer object-contain"
        />
      ) : (
        <BiRepost
          size={25}
          className="text-black cursor-pointer object-contain"
        />
      )}
    </button>
  );
}

export default RepostButton;
