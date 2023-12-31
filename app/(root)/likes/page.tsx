import { currentUser } from "@clerk/nextjs";
import PostCard from "@/components/cards/postcard";
import { fetchUser, fetchUserLikes } from "@/lib/actions/user-actions";
import { fetchPostById } from "@/lib/actions/post-actions";

const LikesPage = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userDb = await fetchUser(user.id);
  const likes = await fetchUserLikes(userDb._id.toString());
  const userLikes = userDb?.likes;

  const likedPosts = [];

  for (const like of likes) {
    const post = await fetchPostById(like._id.toString());

    likedPosts.push(post);
  }

  return (
    <div>
      <h1 className="head-text mb-10">Likes</h1>
      <div className="flex flex-col mt-9 gap-10 ">
        {likedPosts.map((post: any, index: number) => (
          <div
            key={post._id}
            className={`liked-post ${
              post.parentId &&
              !userLikes?.includes(post.parentId) &&
              index !== 0
                ? "-mt-9 mb-5"
                : ""
            } ${post.parentId ? "with-parent" : ""}`}
          >
            <PostCard
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
        ))}
      </div>
    </div>
  );
};

export default LikesPage;
