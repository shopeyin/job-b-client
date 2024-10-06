"use client";
import React from "react";

function Pagination({ handleNext, handlePrevious, page, totalPages }) {
  console.log(page)
  return (
    <div className="flex justify-end mb-4">
      <div className="flex  gap-4">
        <button
          className="px-4 py-2 rounded-md text-white font-medium transition-colors bg-blue-500"
          onClick={handlePrevious}
          disabled={page <= 1}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
           disabled={page >= totalPages}
          className="px-4 py-2 rounded-md text-white font-medium transition-colors bg-green-500"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
