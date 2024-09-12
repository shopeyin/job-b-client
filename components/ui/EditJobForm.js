"use client";
import { editJob } from "@/lib/api";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
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

function EditJobForm({ data, token }) {
  const router = useRouter();

  const initialFormData = {
    title: data?.title || "", // Fallback to empty string if null/undefined
    description: data?.description || "",
    requirements: data?.requirements || [""], // Default to an array with an empty string
    location: data?.location || "",
    industry: data?.industry || "",
    salaryMin: data?.salary?.min || "", // Optional chaining for nested fields like salary.min
    salaryMax: data?.salary?.max || "",
    workArrangement: data?.work_arrangement || "",
    contractType: data?.contract_type || "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [isPending, setIsPending] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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

  // Handle change in requirement input
  const handleRequirementChange = (index, value) => {
    setFormData((prevState) => ({
      ...prevState,
      requirements: prevState.requirements.map((req, i) =>
        i === index ? value : req
      ),
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      title: formData.title,
      description: formData.description,
      requirements: formData.requirements,
      location: formData.location,
      industry: formData.industry,
      salary: {
        min: formData.salaryMin,
        max: formData.salaryMax,
      },
      work_arrangement: formData.workArrangement,
      contract_type: formData.contractType,
    };
    setIsPending(true);
    await editJob(jobData, data._id, token);
    setTimeout(() => {
      setIsPending(false);
    }, 2000);

    setFormData(initialFormData);
    toast.success("Edit Successful", {
      position: "top-center",
      className: "bg-green-500",
      duration: 5000,
    });
    window.location.reload();
  };

  return (
    <div className="max-w-lg bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Edit Job</h1>
      <form onSubmit={handleSubmit}>
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
            value={formData.title}
            onChange={handleChange}
            required
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
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
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
                value={requirement}
                onChange={(e) => handleRequirementChange(index, e.target.value)}
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
            value={formData.location}
            onChange={handleChange}
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
            value={formData.industry}
            onChange={handleChange}
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
              value={formData.salaryMin}
              onChange={handleChange}
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
              value={formData.salaryMax}
              onChange={handleChange}
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
            name="workArrangement"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.workArrangement}
            onChange={handleChange}
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
            htmlFor="contractType"
            className="block text-sm font-medium text-gray-700"
          >
            Contract Type
          </label>
          <select
            id="contractType"
            name="contractType"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.contractType}
            onChange={handleChange}
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
          // aria-disabled={isPending}
          disabled={isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isPending ? "Updating Job..." : "Update Job"}
        </button>
      </form>
    </div>
  );
}

export default EditJobForm;
