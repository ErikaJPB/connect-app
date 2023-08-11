import Image from "next/image";
import Link from "next/link";
import {
  SignOutButton,
  SignedIn,
  UserButton,
  UserProfile,
} from "@clerk/nextjs";
import { TbLogout } from "react-icons/tb";

function Topbar() {
  return (
    <nav className="fixed top-0 z-30 flex w-full items-center justify-between px-6 py-3">
      <Link href="/" className="flex items-center gap-4 mx-6 mb-2 ">
        <Image
          src="/logo.svg"
          width={80}
          height={80}
          className="py-4 mr-4 ml-2 mx-4"
          alt="image"
        />
        <p className="font-heading1-bold text-black max-xs:hidden px-4 mx-4">
          Connect
        </p>
      </Link>

      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <TbLogout className="text-black" size={30} />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
        <UserButton />
      </div>
    </nav>
  );
}

export default Topbar;
