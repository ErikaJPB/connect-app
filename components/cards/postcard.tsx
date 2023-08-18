import Link from "next/link";
import Image from "next/image";
import { AiOutlineHeart } from "react-icons/ai";
import { BsFillReplyAllFill } from "react-icons/bs";
import { BiRepost } from "react-icons/bi";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
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
}: Props) => {
  return (
    <article
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
                src={author.image}
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
                {author?.name}
              </h4>
            </Link>

            <p className="mt-2 text-base-medium text-gray-800">{content}</p>

            <div className={`${isComment && "mb-10"} flex flex-col mt-5 gap-3`}>
              <div className="flex gap-3">
                <AiOutlineHeart
                  size={25}
                  className="text-black cursor-pointer object-contain"
                />

                <Link href={`/post/${id}`}>
                  <BsFillReplyAllFill
                    size={25}
                    className="text-black cursor-pointer object-contain"
                  />
                </Link>

                <BiRepost
                  size={25}
                  className="text-black cursor-pointer object-contain"
                />
              </div>
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
    </article>
  );
};

export default PostCard;
