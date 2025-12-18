import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Pencil, Trash2, Loader2, X, MapPin, HandCoins, Timer } from "lucide-react";
import useAxiosSecure from "../hooks/useAxiosSecure";

const fetchTours = async (axiosSecure) => {
  const res = await axiosSecure.get("/tours");
  return res.data;
};

const AllPackages = () => {
  const axiosSecure = useAxiosSecure();
  const [editingPackage, setEditingPackage] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  // FETCH ALL TOURS
  const { data: packages = [], isLoading, refetch } = useQuery({
    queryKey: ["tours"],
    queryFn: () => fetchTours(axiosSecure),
  });

  // DELETE PACKAGE
  const { mutate: deletePackage } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/tours/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Package deleted successfully!");
      refetch();
    },
    onError: () => toast.error("Failed to delete package"),
  });

  const handleDelete = (id) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2 p-2">
          <p className="font-medium">Are you sure you want to delete this package?</p>
          <div className="flex justify-end gap-2">
            <button
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={() => {
                deletePackage(id);
                toast.dismiss(t.id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  // UPDATE PACKAGE
  const { mutate: updatePackage, isLoading: updating } = useMutation({
    mutationFn: async (data) => {
      if (!editingPackage?._id) throw new Error("Invalid package selected for update");

      const payload = { ...data, people: Number(data.people) };
      delete payload.admin;

      payload.highlights = payload.highlights
        ? Array.isArray(payload.highlights)
          ? payload.highlights
          : payload.highlights.split(",").map((h) => h.trim())
        : [];

      const res = await axiosSecure.put(`/tours/${editingPackage._id}`, payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Package updated successfully!");
      refetch();
      setEditingPackage(null);
    },
    onError: (err) => toast.error("Failed to update package: " + err?.message),
  });

  // OPEN EDIT MODAL
  const openEditModal = (pkg) => {
    setEditingPackage(pkg);

    reset({
      title: pkg.title || "",
      location: pkg.location || "",
      price: !isNaN(Number(pkg.price)) ? Number(pkg.price) : 0,
      people: !isNaN(Number(pkg.people)) ? Number(pkg.people) : 1,
      duration: pkg.duration || "",
      rating: !isNaN(Number(pkg.rating)) ? Number(pkg.rating) : 0,
      reviews: !isNaN(Number(pkg.reviews)) ? Number(pkg.reviews) : 0,
      category: pkg.category || "",
      destination: pkg.destination || "",
      description: pkg.description || "",
      image: pkg.image || "",
      highlights: Array.isArray(pkg.highlights)
        ? pkg.highlights.join(", ")
        : pkg.highlights || "",
    });
  };

  // FORM SUBMIT
  const onSubmit = (formData) => updatePackage(formData);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 size={40} className="animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className=" md:p-4">
      <h2 className="text-2xl font-semibold mb-5 text-gray-800">
        All Tour Packages ({packages.length})
      </h2>

      {/* Packages Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            className="border border-gray-300 rounded-xl shadow-sm bg-white overflow-hidden hover:shadow-2xl transition"
          >
            <img src={pkg.image} alt={pkg.title} className="w-full h-52 object-cover" />
            <div className="p-4 space-y-3">
              <h3 className="font-semibold text-lg">{pkg.title}</h3>
              <p className="text-gray-600 text-sm">
                {pkg.description.length > 90 ? pkg.description.slice(0, 90) + "..." : pkg.description}
              </p>
              <p className="text-sm font-medium flex gap-1 items-center"><HandCoins size={16} /> Location: {pkg.location}</p>
              <p className="text-sm font-medium flex gap-1 items-center"><MapPin size={16} /> Price: ${pkg.price}</p>
              <p className="text-sm font-medium flex gap-1 items-center"><Timer size={16} /> Duration: {pkg.duration}</p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => openEditModal(pkg)}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                >
                  <Pencil size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(pkg._id)}
                  className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start py-20 z-50 overflow-auto">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setEditingPackage(null)}
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-semibold mb-4">Edit Tour Package</h3>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <input {...register("title")} placeholder="Title" className="w-full border px-3 py-2 rounded" required />
              <input {...register("location")} placeholder="Location" className="w-full border px-3 py-2 rounded" required />
              <input {...register("price")} type="number" placeholder="Price" className="w-full border px-3 py-2 rounded" required />
              <input {...register("people")} type="number" placeholder="People" className="w-full border px-3 py-2 rounded" />
              <input {...register("duration")} placeholder="Duration" className="w-full border px-3 py-2 rounded" />
              <input {...register("rating")} type="number" step="0.1" placeholder="Rating" className="w-full border px-3 py-2 rounded" />
              <input {...register("reviews")} type="number" placeholder="Reviews" className="w-full border px-3 py-2 rounded" />
              <input {...register("category")} placeholder="Category" className="w-full border px-3 py-2 rounded" />
              <input {...register("destination")} placeholder="Destination" className="w-full border px-3 py-2 rounded" />
              <textarea {...register("description")} placeholder="Description" className="w-full border px-3 py-2 rounded" />
              <input {...register("image")} placeholder="Image URL" className="w-full border px-3 py-2 rounded" />
              <input {...register("highlights")} placeholder="Highlights (comma-separated)" className="w-full border px-3 py-2 rounded" />
              <button type="submit" disabled={updating} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Update Package
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPackages;
