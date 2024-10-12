import { getAllApplicationsByUser } from "@/lib/api";

async function MyApplications() {
  const { applications } = await getAllApplicationsByUser();

  return (
    <div className="min-h-screen max-w-7xl mx-auto   py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-dark-blue mb-8 text-center">
        My Job Applications
      </h1>

      {/* No Applications Message */}
      {applications && applications.length === 0 ? (
        <div className="text-center text-gray-500">
          <p className="text-lg">You haven&apos;t applied for any jobs yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {applications?.map((application) => (
            <div
              key={application?._id}
              className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
            >
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
                {/* Job Info */}
                <div className="flex-1 mb-4 lg:mb-0">
                  <h2 className="text-2xl font-semibold text-dark-blue">
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
                      : application?.status === "rejected"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {application?.status || "Status unknown"}
                </div>
              </div>

              {/* Cover Letter */}
              {application?.cover_letter && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-dark-blue">
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
                  <h3 className="text-sm font-semibold text-dark-blue">
                    Resume:
                  </h3>
                  <a
                    href={application.resume}
                    target="_blank" // Opens the resume in a new tab
                    rel="noopener noreferrer"
                    className="text-sm text-teal underline mt-1"
                  >
                    View Resume
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyApplications;
