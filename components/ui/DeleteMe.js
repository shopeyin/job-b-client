"use client";
import React, { useState } from "react";
import { deleteMyAccount } from "@/lib/actions";

function DeleteMe() {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDeleteConfirmation = () => {
    setDeleteModalOpen(true);
  };

  const handleDelete = () => {
    setDeleteModalOpen(false);
  };
  return (
    <>
      <button
        onClick={handleDeleteConfirmation}
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
      >
        Delete Account
      </button>
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Delete User</h2>
            <p className="mb-6">
              Are you sure you want to delete. This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <form action={deleteMyAccount}>
                <button
                  type="submit"
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteMe;
