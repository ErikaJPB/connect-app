"use client";

import * as z from "zod";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentValidation } from "@/lib/validations/post";
import { addCommentToPost } from "@/lib/actions/post-actions";

interface Props {
  postId: string;
  currentUserImg: string;
  currentUserId: string;
}

function Comment({ postId, currentUserImg, currentUserId }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      post: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    await addCommentToPost(
      postId,
      values.post,
      JSON.parse(currentUserId),
      pathname
    );

    form.reset();
  };

  return (
    <Form {...form}>
      <form
        className="flex items-center gap-4 border-y border-y-gray-400 mt-10 py-5 max-xs:flex-col"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="post"
          render={({ field }) => (
            <FormItem className="flex w-full items-center gap-3 ">
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt="User Image"
                  width={50}
                  height={50}
                  className="rounded-full object-cover"
                />
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  placeholder="Comment..."
                  className="account-form-input online-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="bg-primary border border-gray-600 text-black rounded-xl text-sm max-xs:w-full"
        >
          Reply
        </Button>
      </form>
    </Form>
  );
}

export default Comment;
