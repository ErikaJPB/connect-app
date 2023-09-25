"use server";

import { revalidatePath } from "next/cache";
import Post from "../models/postmodel";
import User from "../models/usermodel";
import { connectToDB } from "../mongoose";

interface Params {
  text: string;
  author: string;
  path: string;
  parentId?: string;
  originalPostId?: string;
}

export async function createPost({ text, author, path, parentId }: Params) {
  try {
    connectToDB();

    const createPost = await Post.create({
      text,
      author,
      path,
      parentId,
      isComment: false,
    });

    await User.findByIdAndUpdate(author, {
      $push: { posts: createPost._id },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error creating post: ${error.message}`);
  }
}
export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  connectToDB();

  const skipAmount = (pageNumber - 1) * pageSize;

  const postsQuery = Post.find({
    $or: [{ parentId: { $in: [null, undefined] } }, { isRepost: true }],
  })
    .sort({ createdAt: "desc" })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({ path: "author", model: User })
    .populate({
      path: "children",
      populate: {
        path: "author",
        model: User,
        select: "_id name parentId image",
      },
    })
    .populate({
      path: "repostedBy",
      model: User,
      select: "_id name",
    });

  const totalPostsCount = await Post.countDocuments({
    $or: [{ parentId: { $in: [null, undefined] } }, { isRepost: true }],
  });

  const posts = await postsQuery.exec();

  const isNext = totalPostsCount > skipAmount + posts.length;

  return { posts, isNext };
}

export async function fetchPostById(id: string) {
  connectToDB();

  try {
    const post = await Post.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id name image",
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: User,
            select: "_id name parentId image",
          },
          {
            path: "children",
            model: Post,
            populate: {
              path: "author",
              model: User,
              select: "_id id name parentId image",
            },
          },
        ],
      })
      .exec();

    return post;
  } catch (error: any) {
    throw new Error(`Error fetching post: ${error.message}`);
  }
}

export async function addCommentToPost(
  postId: string,
  commentText: string,
  userId: string,
  path: string
) {
  connectToDB();
  try {
    const originalPost = await Post.findById(postId);
    if (!originalPost) {
      throw new Error("Post not found");
    }
    const commentPost = new Post({
      text: commentText,
      author: userId,
      parentId: postId,
      likedBy: [],
      isComment: true,
    });
    const savedCommentPost = await commentPost.save();

    originalPost.children.push(savedCommentPost._id);

    await originalPost.save();

    await User.findByIdAndUpdate(userId, {
      $push: { replies: savedCommentPost._id },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error adding comment to post: ${error.message}`);
  }
}

export async function likePost(userId: string, postId: string) {
  try {
    connectToDB();

    const user = await User.findById(userId);
    const post = await Post.findById(postId);

    if (!user || !post) {
      throw new Error("Post or user not found");
    }

    if (!user.likes.includes(postId)) {
      user.likes.push(postId);
    }

    if (!post.likedBy.includes(userId)) {
      post.likedBy.push(userId);
      post.isLiked = true;
    }

    await user.save();
    await post.save();
  } catch (error: any) {
    throw new Error(`Error liking post: ${error.message}`);
  }
}

export async function unlikePost(userId: string, postId: string) {
  connectToDB();
  try {
    const post = await Post.findById(postId);
    const user = await User.findById(userId);

    if (!post || !user) {
      throw new Error("Post or user not found");
    }

    if (post.likedBy.includes(userId)) {
      post.likedBy.pull(userId);
      post.isLiked = false;
    }

    user.likes.pull(postId);

    await post.save();
    await user.save();
  } catch (error: any) {
    throw new Error(`Error unliking post: ${error.message}`);
  }
}

export async function createRepost(userId: string, postId: string) {
  try {
    connectToDB();

    const user = await User.findById(userId);
    const post = await Post.findById(postId);

    if (!user || !post) {
      throw new Error("Post or User not found");
    }

    if (!user.reposts.includes(postId)) {
      user.reposts.push(postId);
    }

    if (!post.repostedBy.includes(userId)) {
      post.repostedBy.push(userId);
      post.isReposted = true;
    }

    await user.save();
    await post.save();
  } catch (error: any) {
    throw new Error(`Error reposting post: ${error.message}`);
  }
}

export async function deleteRepost(userId: string, postId: string) {
  try {
    const post = await Post.findById(postId);
    const user = await User.findById(userId);

    if (!post || !user) {
      throw new Error("Post or user not found");
    }

    if (post.repostedBy.includes(userId)) {
      post.repostedBy.pull(userId);
      post.isReposted = false;
    }

    user.reposts.pull(postId);

    await post.save();
    await user.save();
  } catch (error: any) {
    throw new Error(`Error deleting repost: ${error.message}`);
  }
}

export async function fetchSuggestedPosts() {
  try {
    connectToDB();

    const suggestedPosts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .populate("author", "username name image");

    return suggestedPosts;
  } catch (error) {
    console.error("Error fetching suggested posts:", error);
    throw error;
  }
}

export async function deletePost(postId: string, userId: string) {
  try {
    connectToDB();

    const post = await Post.findById(postId);

    if (!post) {
      throw new Error("Post not found");
    }

    if (post.author.toString() !== userId) {
      throw new Error("User is not the author of the post");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    user.posts.pull(postId);

    await post.deleteOne();

    await user.save();

    revalidatePath(`/profile/${userId}`);

    return { success: true };
  } catch (error: any) {
    throw new Error(`Error deleting post: ${error.message}`);
  }
}
