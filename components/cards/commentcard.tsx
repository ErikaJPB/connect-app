import Link from "next/link";
import Image from "next/image";
import { BsFillReplyAllFill } from "react-icons/bs";
import LikeButton from "../buttons/likebutton";
import RepostButton from "../buttons/repostbutton";
import ActionButton from "../buttons/actionbutton";

interface CommentProps {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    username: string;
    name: string;
    image: string;
    id: string;
  };
  createdAt: string;
  isLiked?: boolean;
  userId: string;
  postId: string;
  isReposted?: boolean;
  repostAuthorName?: string[];
}

const CommentCard = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  createdAt,
  isLiked,
  userId,
  postId,
  isReposted,
  repostAuthorName = [],
}: CommentProps) => {
  const isAuthorCurrentUser = author.id === currentUserId;

  return (
    <div className="flex flex-col w-full bg-white rounded-xl p-7">
      <div className="flex items-start justify-between">
        <div className="flex flex-1 flex-row w-full gap-4 ">
          <div className="flex flex-col items-center">
            <Link
              href={`/profile/${author?.id}`}
              className="relative h-12 w-12"
            >
              <Image
                src={author?.image}
                alt="Profile Image"
                fill
                className="rounded-full cursor-pointer"
              />
            </Link>

            <div className="mt-2 relative w-0.5 grow rounded-full bg-neutral-600" />
          </div>

          <div className="flex flex-col w-full">
            <Link href={`/profile/${author?.id}`} className="w-fit">
              <h4 className="cursor-pointer text-gray-700 text-base-semibold">
                {author?.username}
              </h4>
            </Link>

            <p className="mt-2 text-base-medium text-gray-800">{content}</p>

            <div className="flex flex-col mt-4 gap-3">
              <div className="flex gap-3">
                <LikeButton
                  isLiked={isLiked || false}
                  userId={userId}
                  postId={postId}
                />

                <Link href={`/post/${id}`}>
                  <BsFillReplyAllFill
                    size={25}
                    className="text-black cursor-pointer object-contain"
                  />
                </Link>

                <RepostButton
                  isReposted={isReposted || false}
                  userId={userId}
                  postId={postId}
                />

                {isAuthorCurrentUser && (
                  <ActionButton
                    postId={postId}
                    userId={userId}
                    content={content}
                  />
                )}
              </div>

              {isReposted && repostAuthorName.length > 0 && (
                <p className="mt-2 text-base-medium text-gray-400">
                  Reposted by {repostAuthorName?.join(", ")}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
