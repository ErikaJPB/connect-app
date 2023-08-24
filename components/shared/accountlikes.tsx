import { fetchUserLikes } from "@/lib/actions/user-actions";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

const AccountLikes = async ({
  currentUserId,
  accountId,
  accountType,
}: Props) => {
  let result = await fetchUserLikes(currentUserId);

  if (!result) redirect("/");

  return <div>accountlikes</div>;
};

export default AccountLikes;
