"use client";

import { deleteUserAction } from "@/lib/actions";
import React, { useActionState, useState, useEffect, useRef } from "react";

function DeleteUser({ user }) {
  const [message, formAction, isPending] = useActionState(
    deleteUserAction.bind(null, user?.id),
    undefined
  );
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDeleteConfirmation = () => {
    setDeleteModalOpen(true);
  };

  console.log(isDeleteModalOpen);
  return (
    <>
      {" "}
      <button
        onClick={handleDeleteConfirmation}
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
      >
        Delete
      </button>
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Delete User</h2>
            <p className="mb-6">
              Are you sure you want to delete {user?.name}? This action cannot
              be undone.
            </p>

            <form action={formAction} className="flex justify-end space-x-4">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                {isPending ? "Deleting..." : "Delete"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteUser;
