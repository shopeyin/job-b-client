"use client";
import React from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

function Pagination({ count }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, push } = useRouter();
  const params = new URLSearchParams(searchParams);

  const page = searchParams.get("page") || 1;

  //   const ITEM_PER_PAGE = 10;
  //   const hasPrev = ITEM_PER_PAGE * (parseInt(page) - 1) > 0;
  //   const hasNext = ITEM_PER_PAGE * (parseInt(page) - 1) * ITEM_PER_PAGE < count;

  const handleChangePage = (type) => {
    type === "prev"
      ? params.set("page", parseInt(page) - 1)
      : params.set("page", parseInt(page) + 1);
    console.log(pathname, "PATHNAME");
    push(`${pathname}?${params}`);
  };

  //   console.log(page, "page");
  //   console.log(count, "count");
  //   console.log(hasPrev, "PREV");
  //   console.log(hasNext, "Next");
  return (
    <div className="space-x-4 mt-8">
      {/* Pagination {page} */}
      <button
        // disabled={!hasPrev}
        onClick={() => handleChangePage("prev")}
        className={`px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 font-medium transition-colors
         `}
      >
        Previous
      </button>

      <span className="text-gray-700 font-medium">Page {page}</span>

      <button
        // disabled={!hasNext}
        onClick={() => handleChangePage("next")}
        className={`px-4 py-2 rounded-md text-white font-medium  bg-green-500 transition-colors`}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
