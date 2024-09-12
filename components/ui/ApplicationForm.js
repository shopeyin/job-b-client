"use client";
import { useActionState, useEffect } from "react";
import { sendJobApplication } from "@/lib/actions";
import { toast } from "sonner";

function ApplicationForm({ id }) {
  const [errorMessage, formAction, isPending] = useActionState(
    sendJobApplication.bind(null, id),
    undefined
  );

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage, {
        position: "top-center",
        className: "bg-red-500",
        duration: 5000,
      });
    }
  }, [errorMessage]);

  return (
    <>
      <form action={formAction} className="space-y-6">
        {/* Cover Letter */}
        <div>
          {" "}
          {id}
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
            {isPending ? "Submitting..." : " Submit Application"}
          </button>
        </div>
      </form>
    </>
  );
}

export default ApplicationForm;
