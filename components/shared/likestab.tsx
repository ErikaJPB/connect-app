import React from "react";
import PostCard from "@/components/cards/postcard";
import { fetchUserLikes } from "@/lib/actions/user-actions";

interface Props {
  accountId: string;
}

const LikesTab = async ({ accountId }: Props) => {
  const userLikes = await fetchUserLikes(accountId);

  return (
    <section className="mt-9 flex flex-col gap-10">
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
          }}
          createdAt={post.createdAt}
          comments={post.children}
          userId={post.author.id}
          isLiked={true}
          postId={post._id.toString()}
        />
      ))}
    </section>
  );
};

export default LikesTab;
