import Image from "next/image";
import Link from "next/link";
import {
  OrganizationSwitcher,
  SignOutButton,
  SignedIn,
  UserButton,
  UserProfile,
} from "@clerk/nextjs";
import { TbLogout } from "react-icons/tb";
import { dark } from "@clerk/themes";

function Topbar() {
  return (
    <nav className="fixed top-0 z-30 flex w-full items-center justify-between bg-dark-4 px-6 py-3">
      <Link href="/" className="flex items-center gap-4 ">
        <Image src="/logo.svg" width={25} height={25} alt="image" />
        <p className="text-heading2-bold text-white max-xs:hidden">Connect</p>
      </Link>

      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <TbLogout className="text-white" size={30} />
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
