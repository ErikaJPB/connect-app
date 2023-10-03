"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "@/lib/mongoose";
import User from "@/lib/models/usermodel";
import Post from "../models/postmodel";
import mongoose, { FilterQuery, SortOrder } from "mongoose";

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

export async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: Params): Promise<void> {
  connectToDB();

  try {
    await User.findOneAndUpdate(
      {
        id: userId,
      },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
        path,
      },
      { upsert: true }
    );

    if (path === "profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Error updating user: ${error}`);
  }
}

export async function fetchUser(userId: string) {
  try {
    connectToDB();

    return await User.findOne({ id: userId }).populate({
      path: "replies",
      model: "Post",
      populate: {
        path: "author",
        model: User,
        select: "name image id",
      },
    });
  } catch (error: any) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
}

export async function fetchUserPosts(userId: string) {
  try {
    connectToDB();

    const posts = await User.findOne({ id: userId }).populate({
      path: "posts",
      model: "Post",
      populate: {
        path: "children",
        model: Post,
        populate: {
          path: "author",
          model: User,
          select: "name image id",
        },
      },
    });

    return posts;
  } catch (error: any) {
    throw new Error(`Error fetching user posts: ${error.message}`);
  }
}

export async function fetchUsers({
  userId,
  pageNumber = 1,
  pageSize = 20,
  searchTerm = "",
  sortBy = "desc",
}: {
  userId: string;
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
  sortBy?: SortOrder;
}) {
  try {
    connectToDB();

    const skipAmount = (pageNumber - 1) * pageSize;

    const regex = new RegExp(searchTerm, "i");

    const query: FilterQuery<typeof User> = {
      id: {
        $ne: userId,
      },
    };
    if (searchTerm.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }

    const sortOptions = { createdAt: sortBy };
    const usersQuery = User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    const totalUsersCount = await User.countDocuments(query);
    const users = await usersQuery.exec();
    const isNext = totalUsersCount > skipAmount + users.length;

    return { users, isNext };
  } catch (error: any) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
}

export async function getActivity(userId: string) {
  try {
    connectToDB();

    const userPosts = await Post.find({ author: userId });

    const childPostsIds = userPosts.reduce((acc, post) => {
      return [...acc, ...post.children];
    }, []);

    const replies = await Post.find({
      _id: { $in: childPostsIds },
      author: { $ne: userId },
    }).populate({
      path: "author",
      model: User,
      select: "name image _id",
    });

    return replies;
  } catch (error: any) {
    throw new Error(`Error fetching activity: ${error.message}`);
  }
}

export async function fetchUserLikes(userId: string) {
  try {
    connectToDB();

    const user = await User.findById(userId).populate({
      path: "likes",
      model: Post,
      populate: {
        path: "author",
        model: User,
        select: "name image _id username",
      },
    });

    return user?.likes || [];
  } catch (error: any) {
    throw new Error(`Error fetching user likes: ${error.message}`);
  }
}

export async function fetchUserReposts(userId: string) {
  try {
    connectToDB();
    const user = await User.findById(userId).populate({
      path: "reposts",
      model: Post,
      populate: {
        path: "author",
        model: User,
        select: "name image _id username",
      },
    });
    return user?.reposts || [];
  } catch (error: any) {
    throw new Error(`Error fetching user reposts: ${error.message}`);
  }
}

export async function fetchUserReplies(userId: string) {
  try {
    connectToDB();

    const user = await User.findById(userId).populate({
      path: "replies",
      model: Post,
      populate: {
        path: "author",
        model: User,
        select: "name image _id username",
      },
    });

    return user?.replies || [];
  } catch (error: any) {
    throw new Error(`Error fetching user replies: ${error.message}`);
  }
}

export async function fetchUserByUsername(userId: string) {
  try {
    connectToDB();

    const user = await User.findOne({
      _id: new mongoose.Types.ObjectId(userId),
    }).select("username");

    return user ? user.username : "";
  } catch (error: any) {
    throw new Error(`Error fetching user by user ID: ${error.message}`);
  }
}

export async function fetchSuggestedUsers() {
  try {
    connectToDB();

    const suggestedUsers = await User.find().limit(3);

    return suggestedUsers;
  } catch (error) {
    console.error("Error fetching suggested users:", error);
    throw error;
  }
}
