import Link from "next/link";

export const metadata = {
  title: "Employer Dashboard - Manage Jobs",
  description: "Manage your job postings effectively",
};

export default function ManageJobsLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-full mx-auto px-6">
        {/* Header Section */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Jobs</h1>

        {/* Horizontal Navigation */}
        <nav className="bg-white shadow rounded-lg">
          <ul className="flex space-x-6 px-6 py-4 text-gray-700 font-medium">
            <li>
              <Link
                href="/employer/manage-jobs"
                className="hover:text-blue-600"
              >
                View All Jobs
              </Link>
            </li>
            <li>
              <Link
                href="/employer/manage-jobs/create-jobs"
                className="hover:text-blue-600"
              >
                Create Job
              </Link>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="mt-6 bg-white shadow rounded-lg p-6">{children}</main>
      </div>
    </div>
  );
}
