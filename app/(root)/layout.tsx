import { ClerkProvider } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";

import "../globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import Topbar from "@/components/shared/topbar";
import LeftSidebar from "@/components/shared/leftsidebar";
import Bottombar from "@/components/shared/bottombar";
import RightSidebar from "@/components/shared/rightsidebar";

import { fetchSuggestedPosts } from "@/lib/actions/post-actions";
import { fetchSuggestedUsers } from "@/lib/actions/user-actions";
import LandingPage from "@/components/shared/landing";

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
  const user = await currentUser();
  const posts = await fetchSuggestedPosts();
  const users = await fetchSuggestedUsers();

  if (!user) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body className={font.className}>
          <main>
            <section>
              <LandingPage />
            </section>
          </main>
        </body>
      </html>
    );
  }

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning={true}>
        <body className={font.className}>
          <Topbar />

          <main className="flex flex-row p-4">
            <section>
              <LeftSidebar />
            </section>

            <section className="main-container">
              <div className="w-full md:-ml-10 max-w-4xl">{children}</div>
            </section>
            <section>
              <RightSidebar posts={posts} users={users} />
            </section>
          </main>

          <section>
            <Bottombar />
          </section>
        </body>
      </html>
    </ClerkProvider>
  );
}
