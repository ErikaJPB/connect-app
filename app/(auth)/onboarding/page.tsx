import AccountProfile from "@/components/forms/accountprofile";
import { fetchUser } from "@/lib/actions/user-actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (userInfo?.onboarded) redirect("/");

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };

  return (
    <main className="mx-auto flex flex-col max-w-3xl justify-start px-10 py-20">
      <h1 className="head-text">Onboarding</h1>
      <p className="mt-3 text-base-regular text-black">
        {" "}
        Please, complete your profile information to continue using Connect.
      </p>

      <section className="mt-9 bg-gray-100 p-10">
        <AccountProfile user={userData} btnTittle="Continue" />
      </section>
    </main>
  );
}

export default Page;