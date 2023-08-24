import AccountLikes from "@/components/shared/accountlikes";
import { fetchUser } from "@/lib/actions/user-actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { userAgent } from "next/server";
import React from "react";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <section>
      <h1 className="head-text mb-10">Likes</h1>;
      <AccountLikes
        currentUserId={user.id}
        accountId={userInfo.id}
        accountType="User"
      />
    </section>
  );
}

export default Page;
