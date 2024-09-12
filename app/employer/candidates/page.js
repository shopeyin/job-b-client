import { fetchJobseekers } from "@/lib/api";

async function Candidates() {
  const { jobSeekers } = await fetchJobseekers();
  console.log(jobSeekers);
  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold text-center mb-8">Job Seekers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobSeekers.map((jobSeeker) => (
          <div
            key={jobSeeker._id}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-3">{jobSeeker?.name}</h2>

            {/* Check if email is not null or undefined */}
            {jobSeeker?.email && (
              <p className="text-gray-600 mb-2">
                <span className="font-bold">Email:</span> {jobSeeker?.email}
              </p>
            )}

            {/* Check if skills array exists and has at least one skill */}
            {jobSeeker?.skills?.length > 0 && (
              <>
                <h3 className="text-xl font-medium mt-3">Skills</h3>
                <ul className="flex flex-wrap gap-2 text-gray-600">
                  {jobSeeker?.skills?.map((skill, idx) => (
                    <li
                      key={idx}
                      className="bg-gray-200 px-3 py-1 rounded-full"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* Link to job seeker details */}
            <div className="mt-4">
              <a
                href={`/job-seekers/${jobSeeker?._id}`}
                className="text-indigo-500 hover:underline"
              >
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Candidates;
