import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { FilePlus2, ImagePlus, Upload } from "lucide-react";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoadingSpinner from "../components/LoadingSpinner";

const AddBlog = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null); // image preview
  const [imageFile, setImageFile] = useState(null); // actual file

  // Upload image to Cloudinary
  const uploadToCloudinary = async () => {
    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const cloudData = await res.json();
      return cloudData.secure_url;
    } catch (err) {
      toast.error("Image upload failed!", err.message);
      return null;
    }
  };

  // Save blog to DB
  const { mutate, isPending } = useMutation({
    mutationFn: async (blogData) => {
      const { data } = await axiosSecure.post("/blogs", blogData);
      return data;
    },
    onSuccess: () => {
      toast.success("Blog Posted Successfully!");
      reset();
      setPreview(null);
      navigate("/dashboard/all-blogs");
    },
    onError: () => {
      toast.error("Failed to add blog. Try again.");
    },
  });

  if (isPending) {
    return <LoadingSpinner />
  }

  // Handle form submit
  const onSubmit = async (formData) => {
    let uploadedImageURL = null;

    if (imageFile) {
      uploadedImageURL = await uploadToCloudinary();
    }

    if (!uploadedImageURL) {
      toast.error("Please upload an image");
      return;
    }

    const blogPayload = {
      title: formData.title,
      description: formData.description,
      image: uploadedImageURL,

      // Auto fill from useAuth
      authorName: user?.displayName || "",
      authorImage: user?.photoURL || "",
      email: user?.email || "",
    };

    try {
      setLoading(true);
      mutate(blogPayload);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false)
    }
  };

  // When user selects image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-[360px] overflow-hidden md:max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md border border-gray-300">
      <div className="flex items-center gap-3 mb-6">
        <FilePlus2 size={28} className="text-blue-600" />
        <h2 className="text-2xl font-semibold text-gray-800">Add New Blog</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* Blog Title */}
        <div>
          <label className="font-medium">Blog Title</label>
          <input
            {...register("title", { required: true })}
            type="text"
            placeholder="Enter blog title..."
            className="w-full p-3 mt-1 rounded-lg border border-gray-400"
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-medium">Short Description</label>
          <textarea
            {...register("description", { required: true })}
            placeholder="Write a short blog description..."
            rows={4}
            className="w-full p-3 mt-1 rounded-lg border border-gray-400"
          ></textarea>
        </div>

        {/* Image Upload */}
        <div>
          <label className="font-medium flex items-center gap-2">
            <ImagePlus /> Upload Blog Image
          </label>

          <input
            {...register("imageFile")}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-3 mt-1 border border-gray-400 rounded-lg bg-gray-50 cursor-pointer"
          />

          {/* Image Preview */}
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full md:w-48 h-32 object-cover rounded-lg border border-gray-400 mt-3"
            />
          )}
        </div>

        {/* Author Info Auto-filled */}
        <div className="bg-blue-50 p-4 rounded-lg border border-gray-400">
          <p className="font-medium text-blue-700">Author Information (Auto Filled)</p>
          <p className="text-gray-700 mt-1">Name: {user?.displayName}</p>
          <p className="text-gray-700">Email: {user?.email}</p>
          <p className="text-gray-700 overflow-hidden">image--: {user?.photoURL}</p>
        </div>

        {/* Submit Button */}
        <button
          disabled={loading}
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          <Upload size={20} />
          {loading
            ? "Uploading Blogs..."
            : "Create new Blog"}
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
