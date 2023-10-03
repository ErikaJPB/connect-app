import Link from "next/link";
import Image from "next/image";
import { BsFillReplyAllFill } from "react-icons/bs";
import LikeButton from "../buttons/likebutton";
import RepostButton from "../buttons/repostbutton";
import ActionButton from "../buttons/actionbutton";

interface Props {
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
  comments: {
    _id: string;
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
  isLiked?: boolean;
  userId: string;
  postId: string;
  isReposted?: boolean;
  repostAuthorName?: string[];
}

const PostCard = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  createdAt,
  comments,
  isComment,
  isLiked,
  userId,
  postId,
  isReposted,
  repostAuthorName = [],
}: Props) => {
  const isAuthorCurrentUser = author.id === currentUserId;

  console.log;

  return (
    <div
      className={`flex flex-col w-full rounded-xl ${
        isComment ? "px-0 xs:px-7" : "bg-secondary p-7"
      }`}
    >
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

            <div
              className={`${
                isComment && "mb-2 py-1"
              } flex flex-col mt-4 py-2 gap-3`}
            >
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

              {isComment && comments.length > 0 && (
                <Link href={`/post/${id}`}>
                  <p className="mt-1 text-subtle-medium text-gray-400">
                    {comments.length}replies
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
