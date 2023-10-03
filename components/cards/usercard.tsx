"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  userType: string;
}

function UserCard({ id, name, username, imgUrl, userType }: Props) {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-between gap-4 max-xs:rounded-xl max-xs:bg-dark-3 max-xs:p-4 xs:flex-row xs:items-center">
      <div className="flex flex-1 items-start justify-start gap-3 xs:items-center">
        <div className="relative h-12 w-12 object-cover">
          <Image
            src={imgUrl}
            alt="User Image"
            fill
            className="rounded-full object-cover shadow-xl"
          />
        </div>

        <div className="flex-1 text-ellipsis">
          <h4 className="text-base-semibold text-gray-800">{name}</h4>
          <p className="text-small-medium text-gray-700">@{username}</p>
        </div>
      </div>

      <Button
        className="user-card-btn"
        onClick={() => router.push(`/profile/${id}`)}
      >
        View
      </Button>
    </div>
  );
}

export default UserCard;
