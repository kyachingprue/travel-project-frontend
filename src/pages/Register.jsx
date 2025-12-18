import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Loader, ImagePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";


const Register = () => {
  const { createUser, profileUpdate } = useAuth();
  const axiosPublic = useAxiosPublic()
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!data.secure_url) {
        console.log("Cloudinary Error:", data);
        toast.error("Image upload failed");
        return null;
      }

      return data.secure_url;
    } catch (err) {
      console.error("Cloudinary upload failed:", err);
      toast.error("Image upload error");
      return null;
    }
  };

  const onSubmit = async (data) => {
    if (!data.accept) {
      toast.error("You must accept the terms!");
      return;
    }

    setLoading(true);

    let imageUrl = "";
    if (imageFile) {
      imageUrl = await uploadImageToCloudinary(imageFile);
      if (!imageUrl) {
        setLoading(false);
        return;
      }
    }

    try {
      // 1. Create user in Firebase
      const res = await createUser(data.email, data.password);
      console.log("user data -->", res.data);

      // 2. Update Firebase profile
      await profileUpdate({
        displayName: `${data.firstName} ${data.lastName}`,
        photoURL: imageUrl,
      });

      // 3. Save user to MongoDB
      const savedUser = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        profileImage: imageUrl,
        role: "user",
        createdAt: new Date(),
      };

      await axiosPublic.post("/users", savedUser);

      toast.success("Account created successfully!");
      setLoading(false);
      navigate("/login");
    } catch (err) {
      toast.error(err.message || "Registration failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-cyan-100 to-blue-950 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl p-8 relative">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Create New Account
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Image Upload */}
          <div className="flex flex-col items-center mb-2">
            <label className="cursor-pointer flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-full w-24 h-24 text-gray-500 hover:border-blue-400">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  className="w-24 h-24 animate-none rounded-full object-cover"
                />
              ) : (
                <>
                  <ImagePlus size={24} />
                  <span className="text-xs ">Upload Profile</span>
                </>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <div>
              {/* First Name */}
              <label className=" text-sm"> First Name</label>
              <input
                type="text"
                placeholder="First Name"
                {...register("firstName", { required: "First name is required" })}
                className="px-4 py-2 border border-gray-400 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName.message}</span>}
            </div>

            <div>
              {/* Last Name */}
              <label className=" text-sm py-2"> Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                {...register("lastName", { required: "Last name is required" })}
                className="px-4 py-2 border border-gray-400 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName.message}</span>}
            </div>
          </div>

          {/* Email */}
          <label className=" text-sm"> Email</label>
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" },
            })}
            className="px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

          {/* Password */}
          <label className=" text-sm"> New Password</label>
          <input
            type="password"
            placeholder="New Password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
              maxLength: { value: 20, message: "Password must be max 20 characters" },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                message: "Password must contain 1 uppercase, 1 lowercase, 1 number",
              },
            })}
            className="px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}

          {/* Confirm Password */}
          <label className=" text-sm"> Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) => value === password || "Passwords do not match",
            })}
            className="px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}

          {/* Accept Terms */}
          <label className="flex items-center gap-2 mt-2 text-gray-600">
            <input type="checkbox" {...register("accept")} className="accent-blue-600" />
            I accept the terms and conditions
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all"
          >
            {loading && <Loader className="animate-spin" size={20} />}
            {loading ? "Creating Account..." : "Create New Account"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <span className="text-blue-600 font-semibold cursor-pointer" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
