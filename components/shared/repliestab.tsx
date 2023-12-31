import React from "react";
import PostCard from "@/components/cards/postcard";
import { fetchUserReplies } from "@/lib/actions/user-actions";
import CommentCard from "../cards/commentcard";

export const revalidate = 0;

interface Props {
  accountId: string;
}
const RepliesTab = async ({ accountId }: Props) => {
  const userReplies = await fetchUserReplies(accountId);

  if (userReplies.length === 0) {
    return (
      <div className="mt-9 flex flex-col gap-10">
        <p className="text-center text-gray-700 !text-base-regular">
          No replies yet.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-9 flex flex-col gap-10">
      {userReplies.map((post: any) => (
        <CommentCard
          key={post._id}
          id={post._id.toString()}
          currentUserId={accountId}
          parentId={post.parentId}
          content={post.text}
          author={post.author}
          createdAt={post.createdAt}
          userId={post.author._id.toString()}
          isLiked={post.isLiked || false}
          postId={post._id.toString()}
          isComment={post.isComment}
          commentAuthor={post.author._id.toString()}
          isReposted={post.isReposted || false}
        />
      ))}
    </div>
  );
};

export default RepliesTab;
