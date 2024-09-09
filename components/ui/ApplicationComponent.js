"use client";

import { useState } from "react";
import { updateApplicationStatus } from "@/lib/actions";
import { toast } from "sonner";

function ApplicationComponent({ jobId, applicationId, status }) {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    await updateApplicationStatus(jobId, applicationId, currentStatus);
    setIsPending(false);
    toast.success("application updated", {
      position: "top-center",
      className: "bg-green-500",
      duration: 5000,
    });
  };
  return (
    <>
      {" "}
      <form onSubmit={handleSubmit}>
        <label className="mr-2 text-sm font-medium text-gray-700">
          Status:
        </label>

        <select
          name="status"
          onChange={(e) => {
            setCurrentStatus(e.target.value);
          }}
          className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={currentStatus}
        >
          <option value="applied">Applied</option>
          <option value="under_review">Under Review</option>
          <option value="rejected">Rejected</option>
          <option value="accepted">Accepted</option>
        </select>
        <button
          type="submit"
          disabled={isPending}
          className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-opacity-75"
        >
          Update
        </button>
      </form>
    </>
  );
}

export default ApplicationComponent;
