import React from "react";
import { fetchUserReposts } from "@/lib/actions/user-actions";
import PostCard from "../cards/postcard";
import CommentCard from "../cards/commentcard";

interface Props {
  accountId: string;
}

const RepostsTab = async ({ accountId }: Props) => {
  const userReposts = await fetchUserReposts(accountId);

  if (userReposts.length === 0) {
    return (
      <div className="mt-9 flex flex-col gap-10">
        <p className="text-center text-gray-700 !text-base-regular">
          No reposts yet.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-9 flex flex-col gap-10">
      {userReposts.map((post: any) =>
        post.isComment ? (
          <CommentCard
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
            commentAuthor={post.author._id.toString()}
            createdAt={post.createdAt}
            isLiked={post.isLiked}
            userId={post.author._id.toString()}
            postId={post._id.toString()}
            isReposted={true}
          />
        ) : (
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
            isReposted={true}
          />
        )
      )}
    </div>
  );
};

export default RepostsTab;
