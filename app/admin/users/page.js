import AddUserForm from "@/components/ui/AddUserForm";
import DeleteUser from "@/components/ui/DeleteUser";
import EditUserForm from "@/components/ui/EditUserForm";
import UserManagement from "@/components/ui/UserManagement";
import { getAllUsers } from "@/lib/api";

async function Users() {
  const { users } = await getAllUsers();
  // console.log(users);
  return (
    <div>
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-semibold mb-6">User Management</h1>
        {users.length}
        {/* Add User Button */}
        <div className="mb-6">
          <AddUserForm />
        </div>

        {/* User List */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-4 px-6 font-medium text-gray-700">Name</th>
                <th className="py-4 px-6 font-medium text-gray-700">Email</th>
                <th className="py-4 px-6 font-medium text-gray-700">Role</th>
                <th className="py-4 px-6 font-medium text-gray-700">Status</th>
                <th className="py-4 px-6 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 border-t">{user.name}</td>
                  <td className="py-4 px-6 border-t">{user.email}</td>
                  <td className="py-4 px-6 border-t">{user.role}</td>
                  <td className="py-4 px-6 border-t">
                    {user.active ? (
                      <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-black-800">
                        Active
                      </span>
                    ) : (
                      <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-black-800">
                        Not active
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 border-t flex space-x-4">
                    <EditUserForm user={user} />
                    <DeleteUser user={user} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
