import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import CompanyProfileForm from "@/components/ui/CompanyProfileForm";

export default async function EmployerDashboard() {
  const session = await auth();
  const user = session?.user;

  console.log(user);

  if (user?.role !== "employer") {
    redirect("/");
  }
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <CompanyProfileForm />

        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">
            Welcome, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Here's an overview of your hiring activities.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Active Jobs */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">Active Jobs</h2>
            <p className="text-3xl font-bold text-blue-600">5</p>
            <p className="text-gray-600">Total active job postings</p>
            <Link
              href="/employer/manage-jobs"
              className="text-blue-500 mt-4 block hover:underline"
            >
              Manage Jobs
            </Link>
          </div>

          {/* Pending Applications */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">
              Pending Applications
            </h2>
            <p className="text-3xl font-bold text-blue-600">12</p>
            <p className="text-gray-600">Applications awaiting review</p>
            <Link
              href="/employer/manage-applications"
              className="text-blue-500 mt-4 block hover:underline"
            >
              Manage Applications
            </Link>
          </div>

          {/* Candidates */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">Candidates</h2>
            <p className="text-3xl font-bold text-blue-600">8</p>
            <p className="text-gray-600">Shortlisted candidates</p>
            <Link
              href="/employer/candidates"
              className="text-blue-500 mt-4 block hover:underline"
            >
              View Candidates
            </Link>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Recent Activity
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ul className="space-y-4">
              <li className="flex justify-between">
                <span className="text-gray-700">
                  Posted a new job for "Software Engineer"
                </span>
                <span className="text-sm text-gray-500">2 days ago</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-700">
                  Scheduled an interview with "John Doe"
                </span>
                <span className="text-sm text-gray-500">3 days ago</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-700">
                  Marked "Data Analyst" position as filled
                </span>
                <span className="text-sm text-gray-500">5 days ago</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Post New Job */}
            <Link
              href="/employer/manage-jobs/new"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-5 rounded-lg flex items-center justify-center"
            >
              Post New Job
            </Link>

            {/* View Applications */}
            <Link
              href="/employer/manage-applications"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-5 rounded-lg flex items-center justify-center"
            >
              View Applications
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
