import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import airplane from '../assets/airplane (3).png'

const AddPackage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageName, setImageName] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (newPackage) => {
      const formData = new FormData();
      if (selectedFile) {
        formData.append("file", selectedFile);
        formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

        // upload to Cloudinary
        const cloudRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: "POST",
          body: formData,
        });

        const cloudData = await cloudRes.json();
        newPackage.image = cloudData.secure_url;
      }


      const res = await axiosSecure.post("/tours", newPackage);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Package added successfully!");
      reset();
      navigate('/packages')
      setSelectedFile(null);
      setImageName("");
    },
    onError: () => toast.error("Failed to add package"),
  });

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      people: parseInt(data.people),
      price: parseFloat(data.price),
      rating: parseFloat(data.rating),
      reviews: parseInt(data.reviews),
      admin: {
        name: user?.displayName,
        email: user?.email,
      },
    };
    try {
      setLoading(true);
      await mutateAsync(payload);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const destinations = [
    "Canada",
    "Colombia",
    "Costa Rica",
    "Combodia",
    "Japan",
    "Nepal",
    "Thailand",
    "China",
    "Viet Nam",
    "France",
    "Greece",
    "Switzerland",
    "Austria",
    "Italy",
  ];

  return (
    <div className="max-w-3xl mx-auto px-6 mb-14 md:mb-0 bg-white shadow-lg rounded-2xl border border-gray-200">
      <h2 className="text-2xl md:text-4xl font-bold text-center mt-7 mb-6 text-violet-700">Add New Tour Package</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Title */}
        <div>
          <label className="font-medium text-slate-700">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full mt-1 p-2 border border-gray-400 rounded-lg focus:ring focus:ring-violet-300"
            placeholder="Tour title"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Location */}
        <div>
          <label className="font-medium text-slate-700">Location</label>
          <input
            type="text"
            {...register("location", { required: "Location is required" })}
            className="w-full mt-1 p-2 border border-gray-400 rounded-lg focus:ring focus:ring-violet-300"
            placeholder="City or place"
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>

        {/* Price */}
        <div>
          <label className="font-medium text-slate-700">Price ($)</label>
          <input
            type="number"
            {...register("price", { required: "Price is required" })}
            className="w-full mt-1 p-2 border border-gray-400 rounded-lg focus:ring focus:ring-violet-300"
            placeholder="420"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>

        {/* People */}
        <div>
          <label className="font-medium text-slate-700">People</label>
          <input
            type="number"
            {...register("people", { required: "People count is required" })}
            className="w-full mt-1 p-2 border border-gray-400 rounded-lg focus:ring focus:ring-violet-300"
            placeholder="1"
          />
          {errors.people && <p className="text-red-500 text-sm">{errors.people.message}</p>}
        </div>

        {/* Rating */}
        <div>
          <label className="font-medium text-slate-700">Rating</label>
          <input
            type="number"
            step="0.1"
            {...register("rating", { required: "Rating is required" })}
            className="w-full mt-1 p-2 border border-gray-400 rounded-lg focus:ring focus:ring-violet-300"
            placeholder="4.8"
          />
          {errors.rating && <p className="text-red-500 text-sm">{errors.rating.message}</p>}
        </div>

        {/* Reviews */}
        <div>
          <label className="font-medium text-slate-700">Reviews</label>
          <input
            type="number"
            {...register("reviews", { required: "Reviews count is required" })}
            className="w-full mt-1 p-2 border border-gray-400 rounded-lg focus:ring focus:ring-violet-300"
            placeholder="98"
          />
          {errors.reviews && <p className="text-red-500 text-sm">{errors.reviews.message}</p>}
        </div>

        {/* Duration */}
        <div>
          <label className="font-medium text-slate-700">Duration</label>
          <input
            type="text"
            {...register("duration", { required: "Duration is required" })}
            className="w-full mt-1 p-2 border border-gray-400 rounded-lg focus:ring focus:ring-violet-300"
            placeholder="2 Days"
          />
          {errors.duration && <p className="text-red-500 text-sm">{errors.duration.message}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="font-medium text-slate-700">Category</label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full mt-1 p-2 border border-gray-400 rounded-lg focus:ring focus:ring-violet-300"
          >
            <option value="">Select Category</option>
            <option value="City Tours">Beaches</option>
            <option value="City Tours">Boat Tours</option>
            <option value="City Tours">City Tours</option>
            <option value="City Tours">Hiking</option>
            <option value="City Tours">Honeymoon</option>
            <option value="City Tours">Museum Tours</option>
            <option value="Adventure">Adventure</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>

        {/* Image File Upload */}
        <div className="md:col-span-2">
          <label className="font-medium text-slate-700">Select Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full mt-1 p-2 border border-gray-400 rounded-lg focus:ring focus:ring-violet-300"
            onChange={(e) => {
              setSelectedFile(e.target.files[0]);
              setImageName(e.target.files[0]?.name);
            }}
          />
          {imageName && <p className="mt-1 text-sm text-gray-600">Selected: {imageName}</p>}
        </div>

        {/* destination select */}
        <div>
          <label className="font-semibold block mb-1">Destination</label>
          <select
            {...register("destination", { required: "Destination is required" })}
            className="w-full p-3 border border-gray-400 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select destination</option>
            {destinations.map((d, i) => (
              <option key={i} value={d}>
                {d}
              </option>
            ))}
          </select>
          {errors.destination && (
            <p className="text-red-500">{errors.destination.message}</p>
          )}
        </div>

        {/* Highlights (3 items) */}
        <div className="md:col-span-2 space-y-1">
          <label className="text-sm font-medium">Highlights (3)</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              {...register("highlights.0", { required: "Highlight 1 is required" })}
              placeholder="Highlight 1"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none"
            />
            <input
              type="text"
              {...register("highlights.1", { required: "Highlight 2 is required" })}
              placeholder="Highlight 2"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none"
            />
            <input
              type="text"
              {...register("highlights.2", { required: "Highlight 3 is required" })}
              placeholder="Highlight 3"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none"
            />
          </div>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="font-medium text-slate-700">Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            className="w-full mt-1 p-3 border border-gray-400 rounded-lg focus:ring focus:ring-violet-300"
            placeholder="Write brief tour description..."
            rows="4"
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 text-center mb-4">
          <button
            disabled={loading}
            className="flex items-center justify-center gap-2 px-6 py-2 w-full bg-violet-600 text-white text-lg rounded-xl shadow hover:bg-violet-700 transition disabled:bg-gray-400"
          >
            <span>{loading ? "Adding..." : "Add new Package"}</span>
            <img
              src={airplane}
              alt="Airplane"
              className={`w-8 transition-transform ${isLoading ? "animate-bounce" : ""
                }`}
            />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPackage;
