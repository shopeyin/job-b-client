"use client";
import React, { useActionState, useState, useEffect } from "react";
function ViewJobModal({ job }) {
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const handleView = () => {
    setViewModalOpen(true);
  };
  const handleClose = () => {
    setViewModalOpen(false);
  };
  return (
    <>
      <button
        onClick={handleView}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
      >
        View Job
      </button>

      {isViewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              {job.title}
            </h2>

            <div className="space-y-4">
              {/* Company and Location */}
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-600">
                  {job.company.name}
                </span>
                <span className="text-gray-500">{job.location}</span>
              </div>

              {/* Salary Range */}
              <div className="text-gray-600">
                <strong>Salary:</strong> ${job.salary.min} - ${job.salary.max}{" "}
                USD
              </div>

              {/* Work Arrangement and Contract Type */}
              <div className="text-gray-600 capitalize">
                <strong>Work Arrangement:</strong> {job.work_arrangement}
              </div>
              <div className="text-gray-600 capitalize">
                <strong>Contract Type:</strong> {job.contract_type}
              </div>

              {/* Job Description */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Job Description:</h3>
                <p className="text-gray-700">{job.description}</p>
              </div>

              {/* Requirements */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Requirements:</h3>
                <ul className="list-disc pl-5 text-gray-700">
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              {/* Posted At */}
              <div className="text-sm text-gray-500">
                Posted on: {new Date(job.created_at).toLocaleDateString()}
              </div>
               {/* Posted At */}
               <div className="text-sm text-gray-500">
                Closes on: {new Date(job.closing_date).toLocaleDateString()}
              </div>
            </div>

            {/* Close Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleClose}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ViewJobModal;
