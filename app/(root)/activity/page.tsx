import { redirect } from "next/navigation";

import { fetchUser, getActivity } from "@/lib/actions/user-actions";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const activity = await getActivity(userInfo._id);

  return (
    <section>
      <h1 className="head-text mb-10">Activity</h1>

      <section className="flex flex-col mt-10 gap-5">
        {activity.length > 0 ? (
          <>
            {activity.map((activity) => (
              <Link key={activity._id} href={`/post/${activity.parentId}`}>
                <article className="flex items-center gap-2 rounded-md bg-secondary px-7 py-4">
                  <div className="relative h-8 w-8 object-cover">
                    <Image
                      src={activity.author.image}
                      alt="Profile Image"
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <p className="!text-small-regular text-gray-600">
                    <span className="mr-1 text-primary">
                      {activity.author.name}
                    </span>{" "}
                    Replied to your post
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p>No activity yet!</p>
        )}
      </section>
    </section>
  );
};

export default Page;