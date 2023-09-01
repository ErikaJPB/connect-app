import { currentUser } from "@clerk/nextjs";
import PostCard from "@/components/cards/postcard";
import { fetchPosts } from "@/lib/actions/post-actions";
import { fetchUser } from "@/lib/actions/user-actions";
import Pagination from "@/components/shared/pagination";

async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;

  const result = await fetchPosts(
    searchParams.page ? +searchParams.page : 1,
    5
  );

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

      <Pagination
        path="/"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </>
  );
}

export default Home;
