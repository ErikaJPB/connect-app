import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import {
  fetchUser,
  getActivityLikes,
  getActivityReplies,
} from "@/lib/actions/user-actions";
import { User } from "@/types";

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const repliesActivity = await getActivityReplies(userInfo._id);

  const likesActivity = await getActivityLikes(userInfo._id);

  return (
    <div>
      <h1 className="head-text mb-10">Activity</h1>

      <div className="flex flex-col mt-10 gap-5">
        {repliesActivity.length > 0 ? (
          <>
            {repliesActivity.map((activityItem) => (
              <Link
                key={activityItem._id}
                href={`/post/${activityItem.parentId}`}
              >
                <div className="flex items-center gap-2 rounded-md bg-secondary px-7 py-4">
                  <div className="relative h-8 w-8 object-cover">
                    <Image
                      src={activityItem.author.image}
                      alt="Profile Image"
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <p className="!text-small-regular text-gray-600">
                    <span className="mr-1 text-primary">
                      {activityItem.author.name}
                    </span>
                    {activityItem.isLike ? (
                      <>Liked your post</>
                    ) : (
                      <>Replied to your post</>
                    )}
                  </p>
                </div>
              </Link>
            ))}
          </>
        ) : (
          <p>No activity yet!</p>
        )}
      </div>

      <div className="flex flex-col mt-5 gap-5">
        {likesActivity.length > 0 ? (
          likesActivity.map((activityLike) =>
            activityLike.likedBy.map((user: any) => (
              <Link key={user._id} href={`/post/${activityLike._id}`}>
                <div className="flex items-center gap-2 rounded-md bg-secondary px-7 py-4">
                  <div className="relative h-8 w-8 object-cover">
                    <Image
                      src={user.image}
                      alt="Profile Image"
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <p className="!text-small-regular text-gray-600">
                    <span className="mr-1 text-primary">{user.name}</span> Liked
                    your post
                  </p>
                </div>
              </Link>
            ))
          )
        ) : (
          <p>No likes yet!</p>
        )}
      </div>
    </div>
  );
};

export default Page;
