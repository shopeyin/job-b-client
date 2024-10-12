"use client";

import { updateCompanyAction } from "@/lib/actions";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function CompanyProfileForm({ company }) {
 
  const [formState, formAction, isPending] = useActionState(
    updateCompanyAction.bind(null, company?._id),
    undefined
  );

  useEffect(() => {
    if (formState?.fieldData?.message) {
      toast.success("Form Updated", {
        position: "top-center",
        className: "bg-green-500",
        duration: 5000,
      });

      formState.fieldData.message = null;
    }
  }, [formState?.fieldData?.message]);
 

  return (
    <div className="max-w-lg bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Company Profile</h1>
      <form action={formAction}>
        {/* Company Name */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Company Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            defaultValue={company?.name}
            required
          />
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
            defaultValue={company?.location}
            required
          />
        </div>

        {/* Website */}
        <div className="mb-4">
          <label
            htmlFor="website"
            className="block text-sm font-medium text-gray-700"
          >
            Website
          </label>
          <input
            type="url"
            id="website"
            name="website"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            defaultValue={company?.website}
            required
          />
        </div>
        {/* Logo */}
        <div className="my-5">
          <label
            htmlFor="logo"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Company Logo
          </label>

          {/* File input styled with Tailwind */}
          <input
            type="file"
            id="logo"
            accept="image/*"
            name="logo"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />

          {/* Display the current logo or the new selected image */}
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700">
              Current/Selected Logo
            </h4>

            <img
              src={company?.logo || `https://via.placeholder.com/100`}
              alt="Company Logo"
              className="mt-2 w-32 h-32 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Description */}
        {/* <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            defaultValue={company?.description}
            required
            rows="4"
          ></textarea>
        </div> */}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {isPending ? "Updating...." : "Update Company"}
        </button>
        {formState && (
          <p className="mt-2 text-center text-sm text-red-600">
            {formState.message}
          </p>
        )}
      </form>
    </div>
  );
}
