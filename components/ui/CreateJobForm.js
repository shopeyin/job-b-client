// "use client";

// import { createJobAction } from "@/lib/actions";
// import { formatDateToYYYYMMDD } from "@/lib/utils";

// import { useActionState, useState, useEffect } from "react";
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

// export default function CreateJobForm() {
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
//     closing_date: "",
//   };
//   const [formState, formAction, isPending] = useActionState(
//     createJobAction,
//     undefined
//   );
//   const [formData, setFormData] = useState(initialFormData);

//   useEffect(() => {
//     if (formState?.message) {
//       toast.error(formState?.message, {
//         position: "top-center",
//         className: "bg-red-500",
//         duration: 5000,
//       });
//     }
//   }, [formState]);

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

//   console.log(formState);

//   return (
//     <div className="max-w-lg bg-white p-8 rounded-lg shadow-md">
//       <h1 className="text-2xl font-bold mb-6">Create Job</h1>
//       <form action={formAction}>
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
//             defaultValue={formState?.fieldData?.title}
//             name="title"
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
//             defaultValue={formState?.fieldData?.description}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             // value={formData.description}
//             // onChange={handleChange}
//             // rows="4"
//             // required
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
//                 // value={requirement}

//                 name={`Requirement ${index + 1}`}
//                 // onChange={(e) => handleRequirementChange(index, e.target.value)}
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
//             defaultValue={formState?.fieldData?.location}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
//             required
//             defaultValue={formState?.fieldData?.industry}
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
//               defaultValue={formState?.fieldData?.salary?.min}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               // value={formData.salaryMin}
//               // onChange={handleChange}
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
//               defaultValue={formState?.fieldData?.salary?.max}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               // value={formData.salaryMax}
//               // onChange={handleChange}
//               required
//             />
//           </div>
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Closing Date
//           </label>
//           <input
//             type="date"
//             name="closing_date"
//             defaultValue={formatDateToYYYYMMDD(
//               formState?.fieldData?.closing_date
//             )}
//             // value={formatDateToYYYYMMDD(experience.startDate)}
//             // onChange={""}
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//           />
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
//             name="work_arrangement"
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             // value={formData.workArrangement}
//             // onChange={handleChange}
//             defaultValue={formState?.fieldData?.work_arrangement}
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
//             htmlFor="contract_Type"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Contract Type
//           </label>
//           <select
//             id="contractType"
//             name="contract_type"
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             required
//             defaultValue={formState?.fieldData?.contract_type}
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
import { formatDateToYYYYMMDD } from "@/lib/utils";

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
    closing_date: "",
  };
  const [formState, formAction, isPending] = useActionState(
    createJobAction,
    undefined
  );
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (formState?.message) {
      toast.error(formState?.message, {
        position: "top-center",
        className: "bg-red-500",
        duration: 5000,
      });
    }
  }, [formState]);

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

  console.log(formState);

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
            defaultValue={formState?.fieldData?.title}
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
            defaultValue={formState?.fieldData?.description}
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
            defaultValue={formState?.fieldData?.location}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
            defaultValue={formState?.fieldData?.industry}
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
              defaultValue={formState?.fieldData?.salary?.min}
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
              defaultValue={formState?.fieldData?.salary?.max}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              // value={formData.salaryMax}
              // onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Closing Date
          </label>
          <input
            type="date"
            name="closing_date"
            defaultValue={formatDateToYYYYMMDD(
              formState?.fieldData?.closing_date
            )}
            // value={formatDateToYYYYMMDD(experience.startDate)}
            // onChange={""}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
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
            defaultValue={formState?.fieldData?.work_arrangement}
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
            defaultValue={formState?.fieldData?.contract_type}
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