import { formatDateToYYYYMMDD } from "@/lib/utils";

export const JobCard = ({ job, savedAt }) => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg p-6 border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          {job?.title || "Job title unavailable"}
        </h2>
        <p className="text-gray-500 text-sm">
          {job?.location || "Location not specified"}
        </p>
      </div>

      <p className="text-gray-700 mb-4">
        {job?.description
          ? job.description.slice(0, 100)
          : "Description not available"}
        ...
      </p>

      <div className="mb-4">
        <span className="text-gray-700 font-medium">Salary:</span>{" "}
        <span className="text-gray-900">
          ${job?.salary?.min || "N/A"} - ${job?.salary?.max || "N/A"}
        </span>
      </div>

      <div className="mb-4">
        <span className="text-gray-700 font-medium">Work Arrangement:</span>{" "}
        <span className="text-gray-900">
          {job?.work_arrangement || "Not specified"}
        </span>
      </div>

      <div className="mb-4">
        <span className="text-gray-700 font-medium">Contract Type:</span>{" "}
        <span className="text-gray-900">
          {job?.contract_type || "Not specified"}
        </span>
      </div>

      <div className="mb-4">
        <span className="text-gray-700 font-medium">Posted on:</span>{" "}
        <span className="text-gray-900">
          {job?.created_at ? formatDateToYYYYMMDD(job.created_at) : "Unknown"}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <a
          href={`/${job?._id || "#"}`}
          className="text-light-blue hover:underline hover:text-dark-blue font-medium transition-colors"
        >
          View Job
        </a>
        <span className="text-sm text-gray-500">
          Saved on: {savedAt ? formatDateToYYYYMMDD(savedAt) : "Unknown"}
        </span>
      </div>
    </div>
  );
};
