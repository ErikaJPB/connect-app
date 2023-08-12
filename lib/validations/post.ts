import * as z from "zod";

export const PostValidation = z.object({
  post: z
    .string()
    .nonempty()
    .min(3, { message: "Post must be at least 3 characters long" }),
  accountId: z.string(),
});

export const CommentValidation = z.object({
  post: z
    .string()
    .nonempty()
    .min(3, { message: "Post must be at least 3 characters long" }),
});
