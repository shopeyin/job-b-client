import JobSeekerSearch from "@/components/ui/JobSeekerSearch";
import { fetchJobseekers } from "@/lib/api";

export const revalidate = 0;

async function Candidates({ searchParams }) {
  const params = new URLSearchParams(searchParams);
  const queryString = params.toString();

 
  const data = await fetchJobseekers(queryString);

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold text-center mb-8">Job Seekers</h1>
      <JobSeekerSearch totalPages={data.totalPages} />
    
      <div className="grid grid-cols-1 sm:grid-cols-2 mt-8 lg:grid-cols-3 gap-6">
        {data?.data?.jobSeekers.map((jobSeeker) => (
          <div
            key={jobSeeker._id}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-3">{jobSeeker?.name}</h2>

           
            {jobSeeker?.email && (
              <p className="text-gray-600 mb-2">
                <span className="font-bold">Email:</span> {jobSeeker?.email}
              </p>
            )}

           
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

          
            <div className="mt-4">
              <a
                href={`/employer/candidates/${jobSeeker?._id}`}
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
