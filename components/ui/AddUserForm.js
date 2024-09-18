"use client";
import { createUserAction } from "@/lib/actions";
import React, { useActionState, useState, useEffect } from "react";

function AddUserForm() {
  const [message, formAction, isPending] = useActionState(
    createUserAction,
    undefined
  );
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [notify, setNotify] = useState(message);

  useEffect(() => {
    if (message?.status === "success") {
      setNotify(message);
      setTimeout(() => {
        setAddModalOpen(false);
        setNotify(null);
      }, 2000); // Display message for 1.5 seconds before closing
    } else if (message?.status === "error") {
      setNotify(message);
    }
  }, [message]);

  return (
    <>
      <button
        onClick={() => setAddModalOpen(true)}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
      >
        Add User
      </button>
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Add New User</h2>

            {notify?.status === "success" ? (
              <div className="bg-green-100 border mb-8  text-green-800 p-4 rounded-lg">
                <p className="font-medium">Success!</p>
                <p>User created</p>
              </div>
            ) : notify?.status === "error" ? (
              <div className="bg-red-500 border mb-8  p-4 rounded-lg">
                <p className="font-medium">Fail!</p>
                <p>{message.message}</p>
              </div>
            ) : (
              ""
            )}

            <form action={formAction}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter user name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter user email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="passwordConfirm"
                  placeholder="Confirm Password"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select
                  name="role"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="job_seeker">Job Seeker</option>
                  <option value="employer">Employer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setAddModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  //   onClick={handleAddUser}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AddUserForm;
