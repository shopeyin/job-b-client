"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import Pagination from "./Pagination";
import SearchIcon from "../icons/SearchIcon";

export default function Search({ placeholder, totalPages }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // States for filters
  const [title, setTitle] = useState(searchParams.get("title") || "");
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const [workArrangement, setWorkArrangement] = useState(
    searchParams.get("work_arrangement") || ""
  );
  const [contractType, setContractType] = useState(
    searchParams.get("contract_type") || ""
  );
  const [minSalary, setMinSalary] = useState(
    searchParams.get("minSalary") || ""
  );
  const [maxSalary, setMaxSalary] = useState(
    searchParams.get("maxSalary") || ""
  );

  const [isFiltersVisible, setFiltersVisible] = useState(false);

  const handleSearch = useDebouncedCallback(() => {
    const params = new URLSearchParams();

    if (page !== 1) {
      params.set("page", page);
    }
    if (title) params.set("title", title);
    if (workArrangement) params.set("work_arrangement", workArrangement);
    if (contractType) params.set("contract_type", contractType);
    if (minSalary) params.set("minSalary", minSalary);
    if (maxSalary) params.set("maxSalary", maxSalary);

    replace(`${pathname}?${params.toString()}`);
  }, 1000);

  useEffect(() => {
    handleSearch(); 
  }, [page, title, workArrangement, contractType, minSalary, maxSalary]);

  useEffect(() => {
    setPage(1);
    handleSearch();
  }, [title, workArrangement, contractType, minSalary, maxSalary]);

  

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    setPage((prevCount) => {
      if (prevCount <= totalPages) {
        return prevCount + 1;
      } else {
        return prevCount;
      }
    });
  };

  const toggleFilters = () => {
    setFiltersVisible(!isFiltersVisible);
  };

  return (
    <div className="relative w-full mx-auto p-4 bg-gray-50 rounded-lg shadow-md">
      <Pagination
        page={page}
        totalPages={totalPages}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />

      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
        {/* Improved Search Bar */}
        <div className="relative w-full md:w-4/5">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="flex items-center">
            <SearchIcon className="absolute left-3 text-gray-500 text-xl" />
            <input
              type="text"
              id="search"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-sm placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
              placeholder={placeholder}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={toggleFilters}
          className="inline-flex items-center px-4 py-2 border border-blue-500 text-sm font-medium rounded-md text-blue-500 bg-white hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
        >
          {isFiltersVisible ? "Hide Filters" : "Apply Filters"}
        </button>
      </div>

      {/* Filters Dropdown */}
      <div
        className={`mt-4 overflow-hidden transition-all duration-500 ease-in-out transform ${
          isFiltersVisible ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 border rounded-lg bg-white shadow-sm">
          {/* Work Arrangement */}
          <div>
            <label
              htmlFor="work_arrangement"
              className="block text-sm font-medium text-gray-700"
            >
              Work Arrangement
            </label>
            <select
              id="work_arrangement"
              value={workArrangement}
              onChange={(e) => setWorkArrangement(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-lg bg-gray-50 focus:ring focus:border-blue-500"
            >
              <option value="">Select</option>
              <option value="remote">Remote</option>
              <option value="onsite">On-site</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          {/* Contract Type */}
          <div>
            <label
              htmlFor="contract_type"
              className="block text-sm font-medium text-gray-700"
            >
              Contract Type
            </label>
            <select
              id="contract_type"
              value={contractType}
              onChange={(e) => setContractType(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-lg bg-gray-50 focus:ring focus:border-blue-500"
            >
              <option value="">Select</option>
              <option value="Full-time">Full Time</option>
              <option value="Part-time">Part Time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          {/* Minimum Salary */}
          <div>
            <label
              htmlFor="minSalary"
              className="block text-sm font-medium text-gray-700"
            >
              Minimum Salary
            </label>
            <input
              type="number"
              id="minSalary"
              value={minSalary}
              onChange={(e) => setMinSalary(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-lg bg-gray-50 focus:ring focus:border-blue-500"
              placeholder="Min Salary"
            />
          </div>

          {/* Maximum Salary */}
          <div>
            <label
              htmlFor="maxSalary"
              className="block text-sm font-medium text-gray-700"
            >
              Maximum Salary
            </label>
            <input
              type="number"
              id="maxSalary"
              value={maxSalary}
              onChange={(e) => setMaxSalary(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-lg bg-gray-50 focus:ring focus:border-blue-500"
              placeholder="Max Salary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
