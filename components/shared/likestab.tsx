import React from "react";
import PostCard from "@/components/cards/postcard";
import { fetchUserLikes } from "@/lib/actions/user-actions";

export const revalidate = 0;

interface Props {
  accountId: string;
}

const LikesTab = async ({ accountId }: Props) => {
  const userLikes = await fetchUserLikes(accountId);

  if (userLikes.length === 0) {
    return (
      <div className="mt-9 flex flex-col gap-10">
        <p className="text-center text-gray-700 !text-base-regular">
          No likes yet.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-9 flex flex-col gap-10">
      {userLikes.map((post: any) => (
        <PostCard
          key={post._id}
          id={post._id}
          currentUserId={accountId}
          parentId={post.parentId}
          content={post.text}
          author={{
            name: post.author.name,
            image: post.author.image,
            id: post.author.id,
            username: post.author.username,
          }}
          createdAt={post.createdAt}
          comments={post.children}
          userId={post.author._id.toString()}
          isLiked={post.isLiked}
          postId={post._id.toString()}
        />
      ))}
    </div>
  );
};

export default LikesTab;
