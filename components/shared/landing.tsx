import Link from "next/link";
import Image from "next/image";

const LandingPage = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center text-center min-h-screen bg-white gap-8">
      <div className="flex flex-col text-heading4-medium text-center items-center max-w-md gap-2 px-8">
        <div className="mb-4 py-6">
          <Image
            src="/logo.svg"
            alt="Vector Logo"
            width={100}
            height={100}
            className="mb-4 py-6 items-center"
          />
        </div>
        <h1 className="font-bold text-heading1-semibold text-center">
          Welcome to Connect.
        </h1>
        <p className="font-3xl font-semibold text-center">
          A new Social Network.
        </p>

        <p className="text-lg text-gray-600 mb-8">
          Connect with friends and share your thoughts.
        </p>
        <div className="space-x-4">
          <button
            className="bg-secondary hover:bg-primary hover:text-white hover:font-semibold
              text-black rounded-md p-3"
          >
            <Link href="/sign-in">Sign In</Link>
          </button>

          <button className="bg-secondary hover:bg-primary hover:text-white hover:font-semibold text-black rounded-md p-3">
            <Link href="/sign-up">Sign Up</Link>
          </button>
        </div>
      </div>

      <div className="lg:hidden justify-center items-center">
        <Image
          src="/connect-people.png"
          alt="People Vector"
          width={400}
          height={300}
        />
      </div>
      <div className="hidden lg:flex justify-center items-center">
        <Image
          src="/connect-people.png"
          alt="People Vector"
          width={1000}
          height={800}
        />
      </div>
    </div>
  );
};

export default LandingPage;
