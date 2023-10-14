import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import PostCard from "@/components/cards/postcard";
import Comment from "@/components/forms/comment";
import { fetchPostById } from "@/lib/actions/post-actions";
import { fetchUser } from "@/lib/actions/user-actions";
import CommentCard from "@/components/cards/commentcard";

export const revalidate = 0;

const Page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const post = await fetchPostById(params.id);
  const userDb = await fetchUser(user.id);

  const userLikes = userDb?.likes;

  return (
    <div className="relative">
      <div>
        <PostCard
          key={post._id}
          id={post._id}
          currentUserId={user?.id || ""}
          parentId={post.parentId}
          content={post.text}
          author={post.author}
          createdAt={post.createdAt}
          comments={post.children}
          userId={userDb._id.toString()}
          isLiked={userLikes?.includes(post._id.toString()) || false}
          postId={post._id.toString()}
        />
      </div>

      <div className="mt-8">
        <Comment
          postId={post.id.toString()}
          currentUserImg={userInfo.image}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>

      <div className="mt-10">
        {post.children.map((comment: any) => (
          <CommentCard
            key={comment._id}
            id={comment._id.toString()}
            currentUserId={comment?.id || ""}
            parentId={comment.parentId}
            content={comment.text}
            author={comment.author}
            createdAt={comment.createdAt}
            isComment
            userId={userDb._id.toString()}
            isLiked={userLikes?.includes(comment._id.toString()) || false}
            postId={comment.id.toString()}
            commentAuthor={comment.author._id.toString()}
            isReposted={
              userDb.reposts?.includes(comment._id.toString()) || false
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
