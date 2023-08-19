import { redirect } from "next/navigation";

import { fetchUser, fetchUsers } from "@/lib/actions/user-actions";
import { currentUser } from "@clerk/nextjs";
import UserCard from "@/components/cards/usercard";

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchUsers({
    userId: user.id,
    searchTerm: "",
    pageNumber: 1,
    pageSize: 25,
  });

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>

      {/* Search Bar */}

      <div className="flex flex-col gap-8 mt-15">
        {result.users.length === 0 ? (
          <p className="text-center text-gray-700 !text-base-regular">
            No users found
          </p>
        ) : (
          <>
            {result.users.map((user) => (
              <UserCard
                key={user.id}
                id={user.id}
                name={user.name}
                username={user.username}
                imgUrl={user.image}
                userType="User"
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default Page;
