import { getSavedJobs } from "@/lib/api";

async function SavedJobs() {
  let { savedJobs } = await getSavedJobs();
 
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Saved Jobs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedJobs.map((savedJob) => (
          <div
            key={savedJob._id}
            className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
          >
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {savedJob.job.title}
              </h2>
              <p className="text-gray-500 text-sm">{savedJob.job.location}</p>
            </div>

            <p className="text-gray-700 mb-4">
              {savedJob.job.description.slice(0, 100)}...
            </p>

            <div className="mb-4">
              <span className="text-gray-700 font-medium">Salary:</span>{" "}
              <span className="text-gray-900">
                ${savedJob.job.salary.min} - ${savedJob.job.salary.max}
              </span>
            </div>

            <div className="mb-4">
              <span className="text-gray-700 font-medium">
                Work Arrangement:
              </span>{" "}
              <span className="text-gray-900">
                {savedJob.job.work_arrangement}
              </span>
            </div>

            <div className="mb-4">
              <span className="text-gray-700 font-medium">Contract Type:</span>{" "}
              <span className="text-gray-900">
                {savedJob.job.contract_type}
              </span>
            </div>

            <div className="mb-4">
              <span className="text-gray-700 font-medium">Posted on:</span>{" "}
              <span className="text-gray-900">
                {new Date(savedJob.job.created_at).toLocaleDateString()}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <a
                href={`/${savedJob.job._id}`}
                className="text-blue-500 hover:underline"
              >
                View Job
              </a>
              <span className="text-sm text-gray-500">
                Saved on: {new Date(savedJob.savedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedJobs;
