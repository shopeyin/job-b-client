// "use client";

// import { createJob } from "@/lib/api";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { toast } from "sonner";

// const industries = [
//   "Technology",
//   "Finance",
//   "Marketing",
//   "Healthcare",
//   "Education",
//   "Retail",
//   "Manufacturing",
//   "Construction",
//   "Real Estate",
//   "Transportation",
//   "Hospitality",
//   "Entertainment",
//   "Other",
// ];

// export default function CreateJobForm({ token }) {
//   const initialFormData = {
//     title: "",
//     description: "",
//     requirements: [""],
//     location: "",
//     industry: "",
//     salaryMin: "",
//     salaryMax: "",
//     workArrangement: "",
//     contractType: "",
//   };
//   const [formData, setFormData] = useState(initialFormData);
//   const [isPending, setIsPending] = useState(false);

//   let router = useRouter();
//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   // Handle adding a new requirement
//   const handleAddRequirement = () => {
//     setFormData((prevState) => ({
//       ...prevState,
//       requirements: [...prevState.requirements, ""],
//     }));
//   };

//   // Handle removing a requirement
//   const handleRemoveRequirement = (index) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       requirements: prevState.requirements.filter((_, i) => i !== index),
//     }));
//   };

//   // Handle change in requirement input
//   const handleRequirementChange = (index, value) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       requirements: prevState.requirements.map((req, i) =>
//         i === index ? value : req
//       ),
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const jobData = {
//       title: formData.title,
//       description: formData.description,
//       requirements: formData.requirements,
//       location: formData.location,
//       industry: formData.industry,
//       salary: {
//         min: formData.salaryMin,
//         max: formData.salaryMax,
//       },
//       work_arrangement: formData.workArrangement,
//       contract_type: formData.contractType,
//     };
//     setIsPending(true);
//     await createJob(jobData, token);
//     setIsPending(false);
//     setFormData(initialFormData);
//     toast.success("Job created", {
//       position: "top-center",
//       className: "bg-green-500",
//       duration: 5000,
//     });
//     router.push("/employer/manage-jobs");
//   };

//   return (
//     <div className="max-w-lg bg-white p-8 rounded-lg shadow-md">
//       <h1 className="text-2xl font-bold mb-6">Create Job</h1>
//       <form onSubmit={handleSubmit}>
//         {/* Job Title */}
//         <div className="mb-4">
//           <label
//             htmlFor="title"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Job Title
//           </label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             value={formData.title}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Job Description */}
//         <div className="mb-4">
//           <label
//             htmlFor="description"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Job Description
//           </label>
//           <textarea
//             id="description"
//             name="description"
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             value={formData.description}
//             onChange={handleChange}
//             rows="4"
//             required
//           ></textarea>
//         </div>

//         {/* Job Requirements */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Job Requirements
//           </label>
//           {formData.requirements.map((requirement, index) => (
//             <div key={index} className="flex items-center mb-2">
//               <input
//                 type="text"
//                 value={requirement}
//                 onChange={(e) => handleRequirementChange(index, e.target.value)}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 placeholder={`Requirement ${index + 1}`}
//               />
//               <button
//                 type="button"
//                 onClick={() => handleRemoveRequirement(index)}
//                 className="ml-2 text-red-500 hover:text-red-700"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={handleAddRequirement}
//             className="text-blue-600 hover:text-blue-800"
//           >
//             Add Requirement
//           </button>
//         </div>

//         {/* Location */}
//         <div className="mb-4">
//           <label
//             htmlFor="location"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Location
//           </label>
//           <input
//             type="text"
//             id="location"
//             name="location"
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             value={formData.location}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Industry */}
//         <div className="mb-4">
//           <label
//             htmlFor="industry"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Industry
//           </label>
//           <select
//             id="industry"
//             name="industry"
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             value={formData.industry}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Industry</option>
//             {industries.map((industry) => (
//               <option key={industry} value={industry}>
//                 {industry}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Salary Range */}
//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <div>
//             <label
//               htmlFor="salaryMin"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Minimum Salary
//             </label>
//             <input
//               type="number"
//               id="salaryMin"
//               name="salaryMin"
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               value={formData.salaryMin}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="salaryMax"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Maximum Salary
//             </label>
//             <input
//               type="number"
//               id="salaryMax"
//               name="salaryMax"
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               value={formData.salaryMax}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </div>

//         {/* Work Arrangement */}
//         <div className="mb-4">
//           <label
//             htmlFor="workArrangement"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Work Arrangement
//           </label>
//           <select
//             id="workArrangement"
//             name="workArrangement"
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             value={formData.workArrangement}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Work Arrangement</option>
//             <option value="onsite">Onsite</option>
//             <option value="remote">Remote</option>
//             <option value="hybrid">Hybrid</option>
//           </select>
//         </div>

//         {/* Contract Type */}
//         <div className="mb-4">
//           <label
//             htmlFor="contractType"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Contract Type
//           </label>
//           <select
//             id="contractType"
//             name="contractType"
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             value={formData.contractType}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Contract Type</option>
//             <option value="Full-time">Full Time</option>
//             <option value="Part-time">Part Time</option>
//             <option value="Contract">Contract</option>
//           </select>
//         </div>

//         <button
//           type="submit"
//           aria-disabled={isPending}
//           className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           {isPending ? "Creating Job..." : "Create Job"}
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";

import { createJobAction } from "@/lib/actions";

import { useActionState, useState, useEffect } from "react";
import { toast } from "sonner";

const industries = [
  "Technology",
  "Finance",
  "Marketing",
  "Healthcare",
  "Education",
  "Retail",
  "Manufacturing",
  "Construction",
  "Real Estate",
  "Transportation",
  "Hospitality",
  "Entertainment",
  "Other",
];

export default function CreateJobForm() {
  const initialFormData = {
    title: "",
    description: "",
    requirements: [""],
    location: "",
    industry: "",
    salaryMin: "",
    salaryMax: "",
    workArrangement: "",
    contractType: "",
  };
  const [errorMessage, formAction, isPending] = useActionState(
    createJobAction,
    undefined
  );
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage, {
        position: "top-center",
        className: "bg-red-500",
        duration: 5000,
      });
    }
  }, [errorMessage]);

  // Handle adding a new requirement
  const handleAddRequirement = () => {
    setFormData((prevState) => ({
      ...prevState,
      requirements: [...prevState.requirements, ""],
    }));
  };

  // Handle removing a requirement
  const handleRemoveRequirement = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      requirements: prevState.requirements.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="max-w-lg bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Create Job</h1>
      <form action={formAction}>
        {/* Job Title */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Job Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Job Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Job Description
          </label>
          <textarea
            id="description"
            name="description"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            // value={formData.description}
            // onChange={handleChange}
            // rows="4"
            // required
          ></textarea>
        </div>

        {/* Job Requirements */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Job Requirements
          </label>
          {formData.requirements.map((requirement, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                // value={requirement}
                name={`Requirement ${index + 1}`}
                // onChange={(e) => handleRequirementChange(index, e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder={`Requirement ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => handleRemoveRequirement(index)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddRequirement}
            className="text-blue-600 hover:text-blue-800"
          >
            Add Requirement
          </button>
        </div>

        {/* Location */}
        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            // value={formData.location}
            // onChange={handleChange}
            required
          />
        </div>

        {/* Industry */}
        <div className="mb-4">
          <label
            htmlFor="industry"
            className="block text-sm font-medium text-gray-700"
          >
            Industry
          </label>
          <select
            id="industry"
            name="industry"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Industry</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        {/* Salary Range */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="salaryMin"
              className="block text-sm font-medium text-gray-700"
            >
              Minimum Salary
            </label>
            <input
              type="number"
              id="salaryMin"
              name="salaryMin"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              // value={formData.salaryMin}
              // onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="salaryMax"
              className="block text-sm font-medium text-gray-700"
            >
              Maximum Salary
            </label>
            <input
              type="number"
              id="salaryMax"
              name="salaryMax"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              // value={formData.salaryMax}
              // onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Work Arrangement */}
        <div className="mb-4">
          <label
            htmlFor="workArrangement"
            className="block text-sm font-medium text-gray-700"
          >
            Work Arrangement
          </label>
          <select
            id="workArrangement"
            name="work_arrangement"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            // value={formData.workArrangement}
            // onChange={handleChange}
            required
          >
            <option value="">Select Work Arrangement</option>
            <option value="onsite">Onsite</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        {/* Contract Type */}
        <div className="mb-4">
          <label
            htmlFor="contract_Type"
            className="block text-sm font-medium text-gray-700"
          >
            Contract Type
          </label>
          <select
            id="contractType"
            name="contract_type"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Contract Type</option>
            <option value="Full-time">Full Time</option>
            <option value="Part-time">Part Time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        <button
          type="submit"
          aria-disabled={isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isPending ? "Creating Job..." : "Create Job"}
        </button>
      </form>
    </div>
  );
}
