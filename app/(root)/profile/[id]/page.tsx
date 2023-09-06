import { currentUser } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import { BsFillReplyAllFill } from "react-icons/bs";
import { TfiLayoutListPost } from "react-icons/tfi";
import { AiFillHeart } from "react-icons/ai";

import { fetchUser, fetchUserLikes } from "@/lib/actions/user-actions";
import ProfileHeader from "@/components/shared/profileheader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import PostsTab from "@/components/shared/poststab";
import RepliesTab from "@/components/shared/repliestab";
import LikesTab from "@/components/shared/likestab";

export const revalidate = 0;

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(params.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <section>
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />

      <div className="mt-9">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="tab">
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className="tab">
                {tab.icon({ size: 25, className: "text-white" })}
                <p className="max-sm:hidden">{tab.label}</p>
                {tab.label === "Posts" && (
                  <p className="ml-1 rounded-sm bg-gray-400 px-2 py-1 !text-tiny-medium text-gray-700">
                    {userInfo?.posts?.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {profileTabs.map((tab) => (
            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className="w-full text-gray-800"
            >
              {tab.value === "posts" && (
                <PostsTab
                  currentUserId={user.id}
                  accountId={userInfo.id}
                  accountType="User"
                />
              )}
              {tab.value === "replies" && (
                <RepliesTab accountId={userInfo._id.toString()} />
              )}
              {tab.value === "likes" && (
                <LikesTab accountId={userInfo._id.toString()} />
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

export default Page;
