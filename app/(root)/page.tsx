import { currentUser } from "@clerk/nextjs";
import PostCard from "@/components/cards/postcard";
import { fetchPosts } from "@/lib/actions/post-actions";
import { fetchUser } from "@/lib/actions/user-actions";

const Home = async () => {
  const user = await currentUser();
  if (!user) return null;

  const result = await fetchPosts(1, 30);

  const userDb = await fetchUser(user.id);

  const userLikes = userDb?.likes;

  return (
    <>
      <h1 className="head-text text-left">Home</h1>
      <section className="flex flex-col mt-9 gap-10 ">
        {result.posts.length === 0 ? (
          <p className="text-center">No posts found</p>
        ) : (
          <>
            {result.posts.map((post) => (
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
            ))}
          </>
        )}
      </section>
    </>
  );
};

export default Home;
