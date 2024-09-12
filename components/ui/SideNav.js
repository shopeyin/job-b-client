import Link from "next/link";


// export default function SideNav() {
//   return (
//     <nav className="w-64 bg-gray-800 text-gray-300">
//       <div className="p-6">
//         <h2 className="text-xl font-bold text-white">Employer Panel</h2>
//       </div>
//       <ul className="space-y-4">
//         {/* Manage Jobs */}
//         <li>
//           <Link
//             href="/employer/manage-jobs"
//             className="flex items-center px-4 py-2 text-white hover:bg-gray-700"
//           >
//             <BriefCaseIcon className="h-6 w-6 mr-3" />
//             Manage Jobs
//           </Link>
//         </li>

//         {/* Manage Applications */}
//         <li>
//           <Link
//             href="/employer/manage-applications"
//             className="flex items-center px-4 py-2 text-white hover:bg-gray-700"
//           >
//             <ClipBoardIcon className="h-6 w-6 mr-3" />
//             Manage Applications
//           </Link>
//         </li>

//         {/* Candidates */}
//         <li>
//           <Link
//             href="/employer/candidates"
//             className="flex items-center px-4 py-2 text-white hover:bg-gray-700"
//           >
//             <UsersIcon className="h-6 w-6 mr-3" />
//             Candidates
//           </Link>
//         </li>
//       </ul>
//     </nav>
//   );
// }

export default function SideNav({ title, navItems }) {
  return (
    <nav className="w-64 bg-gray-800 text-gray-300">
      <div className="p-6">
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>
      <ul className="space-y-4">
        {navItems.map((item, index) => (
          <li key={index}>
            <Link
              href={item.href}
              className="flex items-center px-4 py-2 text-white hover:bg-gray-700"
            >
              {item.icon && <item.icon className="h-6 w-6 mr-3" />}
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
