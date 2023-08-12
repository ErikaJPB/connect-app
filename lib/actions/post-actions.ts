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
