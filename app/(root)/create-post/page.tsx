import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchUser } from "@/lib/actions/user-actions";
import CreatePost from "@/components/forms/createpost";

export const revalidate = 0;

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <h1 className="head-text">Create Post</h1>
      <CreatePost userId={userInfo._id.toString()} />
    </>
  );
}

export default Page;
