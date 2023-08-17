import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import PostCard from "@/components/cards/postcard";
import Comment from "@/components/forms/comment";
import { fetchPostById } from "@/lib/actions/post-actions";
import { fetchUser } from "@/lib/actions/user-actions";

const Page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const post = await fetchPostById(params.id);

  return (
    <section className="relative">
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
        />
      </div>

      <div className="mt-8">
        <Comment
          postId={post._id}
          currentUserImg={user.imageUrl}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>
    </section>
  );
};

export default Page;
