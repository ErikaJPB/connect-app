"use client";

import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { likePost, unlikePost } from "@/lib/actions/post-actions";

interface LikeButtonProps {
  isLiked: boolean;
  postId: string;
  userId: string;
}

function LikeButton({ isLiked, userId, postId }: LikeButtonProps) {
  const [currentLike, setCurrentLike] = useState(isLiked);

  const handleLike = async () => {
    try {
      if (currentLike) {
        await unlikePost(userId, postId);
        setCurrentLike(false);
      } else {
        await likePost(userId, postId);
        setCurrentLike(true);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <button
      className="cursor-pointer hover:opacity-75 transition"
      onClick={handleLike}
    >
      {currentLike ? (
        <AiFillHeart className="text-red-700" size={25} />
      ) : (
        <AiOutlineHeart className="text-black" size={25} />
      )}
    </button>
  );
}

export default LikeButton;
