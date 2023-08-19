"use client";

import * as z from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserValidation } from "@/lib/validations/user";
import React, { ChangeEvent, useState } from "react";
import { updateUser } from "@/lib/actions/user-actions";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";

interface AccountProfileProps {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTittle: string;
}

const AccountProfile: React.FC<AccountProfileProps> = ({ user, btnTittle }) => {
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("media");
  const pathname = usePathname();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: user?.image || "",
      name: user?.name || "",
      username: user.username || "",
      bio: user?.bio || "",
    },
  });

  async function onSubmit(values: z.infer<typeof UserValidation>) {
    const blob = values.profile_photo;
    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const imgRes = await startUpload(files);

      if (imgRes && imgRes[0].url) {
        values.profile_photo = imgRes[0].url;
      }
    }

    await updateUser({
      userId: user.id,
      username: values.username,
      name: values.name,
      bio: values.bio,
      image: values.profile_photo,
      path: pathname,
    });

    if (pathname === "/profile/edit") {
      router.back();
    } else {
      router.push("/");
    }
  }

  function handleImage(
    event: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) {
    event.preventDefault();
    const fileReader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      setFiles(Array.from(event.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageUrl = event.target?.result?.toString() || "";
        fieldChange(imageUrl);
      };

      fileReader.readAsDataURL(file);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="flex h-24 w-24 items-center justify-center ">
                {field.value ? (
                  <div className="relative h-14 w-14 object-cover">
                    <Image
                      src={field.value}
                      alt="profile photo"
                      fill
                      priority
                      className="rounded-full object-cover shadow-xl"
                    />
                  </div>
                ) : (
                  <div className="relative h-14 w-14 object-cover">
                    <Image
                      src="/assets/user.svg"
                      alt="profile photo"
                      fill
                      className="rounded-full object-cover shadow-xl"
                    />
                  </div>
                )}
              </FormLabel>
              <FormControl className="account-form-input">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="upload your photo"
                  className="cursor-pointer bg-gray-500 text-white border-none  outline-none file:text-primary"
                  onChange={(event) => handleImage(event, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="text-base-semibold text-light-2">
                Name
              </FormLabel>
              <FormControl className="account-form-input">
                <Input
                  type="text"
                  className="border border-dark-4 bg-gray-800 text-light-1"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Username
              </FormLabel>
              <FormControl className="account-form-input">
                <Input
                  type="text"
                  className="border text-light-1 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Bio
              </FormLabel>
              <FormControl>
                <Textarea rows={10} className="account-form-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="bg-primary" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AccountProfile;
