import { auth } from "@/auth";
import { getJobStat, getUserStat } from "@/lib/api";
import { redirect } from "next/navigation";
import React from "react";

async function Admin() {
  const session = await auth();
  const user = session?.user;
  if (user?.role !== "admin") {
    redirect("/");
  }

  // Fetch both job and user stats concurrently using Promise.all
  const [jobStat, userStat] = await Promise.all([
    getJobStat(user.token),
    getUserStat(user.token),
  ]);

  const { totalJobs, activeJobs } = jobStat.data;
  const { totalUsers, roleStats, activeUsers } = userStat.data.stats[0]; // Assuming stats is an array

  return (
    <main className="flex-1 p-10 bg-white">
      <h1 className="text-3xl font-bold text-dark-blue mb-6">
        Welcome, {user?.name}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Dashboard Cards */}
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-dark-gray">Total Jobs</h2>
          <p className="mt-4 text-3xl font-bold">{totalJobs}</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-dark-gray">Total Users</h2>
          <p className="mt-4 text-3xl font-bold">{totalUsers[0]?.total}</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-dark-gray">Active Jobs</h2>
          <p className="mt-4 text-3xl font-bold">{activeJobs}</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-dark-gray">Active Users</h2>
          <p className="mt-4 text-3xl font-bold">
            {activeUsers[0]?.activeCount}
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-dark-gray">Job Seekers</h2>
          <p className="mt-4 text-3xl font-bold">
            {roleStats.find((role) => role._id === "job_seeker")?.count}
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-dark-gray">Employers</h2>
          <p className="mt-4 text-3xl font-bold">
            {roleStats.find((role) => role._id === "employer")?.count}
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-dark-gray">Admins</h2>
          <p className="mt-4 text-3xl font-bold">
            {roleStats.find((role) => role._id === "admin")?.count}
          </p>
        </div>
      </div>
    </main>
  );
}

export default Admin;
