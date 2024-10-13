"use client";
import { UpdateUserAction } from "@/lib/actions";
import React, { useActionState, useState, useEffect } from "react";

function EditUserForm({ user }) {
  const [message, formAction, isPending] = useActionState(
    UpdateUserAction.bind(null, user?.id),
    undefined
  );
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [notify, setNotify] = useState(message);

  useEffect(() => {
    if (message?.status === "success") {
      setNotify(message);
      setTimeout(() => {
        setEditModalOpen(false);
        setNotify(null);
      }, 1500);
    }
  }, [message]);

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  console.log(message, 'STATE');
  return (
    <>
      <button
        onClick={handleEdit}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
      >
        Edit
      </button>
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Edit User </h2>

            {notify?.status === "success" && (
              <div className="bg-green-100 border mb-8 border-green-300 text-green-800 p-4 rounded-lg">
                <p className="font-medium">Success!</p>
                <p>Your changes have been successfully saved.</p>
              </div>
            )}

            <form action={formAction}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={user?.name}
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select
                  name="role"
                  defaultValue={user?.role}
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="job_seeker">Job Seeker</option>
                  <option value="employer">Employer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="active"
                  defaultValue={user?.active}
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={true}>Activate</option>
                  <option value={false}>Deactivate</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                >
                  {isPending ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EditUserForm;
