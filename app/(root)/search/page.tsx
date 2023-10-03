import { redirect } from "next/navigation";
import { fetchUser, fetchUsers } from "@/lib/actions/user-actions";
import { currentUser } from "@clerk/nextjs";
import UserCard from "@/components/cards/usercard";
import SearchBar from "@/components/shared/searchbar";
import Pagination from "@/components/shared/pagination";

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchUsers({
    userId: user.id,
    searchTerm: searchParams.q || "",
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 5,
  });

  return (
    <div>
      <h1 className="head-text mb-10">Search</h1>

      <SearchBar searchTerm="search" />

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

      <Pagination
        path="search"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </div>
  );
}

export default Page;
