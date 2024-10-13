import DeleteJob from "@/components/ui/DeleteJob";
import ViewJobModal from "@/components/ui/ViewJobModal";
import { getAllJobs } from "@/lib/api";
import React from "react";

async function Jobs() {
  let data = await getAllJobs();
  const { jobs } = data;
 
  return (
    <div>
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-semibold mb-6">Jobs Management</h1>
        {jobs.length} jobs

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-4 px-6 font-medium text-gray-700">Title</th>
                <th className="py-4 px-6 font-medium text-gray-700">Company</th>
                <th className="py-4 px-6 font-medium text-gray-700">Status</th>
                <th className="py-4 px-6 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 border-t">{job.title}</td>
                  <td className="py-4 px-6 border-t">{job.company.name}</td>
                  <td className="py-4 px-6 border-t">{job?.status}</td>
                  <td className="py-4 px-6 border-t flex space-x-4">
                    {/* <button className="bg-blue-500 text-white px-4 py-1 rounded">
                      Edit
                    </button> */}

                    <ViewJobModal job={job} />
                    <DeleteJob job={job} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

   
      </div>
    </div>
  );
}

export default Jobs;
