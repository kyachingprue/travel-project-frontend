import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // 1️⃣ Show loading while Firebase is checking auth
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Checking authentication...</p>
      </div>
    );
  }

  // 2️⃣ If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3️⃣ User is logged in, render protected content
  return children;
};

export default ProtectedRoute;
