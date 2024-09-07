// "use client";
// import { useSearchParams, usePathname, useRouter } from "next/navigation";

// export default function Search({ placeholder }) {
//   const searchParams = useSearchParams();
//   const pathname = usePathname();
//   const { replace } = useRouter();

//   function handleSearch(term) {
//     const params = new URLSearchParams(searchParams);

//     if (term) {
//       params.set("title", term);
//     } else {
//       params.delete("title");
//     }

//     replace(`${pathname}?${params.toString()}`);
//   }

//   return (
//     <div className="relative w-full">
//       <label htmlFor="search" className="sr-only">
//         Search
//       </label>
//       <input
//         type="text"
//         id="search"
//         className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
//         placeholder={placeholder}
//         onChange={(e) => {
//           handleSearch(e.target.value);
//         }}
//       />
//       <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//         <svg
//           className="h-5 w-5 text-gray-400"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
//           />
//         </svg>
//       </div>
//     </div>
//   );
// }

"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Search({ placeholder }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // States for filters
  const [title, setTitle] = useState(searchParams.get("title") || "");
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

  function handleSearch() {
    const params = new URLSearchParams();

    if (title) params.set("title", title);
    if (workArrangement) params.set("work_arrangement", workArrangement);
    if (contractType) params.set("contract_type", contractType);
    if (minSalary) params.set("minSalary", minSalary);
    if (maxSalary) params.set("maxSalary", maxSalary);

    replace(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {
    handleSearch(); // Update URL when any filter changes
  }, [title, workArrangement, contractType, minSalary, maxSalary]);

  return (
    <div className="relative w-full">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        type="text"
        id="search"
        className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
        placeholder={placeholder}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
     

      {/* Filters */}
      <div className="mt-4">
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
          className="mt-1 block w-full p-2 border rounded-lg bg-white focus:ring focus:border-blue-500"
        >
          <option value="">Select</option>
      
          <option value="remote">Remote</option>
          <option value="onsite">On-site</option>
          <option value="hybrid">Hybrid</option>
        </select>

        <label
          htmlFor="contract_type"
          className="block text-sm font-medium text-gray-700 mt-4"
        >
          Contract Type
        </label>
        <select
          id="contract_type"
          value={contractType}
          onChange={(e) => setContractType(e.target.value)}
          className="mt-1 block w-full p-2 border rounded-lg bg-white focus:ring focus:border-blue-500"
        >
          <option value="">Select</option>
      
          <option value="Full-time">Full Time</option>
          <option value="Part-time">Part Time</option>
          <option value="Contract">Contract</option>
        </select>

        <label
          htmlFor="minSalary"
          className="block text-sm font-medium text-gray-700 mt-4"
        >
          Minimum Salary
        </label>
        <input
          type="number"
          id="minSalary"
          value={minSalary}
          onChange={(e) => setMinSalary(e.target.value)}
          className="mt-1 block w-full p-2 border rounded-lg bg-white focus:ring focus:border-blue-500"
          placeholder="Min Salary"
        />

        <label
          htmlFor="maxSalary"
          className="block text-sm font-medium text-gray-700 mt-4"
        >
          Maximum Salary
        </label>
        <input
          type="number"
          id="maxSalary"
          value={maxSalary}
          onChange={(e) => setMaxSalary(e.target.value)}
          className="mt-1 block w-full p-2 border rounded-lg bg-white focus:ring focus:border-blue-500"
          placeholder="Max Salary"
        />
      </div>
    </div>
  );
}
