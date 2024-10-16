"use client";
import { useActionState, useEffect } from "react";
import { sendJobApplication } from "@/lib/actions";
import { toast } from "sonner";

function ApplicationForm({ id }) {
  const [formState, formAction, isPending] = useActionState(
    sendJobApplication.bind(null, id),
    undefined
  );

  useEffect(() => {
    if (formState?.errors?.resume) {
      toast.error(formState?.errors?.resume.join(", "), {
        position: "top-center",
        className: "bg-red-500",
        duration: 5000,
      });
    }
  }, [formState?.errors?.resume]);
console.log(formAction)
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-white shadow-lg rounded-lg">
     
      <form action={formAction} className="space-y-6">
        {formState?.errors?.err && (
          <p className="text-red-600 text-sm mb-4">{formState?.errors?.err}</p>
        )}
        {/* Cover Letter */}
        <div>
          {formState?.errors?.cover_letter && (
            <p className="text-red-600 text-sm mb-2">
              {formState?.errors?.cover_letter.join(", ")}
            </p>
          )}
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
              className="block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Write your cover letter here..."
              defaultValue={formState?.fieldData?.cover_letter}
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
              type="file"
              id="resume"
              name="resume"
              accept=".pdf,.doc,.docx"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
          >
            {isPending ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ApplicationForm;
