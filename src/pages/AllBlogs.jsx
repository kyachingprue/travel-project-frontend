import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Pencil, Trash2, Loader2, X } from "lucide-react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const fetchBlogs = async (axiosSecure, page, email) => {
  const res = await axiosSecure.get(`/blogs?email=${email}&page=${page}&limit=6`);
  return res.data;
};

const AllBlogs = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [page, setPage] = useState(1);

  // EDIT STATE
  const [editingBlog, setEditingBlog] = useState(null); // store blog to edit

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["blogs", user?.email, page],
    queryFn: () => fetchBlogs(axiosSecure, page, user.email),
    keepPreviousData: true,
  });

  const blogs = data?.blogs || [];
  const totalPages = data?.totalPages || 1;

  // DELETE BLOG
  const { mutate: deleteBlog, isLoading: deleting } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/blogs/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Blog deleted");
      refetch();
    },
    onError: () => toast.error("Failed to delete blog"),
  });

  // UPDATE BLOG
  const { register, handleSubmit, reset } = useForm();
  const { mutate: updateBlog, isLoading: updating } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.put(`/blogs/${editingBlog._id}`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Blog updated successfully!");
      refetch();
      setEditingBlog(null);
    },
    onError: () => toast.error("Failed to update blog"),
  });

  const handleDelete = (id) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2 p-2">
          <p className="font-medium">Are you sure you want to delete this blog?</p>
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
                deleteBlog(id);
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

  const openEditModal = (blog) => {
    setEditingBlog(blog);
    reset({
      title: blog.title,
      description: blog.description,
      image: blog.image,
      authorName: blog.authorName,
      authorImage: blog.authorImage,
      authorTitle: blog.authorTitle,
      email: blog.email,
    });
  };

  const onSubmit = (formData) => {
    updateBlog(formData);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 size={40} className="animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="md:p-4 mb-12 md:mb-0">
      <h2 className="text-2xl font-semibold mb-5 text-gray-800">
        My Blogs ({blogs.length})
      </h2>

      {/* Blogs Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="border border-gray-300 rounded-xl shadow-sm bg-white overflow-hidden hover:shadow-2xl transition"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-52 object-cover"
            />

            <div className="p-4 space-y-3">
              <h3 className="font-semibold text-lg">{blog.title}</h3>

              <p className="text-gray-600 text-sm">
                {blog.description.length > 90
                  ? blog.description.slice(0, 90) + "..."
                  : blog.description}
              </p>

              <div className="flex items-center gap-3 mt-2">
                <img
                  src={blog.authorImage}
                  alt="Author"
                  className="w-10 h-10 rounded-full object-cover border"
                />
                <div>
                  <p className="font-medium text-sm">{blog.authorName}</p>
                  <p className="text-xs text-gray-500">{blog.email}</p>
                </div>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => openEditModal(blog)}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                >
                  <Pencil size={16} /> Edit
                </button>

                <button
                  disabled={deleting}
                  onClick={() => handleDelete(blog._id)}
                  className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 disabled:bg-gray-400"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-10 gap-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="font-semibold">
          Page {page} / {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {blogs.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          You have not created any blogs yet.
        </p>
      )}

      {/* Edit Modal */}
      {editingBlog && (
        <div className="fixed inset-0 bg-linear-to-bl from-violet-500 to-fuchsia-500 bg-opacity-50 flex justify-center items-start py-7 z-50">
          <div className="bg-white rounded-lg w-full max-w-xl p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setEditingBlog(null)}
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-semibold mb-4">Edit Blog</h3>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("title")}
                placeholder="Title"
                className="w-full border border-gray-400 px-3 py-2 rounded"
                required
              />
              <textarea
                {...register("description")}
                placeholder="Description"
                className="w-full border border-gray-400 px-3 py-2 rounded"
                required
              />
              <input
                {...register("image")}
                placeholder="Image URL"
                className="w-full border border-gray-400 px-3 py-2 rounded"
                required
              />
              <input
                {...register("authorName")}
                placeholder="Author Name"
                className="w-full border border-gray-400 px-3 py-2 rounded"
                required
              />
              <input
                {...register("authorImage")}
                placeholder="Author Image URL"
                className="w-full border border-gray-400 px-3 py-2 rounded"
                required
              />
              <input
                {...register("authorTitle")}
                placeholder="Author Title"
                className="w-full border border-gray-400 px-3 py-2 rounded"
              />
              <input
                {...register("email")}
                placeholder="Email"
                className="w-full border border-gray-400 px-3 py-2 rounded"
                required
              />
              <button
                type="submit"
                disabled={updating}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Update Blog
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBlogs;
