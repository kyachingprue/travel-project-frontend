import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from '@tanstack/react-query'

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userData = [], isLoading } = useQuery({
    queryKey: ["userData", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-20 pb-10 px-4">
      {/* Wrapper */}
      <div className="max-w-4xl mx-auto">

        {/* Cover Photo */}
        <div className="h-48 md:h-56 bg-linear-to-r from-blue-200 to-indigo-950 rounded-xl shadow-lg"></div>

        {/* Profile Card */}
        <div className="relative bg-white shadow-xl hover:shadow-2xl rounded-xl p-6 -mt-16 md:-mt-20 flex flex-col md:flex-row gap-6 items-center md:items-start">

          {/* User Image */}
          <img
            src={user?.photoURL}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
          />

          {/* Info Section */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 pt-5">
              {user?.displayName || "No Name"}
            </h1>

            <p className="text-gray-600 mt-2">
              {user?.email}
            </p>
            <p className="text-gray-600 mt-2">
              Role: {userData?.role || "Unknown"}
            </p>
          </div>
        </div>

        {/* Additional Profile Info */}
        <div className="bg-white mt-6 p-6 rounded-xl shadow-2xl hover:shadow-none">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Account Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <p><span className="font-semibold">User ID:</span> {user?.uid}</p>
            <p><span className="font-semibold">Email Verified:</span> {user?.emailVerified ? "Yes" : "No"}</p>
            <p><span className="font-semibold">Provider:</span> {user?.providerId || "Unknown"}</p>
            <p><span className="font-semibold">Last Sign In:</span> {user?.metadata?.lastSignInTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
