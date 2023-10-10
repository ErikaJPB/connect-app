import React from "react";
import PostCard from "@/components/cards/postcard";
import CommentCard from "@/components/cards/commentcard";
import { fetchUserLikes } from "@/lib/actions/user-actions";

export const revalidate = 0;

interface Props {
  accountId: string;
}

const LikesTab = async ({ accountId }: Props) => {
  const userLikes = await fetchUserLikes(accountId);
  console.log(userLikes);

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
      {userLikes.map((item: any) =>
        item.isComment ? (
          <CommentCard
            key={item._id}
            id={item._id}
            currentUserId={accountId}
            parentId={item.parentId}
            content={item.text}
            author={{
              name: item.author.name,
              image: item.author.image,
              id: item.author.id,
              username: item.author.username,
            }}
            commentAuthor={item.author._id.toString()}
            createdAt={item.createdAt}
            isLiked={item.isLiked}
            userId={item.author._id.toString()}
            postId={item._id.toString()}
          />
        ) : (
          <PostCard
            key={item._id}
            id={item._id}
            currentUserId={accountId}
            parentId={item.parentId}
            content={item.text}
            author={{
              name: item.author.name,
              image: item.author.image,
              id: item.author.id,
              username: item.author.username,
            }}
            createdAt={item.createdAt}
            comments={item.children}
            userId={item.author._id.toString()}
            isLiked={item.isLiked}
            postId={item._id.toString()}
          />
        )
      )}
    </div>
  );
};

export default LikesTab;
