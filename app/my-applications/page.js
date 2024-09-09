import { getAllApplicationsByUser } from "@/lib/api";

async function Page() {
  const { applications } = await getAllApplicationsByUser();
  console.log(applications);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        My Job Applications
      </h1>

      {/* No Applications Message */}
      {applications && applications.length === 0 ? (
        <div className="text-center text-gray-500">
          <p className="text-lg">You haven't applied for any jobs yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {applications?.map((application) => (
            <div
              key={application?._id}
              className="bg-white shadow rounded-lg p-6 border"
            >
              <div className="flex justify-between items-start">
                {/* Job Info */}
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {application?.job?.title || "Job title unavailable"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {application?.job?.location || "Location not specified"} |{" "}
                    {application?.job?.work_arrangement || "N/A"} |{" "}
                    {application?.job?.contract_type || "N/A"}
                  </p>
                  <p className="mt-2 text-gray-700">
                    Applied on:{" "}
                    {application?.applied_at
                      ? new Date(application.applied_at).toLocaleDateString()
                      : "Unknown"}
                  </p>
                </div>

                {/* Status Badge */}
                <div
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    application?.status === "applied"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {application?.status || "Status unknown"}
                </div>
              </div>

              {/* Cover Letter */}
              {application?.cover_letter && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-gray-800">
                    Cover Letter:
                  </h3>
                  <p className="text-sm text-gray-700 mt-1">
                    {application.cover_letter}
                  </p>
                </div>
              )}

              {/* Resume */}
              {application?.resume && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-gray-800">Resume:</h3>
                  <p className="text-sm text-blue-600 mt-1 underline cursor-pointer">
                    {application.resume}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Page;
