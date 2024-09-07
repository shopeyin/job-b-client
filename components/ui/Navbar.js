// "use client";
// import React from "react";
// import { useAuth } from "../context/AuthContext";
// import Link from "next/link";
// // import { auth, signOut } from "@/auth";

// function Navbar() {
//   const { authState, logout, loading } = useAuth();
//   const { user } = authState;

//   return (
//     <nav className="bg-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex-shrink-0">
//             <Link href="/" className="text-2xl font-bold text-blue-600">
//               MyApp
//             </Link>
//           </div>

//           {!loading ? (
//             <div className="flex space-x-4">
//               <>
//                 {!user ? (
//                   <>
//                     <Link
//                       href="/login"
//                       className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
//                     >
//                       Login
//                     </Link>
//                     <Link
//                       href="/signup"
//                       className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
//                     >
//                       Sign Up
//                     </Link>
//                   </>
//                 ) : (
//                   <>
//                     {user?.role === "job_seeker" && (
//                       <Link
//                         href="/profile"
//                         className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
//                       >
//                         Profile
//                       </Link>
//                     )}
//                     {user?.role === "admin" && (
//                       <Link
//                         href="/admin"
//                         className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
//                       >
//                         Admin
//                       </Link>
//                     )}
//                     {user?.role === "employer" && (
//                       <div className="flex items-center">
//                         {" "}
//                         <h1 className="text-sm text-gray-600">{user?.name}</h1>
//                         <Link
//                           href="/employer"
//                           className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
//                         >
//                           Employer
//                         </Link>
//                       </div>
//                     )}
//                     <h1 className="text-sm text-gray-600">{user?.name}</h1>
//                     <button
//                       onClick={logout}
//                       className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
//                     >
//                       Sign Out
//                     </button>
//                   </>
//                 )}
//               </>
//             </div>
//           ) : (
//             "Loading"
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import React from "react";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import { auth, signOut } from "@/auth";
import { getUser } from "@/lib/api";

async function Navbar() {
  const session = await auth();
  const user = session?.user;
  const  data  = await getUser(user?.id);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              MyApp
            </Link>
          </div>

          <div className="flex space-x-4">
            <>
              {!user ? (
                <>
                  <Link
                    href="/login"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  {user?.role === "job_seeker" && (
                    <Link
                      href="/profile"
                      className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Profile
                    </Link>
                  )}
                  {user?.role === "admin" && (
                    <Link
                      href="/admin"
                      className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Admin
                    </Link>
                  )}
                  {user?.role === "employer" && (
                    <div className="flex items-center">
                      {" "}
                      <Link
                        href="/employer"
                        className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Employer
                      </Link>
                    </div>
                  )}
                  <h1 className="text-sm text-gray-600">{user?.name}</h1>
                  {data?.data?.user?.name}
                  <form
                    action={async () => {
                      "use server";
                      await signOut({
                        redirect: true,
                        redirectTo: "/",
                      });
                    }}
                  >
                    <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                      <div className="">Sign Out</div>
                    </button>
                  </form>
                </>
              )}
            </>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
