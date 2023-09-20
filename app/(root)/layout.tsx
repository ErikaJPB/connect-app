import { ClerkProvider } from "@clerk/nextjs";

import "../globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import Topbar from "@/components/shared/topbar";
import LeftSidebar from "@/components/shared/leftsidebar";
import Bottombar from "@/components/shared/bottombar";
import RightSidebar from "@/components/shared/rightsidebar";

import { fetchSuggestedPosts } from "@/lib/actions/post-actions";
import { fetchSuggestedUsers } from "@/lib/actions/user-actions";

const font = Roboto({ weight: "400", preload: false });

export const metadata: Metadata = {
  title: "Connect",
  description: "A social media App",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const posts = await fetchSuggestedPosts();
  const users = await fetchSuggestedUsers();

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <Topbar />

          <main className="flex flex-row p-4  ">
            <LeftSidebar />
            <section className="main-container">
              <section className="w-full md:-ml-10 max-w-4xl">
                {children}
              </section>
            </section>
            <RightSidebar posts={posts} users={users} />
          </main>

          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  );
}
