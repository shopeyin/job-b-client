import DeleteJob from "@/components/ui/DeleteJob";
import ViewJobModal from "@/components/ui/ViewJobModal";
import { getAllJobs } from "@/lib/api";
import React from "react";

async function Jobs() {
  let data = await getAllJobs();
  const { jobs } = data;
 
  return (
    <div>
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-semibold mb-6">Jobs Management</h1>
        {jobs.length}

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-4 px-6 font-medium text-gray-700">Title</th>
                <th className="py-4 px-6 font-medium text-gray-700">Company</th>
                <th className="py-4 px-6 font-medium text-gray-700">Status</th>
                <th className="py-4 px-6 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 border-t">{job.title}</td>
                  <td className="py-4 px-6 border-t">{job.company.name}</td>
                  <td className="py-4 px-6 border-t">{job?.status}</td>
                  <td className="py-4 px-6 border-t flex space-x-4">
                    {/* <button className="bg-blue-500 text-white px-4 py-1 rounded">
                      Edit
                    </button> */}

                    <ViewJobModal job={job} />
                    <DeleteJob job={job} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add User Modal */}
        {/* {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Add New User</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
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
                  // value={newUser.email}
                  // onChange={(e) =>
                  //   setNewUser({ ...newUser, email: e.target.value })
                  // }
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter user email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select
                  // value={newUser.role}
                  // onChange={(e) =>
                  //   setNewUser({ ...newUser, role: e.target.value })
                  // }
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Job Seeker">Job Seeker</option>
                  <option value="Employer">Employer</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  // onClick={() => setAddModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  // onClick={handleAddUser}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}

        {/* Edit User Modal */}
        {/* {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={selectedUser?.name}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, name: e.target.value })
                  }
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select
                  // value={selectedUser?.role}
                  // onChange={(e) =>
                  //   setSelectedUser({ ...selectedUser, role: e.target.value })
                  // }
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Job Seeker">Job Seeker</option>
                  <option value="Employer">Employer</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  // onClick={() => setEditModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}
      </div>
    </div>
  );
}

export default Jobs;
