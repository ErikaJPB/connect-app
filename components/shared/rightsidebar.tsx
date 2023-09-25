import React from "react";
import Image from "next/image";

interface RightSidebarProps {
  posts: Record<string, any>;
  users: Record<string, any>;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ posts, users }) => {
  return (
    <section className="custom-scrollbar right-sidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium font-semibold text-center text-light-2 mb-4">
          Suggested Post
        </h3>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts yet.</p>
        ) : (
          <ul>
            {posts?.map((post: typeof posts) => (
              <li key={post.id} className="mb-4">
                <div className="rounded-lg overflow-hidden border border-gray-300 p-4">
                  <div className="flex items-center mb-2">
                    <div className="relative h-10 w-10 object-cover mr-2">
                      <Image
                        src={post.author.image}
                        alt={post.author.username}
                        fill
                        className="rounded-full object-cover shadow-xl"
                      />
                    </div>
                    <div className="font-bold">{post.author.username}</div>
                  </div>
                  <div>{post.text}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium font-semibold text-center text-light-2 mb-4">
          Suggested Users
        </h3>
        {users.length === 0 ? (
          <p className="text-center text-gray-500">No users yet.</p>
        ) : (
          <ul>
            {users?.map((user: typeof users) => (
              <li key={user.id} className="mb-4">
                <div className="rounded-lg overflow-hidden border border-gray-300 p-4">
                  <div className="flex items-center mb-2">
                    <div className="relative h-10 w-10 object-cover mr-2">
                      <Image
                        src={user.image}
                        alt={user.username}
                        fill
                        className="rounded-full object-cover shadow-xl"
                      />
                    </div>
                    <div className="font-bold">{user.username}</div>
                  </div>
                  <div>{user.bio}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default RightSidebar;
