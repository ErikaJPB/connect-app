import { currentUser } from "@clerk/nextjs";
import PostCard from "@/components/cards/postcard";
import { fetchComments, fetchPosts } from "@/lib/actions/post-actions";
import { fetchUser, fetchUserByUsername } from "@/lib/actions/user-actions";
import Pagination from "@/components/shared/pagination";
import CommentCard from "@/components/cards/commentcard";

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

  const postIds = result.posts.map((p: any) => p._id.toString());

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

  const commentsByPost: Record<string, any[]> = {};

  for (const postId of postIds) {
    const postComments = await fetchComments(postId);
    commentsByPost[postId] = postComments;
  }

  // console.log(commentsByPost);

  return (
    <>
      <h1 className="head-text text-left">Home</h1>
      <div className="flex flex-col mt-9 gap-10 ">
        {result.posts.length === 0 ? (
          <p className="text-center">No posts found</p>
        ) : (
          <>
            {result.posts.map((post, index) => (
              <div key={post._id}>
                {!post.parentId && post.children ? (
                  <PostCard
                    id={post._id}
                    currentUserId={user?.id || ""}
                    parentId={post.parentId}
                    content={post.text}
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
                    comments={commentsByPost[post._id.toString()] || []}
                    isComment={post.isComment}
                  />
                ) : null}
                {commentsByPost[post._id.toString()]?.map((comment) => (
                  <CommentCard
                    key={comment._id}
                    id={comment._id}
                    currentUserId={user?.id || ""}
                    parentId={comment.parentId}
                    content={comment.text}
                    author={comment.author}
                    createdAt={comment.createdAt}
                    userId={userDb._id.toString()}
                    isLiked={
                      userLikes?.includes(comment._id.toString()) || false
                    }
                    postId={post._id.toString()}
                    isReposted={
                      userReposts?.includes(comment._id.toString()) || false
                    }
                    isComment={comment.isComment}
                  />
                ))}
              </div>
            ))}
          </>
        )}
      </div>
      <Pagination
        path="/"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={
          result ? result.posts.length > 0 && result.posts.length === 5 : false
        }
      />
    </>
  );
}

export default Home;
