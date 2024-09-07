import { sendJobApplication } from "@/lib/actions";
import { getJob } from "@/lib/api";

async function Apply({ params }) {
  const { data, status, results } = await getJob(params.id);
  const { title } = data.job;
  const applyJobWithId = sendJobApplication.bind(null, params.id);
  return (
    <div className="max-w-2xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Apply for {title}
      </h1>

      <form action={applyJobWithId} className="space-y-6">
        {/* Cover Letter */}
        <div>
          <label
            htmlFor="coverLetter"
            className="block text-sm font-medium text-gray-700"
          >
            Cover Letter
          </label>
          <div className="mt-1">
            <textarea
              id="coverLetter"
              name="coverLetter"
              rows={6}
              className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Write your cover letter here..."
              // value={coverLetter}
              required
            />
          </div>
        </div>

        {/* Resume Upload */}
        <div>
          <label
            htmlFor="resume"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Resume
          </label>
          <div className="mt-1 flex items-center">
            <input
              type="text"
              id="resume"
              name="resume"
              accept=".pdf,.doc,.docx"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
            {/* <input
              type="file"
              id="resume"
              name="resume"
              accept=".pdf,.doc,.docx"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            /> */}
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
}

export default Apply;
