import { currentUser } from "@clerk/nextjs";
import PostCard from "@/components/cards/postcard";
import { fetchPosts } from "@/lib/actions/post-actions";
import { fetchUser, fetchUserByUsername } from "@/lib/actions/user-actions";
import Pagination from "@/components/shared/pagination";

async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const result = await fetchPosts(
    searchParams.page ? +searchParams.page : 1,
    5
  );

  const userDb = await fetchUser(user.id);

  const userLikes = userDb?.likes;

  const userReposts = userDb?.reposts;

  const repostAuthorIdsByPost: Record<string, string[]> = {};

  result.posts.forEach((post) => {
    const repostAuthorIds = post.repostedBy.map((r: any) => r._id.toString());
    repostAuthorIdsByPost[post._id.toString()] = repostAuthorIds;
  });

  const repostAuthorsByPost: Record<string, string[]> = {};
  for (const postId in repostAuthorIdsByPost) {
    const authorIds = repostAuthorIdsByPost[postId];
    const authors = await Promise.all(
      authorIds.map(async (authorId: string) => {
        const authorUsername = await fetchUserByUsername(authorId);
        return authorUsername;
      })
    );
    repostAuthorsByPost[postId] = authors;
  }

  return (
    <>
      <h1 className="head-text text-left">Home</h1>
      <div className="flex flex-col mt-4 gap-8 ">
        {result.posts.length === 0 ? (
          <p className="text-center">No posts found</p>
        ) : (
          <>
            {result.posts.map((post, index) => (
              <div key={post._id}>
                {!post.parentId && (
                  <PostCard
                    id={post._id}
                    currentUserId={user?.id || ""}
                    parentId={post.parentId}
                    content={post.text}
                    comments={post.children}
                    author={post.author}
                    createdAt={post.createdAt}
                    userId={userDb._id.toString()}
                    isLiked={userLikes?.includes(post._id.toString()) || false}
                    postId={post._id.toString()}
                    isReposted={
                      userReposts?.includes(post._id.toString()) || false
                    }
                    repostAuthorName={repostAuthorsByPost[
                      post._id.toString()
                    ].map((author) => author.toString() || "")}
                    isComment={false}
                  />
                )}

                {post.children.length > 0 && (
                  <div className="mt-2 gap-10 rounded-xl bg-gray-100 py-2">
                    {post.children.map((comment: any) => (
                      <div className="flex flex-col mt-2" key={comment._id}>
                        <PostCard
                          id={comment._id}
                          currentUserId={comment?.id || ""}
                          parentId={comment.parentId}
                          comments={comment.children}
                          content={comment.text}
                          author={comment.author}
                          createdAt={comment.createdAt}
                          userId={userDb._id.toString()}
                          isLiked={
                            userLikes?.includes(comment._id.toString()) || false
                          }
                          postId={comment.id.toString()}
                          isReposted={
                            userReposts?.includes(comment._id.toString()) ||
                            false
                          }
                          repostAuthorName={repostAuthorsByPost[
                            comment._id.toString()
                          ]?.map((author) => author.toString() || "")}
                          isComment={true}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>

      <Pagination
        path="/"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </>
  );
}

export default Home;
