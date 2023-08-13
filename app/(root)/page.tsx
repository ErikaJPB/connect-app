import { currentUser } from "@clerk/nextjs";
import PostCard from "@/components/cards/postcard";
import { fetchPost } from "@/lib/actions/post-actions";

const Home = async () => {
  const user = await currentUser();
  if (!user) return null;

  const result = await fetchPost(1, 30);

  return (
    <>
      <h1 className="head-text left-home">Home</h1>
      <section className="flex flex-col mt-9 gap-8">
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
              />
            ))}
          </>
        )}
      </section>
    </>
  );
};

export default Home;
