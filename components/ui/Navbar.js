import Link from "next/link";
import { auth, signOut } from "@/auth";
import { getUser } from "@/lib/api";

async function Navbar() {
  const session = await auth();
  const user = session?.user;
  const data = await getUser(user?.id);

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center h-auto py-4">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-dark-blue">
              MyApp
            </Link>
          </div>

          {/* Wrapping Links */}
          <div className="flex flex-wrap space-y-2 md:space-y-0 md:space-x-4 items-center">
            {!user ? (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-dark-blue px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="text-gray-700 hover:text-dark-blue px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                {user?.role === "job_seeker" && (
                  <>
                    <Link
                      href="/profile"
                      className="text-gray-700 hover:text-dark-blue px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/my-applications"
                      className="text-gray-700 hover:text-dark-blue px-3 py-2 rounded-md text-sm font-medium"
                    >
                      My Applications
                    </Link>
                    <Link
                      href="/saved-jobs"
                      className="text-gray-700 hover:text-dark-blue px-3 py-2 rounded-md text-sm font-medium"
                    >
                      View Saved Jobs
                    </Link>
                  </>
                )}
                {user?.role === "admin" && (
                  <Link
                    href="/admin"
                    className="text-gray-700 hover:text-dark-blue px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Admin
                  </Link>
                )}
                {user?.role === "employer" && (
                  <Link
                    href="/employer"
                    className="text-gray-700 hover:text-dark-blue px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Employer
                  </Link>
                )}
                <div className="flex items-center space-x-2">
                  <div>
                    <p className="text-lg font-semibold text-dark-gray">
                      {data?.data?.user?.name}
                    </p>
                  </div>
                </div>

                <form
                  action={async () => {
                    "use server";
                    await signOut({
                      redirect: true,
                      redirectTo: "/",
                    });
                  }}
                >
                  <button className="flex items-center gap-2 bg-light-blue text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-dark-blue transition-colors">
                    Sign Out
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
