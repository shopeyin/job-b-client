import { getSavedJobs } from "@/lib/api";
import { JobCard } from "@/components/ui/JobCard";

async function SavedJobs() {
  let { savedJobs } = await getSavedJobs();

  if (!savedJobs) {
    savedJobs = [];
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-extrabold text-dark-blue mb-8 text-center">
        Saved Jobs
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {savedJobs.length === 0 ? (
          <p className="text-center text-gray-500">
            You have no saved jobs at the moment.
          </p>
        ) : (
          savedJobs.map((savedJob) => (
            <JobCard
              key={savedJob?._id}
              job={savedJob?.job}
              savedAt={savedJob?.savedAt}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default SavedJobs;
