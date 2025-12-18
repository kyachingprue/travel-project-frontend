import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader } from "lucide-react"; // fan / loader icon
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const { userLogin } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    try {
      await userLogin(data.email, data.password);
      setLoading(false);
      navigate(from, { replace: true });
      toast.success("Login Successful")
    } catch (err) {
      setError(err.message || "Login failed");
      setLoading(false);
      toast.error('Login Error')
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-cyan-300 to-blue-950 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 relative">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Welcome Back
        </h2>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label className="font-semibold mb-1 text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className="px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1 text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              })}
              className="px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && (
              <span className="text-red-500 text-sm mt-1">{errors.password.message}</span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all"
          >
            {loading && <Loader className="animate-spin" size={20} />}
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <span className="text-blue-600 font-semibold cursor-pointer" onClick={() => navigate("/register")}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
