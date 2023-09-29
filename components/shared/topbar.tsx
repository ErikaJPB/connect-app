import Image from "next/image";
import Link from "next/link";
import { SignOutButton, SignedIn, UserButton } from "@clerk/nextjs";
import { TbLogout } from "react-icons/tb";

function Topbar() {
  return (
    <nav className="top-bar">
      <Link href="/" className="flex items-center gap-6 ">
        <Image
          src="/logo.svg"
          width={80}
          height={80}
          className="py-4 mr-4 ml-2 mx-4"
          alt="image"
        />
        <p className="font-heading1-bold text-9xl text-black max-xs:hidden">
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
