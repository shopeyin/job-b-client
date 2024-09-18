import ApplicationComponent from "@/components/ui/ApplicationComponent";

import { getAllApplicationsByJob } from "@/lib/api";

async function Applications({ params: { id } }) {
  const applications = await getAllApplicationsByJob(id);

  return (
    <div className="max-w-7xl mx-auto p-4">
      {applications.length === 0 ? (
        <div className="text-center text-gray-600">No applications found.</div>
      ) : (
        <div className="space-y-6">
          {applications.map((app) => (
            <div
              key={app._id}
              className="border border-gray-200 p-6 rounded-lg shadow-md"
            >
              {/* Job Details */}
              <h2 className="text-xl font-semibold mb-2">{app.job.title}</h2>
              <p className="text-gray-600 mb-4">{app.job.description}</p>

              {/* Applicant Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Applicant</h3>
                  <p className="text-gray-700">{app.applicant.name}</p>
                  <p className="text-gray-500">{app.applicant.email}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Resume</h3>
                  <a
                    href={app.resume}
                    target="_blank" // Opens the resume in a new tab
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 mt-1 underline cursor-pointer"
                  >
                    View Resume
                  </a>
                </div>
              </div>

              {/* Cover Letter */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Cover Letter</h3>
                <p className="text-gray-700">{app.cover_letter}</p>
              </div>

              {/* Application Status */}
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Applied on:{" "}
                  <span className="font-medium text-gray-700">
                    {new Date(app.applied_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-sm">
                  <ApplicationComponent
                    jobId={id}
                    applicationId={app._id}
                    status={app.status}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Applications;
