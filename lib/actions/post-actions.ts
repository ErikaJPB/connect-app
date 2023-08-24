"use server";

import { revalidatePath } from "next/cache";
import Post from "../models/postmodel";
import User from "../models/usermodel";
import { connectToDB } from "../mongoose";

interface Params {
  text: string;
  author: string;
  path: string;
}

export async function createPost({ text, author, path }: Params) {
  try {
    connectToDB();

    const createPost = await Post.create({
      text,
      author,
      path,
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

  const postsQuery = Post.find({ parentId: { $in: [null, undefined] } })
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
    });

  const totalPostsCount = await Post.countDocuments({
    parentId: { $in: [null, undefined] },
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
    });
    const savedCommentPost = await commentPost.save();

    originalPost.children.push(savedCommentPost._id);

    await originalPost.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error adding comment to post: ${error.message}`);
  }
}

export async function likePost(userId: string, postId: string) {
  connectToDB();
  try {
    const post = await Post.findById(postId);
    const user = await User.findById(userId);

    if (!post || !user) {
      throw new Error("Post or user not found");
    }

    if (!post.likedBy.includes(userId)) {
      post.likedBy.push(userId);
      user.likes.push(postId);
    }

    await post.save();
    await user.save();
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
      post.likedBy = post.likedBy.filter((id: string) => id !== userId);
      user.likes = user.likes.filter((id: string) => id !== postId);
    }

    await post.save();
    await user.save();
  } catch (error: any) {
    throw new Error(`Error unliking post: ${error.message}`);
  }
}
