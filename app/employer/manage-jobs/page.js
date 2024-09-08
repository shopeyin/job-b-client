import { deleteJob } from "@/lib/actions";
import { getAllJobsByCompany } from "@/lib/api";
import Link from "next/link";

async function ManageJobs() {
  let { jobs } = await getAllJobsByCompany();

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6">Manage Jobs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                <p className="text-gray-700 mb-2">{job.description}</p>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Location:</span>{" "}
                  {job.location}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Industry:</span>{" "}
                  {job.industry}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Work Arrangement:</span>{" "}
                  {job.work_arrangement}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Contract Type:</span>{" "}
                  {job.contract_type}
                </p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <Link href={`manage-jobs/edit-jobs/${job._id}`}> Edit</Link>
                <form action={deleteJob}>
                  <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-red-500 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                    <input type="hidden" name="id" value={job._id} />
                    <div className="">Delete Job</div>
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ManageJobs;
