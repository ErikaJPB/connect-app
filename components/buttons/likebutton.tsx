"use client";
import React, { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { likePost, unlikePost } from "@/lib/actions/post-actions";

interface LikeButtonProps {
  isLiked: boolean;
  postId: string; // You'll need to pass the postId
  userId: string; // You'll need to pass the userId
}

function LikeButton({ isLiked, userId, postId }: LikeButtonProps) {
  const [currentLike, setCurrentLike] = useState(isLiked);

  const handleLike = async () => {
    try {
      if (currentLike) {
        await unlikePost(userId, postId); // Pass both userId and postId
      } else {
        await likePost(userId, postId); // Pass both userId and postId
      }
      setCurrentLike(!currentLike);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <button
      className="cursor-pointer hover:opacity-75 transition"
      onClick={handleLike}
    >
      <AiOutlineHeart
        className={currentLike ? "text-red-500" : "text-black"}
        size={25}
      />
    </button>
  );
}

export default LikeButton;
