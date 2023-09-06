"use client";

import * as z from "zod";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostValidation } from "@/lib/validations/post";
import { createPost } from "@/lib/actions/post-actions";

interface Props {
  userId: string;
}

const CreatePost: React.FC<Props> = ({ userId }) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      post: "",
      content: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof PostValidation>) => {
    await createPost({
      text: values.post,
      author: userId,
      path: pathname,
    });

    router.push("/");
    router.refresh();
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col justify-start gap-10 mt-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="post"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full gap-3 mt-10">
              <FormLabel className="text-base-semibold text-gray-500">
                Write your post here
              </FormLabel>
              <FormControl className=" text-white">
                <Textarea rows={15} {...field} className="account-form-input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="bg-primary border border-gray-600 text-black"
        >
          Post
        </Button>
      </form>
    </Form>
  );
};

export default CreatePost;
