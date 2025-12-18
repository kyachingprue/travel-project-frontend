import React from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2, Users } from "lucide-react";
import toast from "react-hot-toast";
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import LoadingSpinner from '../components/LoadingSpinner';

const AllUsers = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // ✅ MOVE THIS UP (before return)
  const deleteUserMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/users/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("User deleted successfully!");
      queryClient.invalidateQueries(["users"]);
    },
    onError: () => {
      toast.error("Failed to delete user");
    },
  });

  // ✅ return AFTER all hooks
  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleDelete = (id) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-medium">Are you sure you want to delete this user?</p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 rounded bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              deleteUserMutation.mutate(id);
              toast.dismiss(t.id);
            }}
            className="px-3 py-1 rounded bg-red-600 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    ));
  };

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Users /> All Users
      </h1>
      <div className="space-y-4 md:hidden">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white rounded-xl shadow p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <img
                src={user.profileImage}
                alt="profile"
                className="w-12 h-12 rounded-full object-cover"
              />

              <div>
                <p className="font-semibold">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">
                  {user.role}
                </span>
              </div>
            </div>

            <button
              disabled={deleteUserMutation.isPending}
              onClick={() => handleDelete(user._id)}
              className="text-red-600 hover:bg-red-50 p-2 rounded disabled:opacity-50"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
      <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Profile</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-t border-gray-300 hover:bg-gray-50"
              >
                <td className="p-3">
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={user.profileImage}
                    alt="profile"
                  />
                </td>

                <td className="p-3">
                  {user.firstName} {user.lastName}
                </td>

                <td className="p-3">{user.email}</td>

                <td className="p-3">
                  <span className="px-2 py-1 text-sm rounded bg-blue-100 text-blue-600">
                    {user.role}
                  </span>
                </td>

                <td className="p-3 text-right">
                  <button
                    disabled={deleteUserMutation.isPending}
                    onClick={() => handleDelete(user._id)}
                    className="text-red-600 hover:bg-red-50 p-2 rounded disabled:opacity-50"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AllUsers;