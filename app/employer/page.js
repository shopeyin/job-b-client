import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import CompanyProfileForm from "@/components/ui/CompanyProfileForm";
import { getActiveJobStat, getCompanyByCreator } from "@/lib/api";

export default async function EmployerDashboard() {
  const session = await auth();
  const user = session?.user;



  const [companyData, activeJobData] = await Promise.all([
    getCompanyByCreator(),
    getActiveJobStat(user?.token),
  ]);

  // Extract the company information from companyData
  const {
    user: { company },
  } = companyData;

  if (user?.role !== "employer") {
    redirect("/");
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-semibold text-gray-800">
            Welcome, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            Here's an overview of your hiring activities.
          </p>
        </section>
       
        <section className="bg-white p-8 rounded-lg shadow-md">
          <CompanyProfileForm company={company} />
        </section>

       
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-xl font-semibold text-gray-700">Active Jobs</h2>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {activeJobData.data.activeJobsCount}
            </p>
            <p className="text-gray-600 mt-1">Total active job postings</p>
            <Link
              href="/employer/manage-jobs"
              className="text-blue-500 mt-4 hover:underline"
            >
              Manage Jobs
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-xl font-semibold text-gray-700">
              Pending Applications
            </h2>
            <p className="text-3xl font-bold text-blue-600 mt-2">12</p>
            <p className="text-gray-600 mt-1">Applications awaiting review</p>
            <Link
              href="/employer/manage-applications"
              className="text-blue-500 mt-4 hover:underline"
            >
              Manage Applications
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-xl font-semibold text-gray-700">Candidates</h2>
            <p className="text-3xl font-bold text-blue-600 mt-2">8</p>
            <p className="text-gray-600 mt-1">Shortlisted candidates</p>
            <Link
              href="/employer/candidates"
              className="text-blue-500 mt-4 hover:underline"
            >
              View Candidates
            </Link>
          </div>
        </section>

        {/* Quick Actions Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/employer/manage-jobs/create-jobs"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-5 rounded-lg flex items-center justify-center"
            >
              Post New Job
            </Link>

            {/* <Link
              href="/employer/manage-applications"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-5 rounded-lg flex items-center justify-center"
            >
              View Applications
            </Link> */}
          </div>
        </section>
      </div>
    </div>
  );
}
