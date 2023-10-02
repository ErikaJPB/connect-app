import React from "react";
import { fetchUserReposts } from "@/lib/actions/user-actions";
import PostCard from "../cards/postcard";

interface Props {
  accountId: string;
}

const RepostsTab = async ({ accountId }: Props) => {
  const userReposts = await fetchUserReposts(accountId);

  if (userReposts.length === 0) {
    return (
      <section className="mt-9 flex flex-col gap-10">
        <p className="text-center text-gray-700 !text-base-regular">
          No reposts yet.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-9 flex flex-col gap-10">
      {userReposts.map((post: any) => (
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
      ))}
    </section>
  );
};
export default RepostsTab;
