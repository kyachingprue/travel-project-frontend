import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import BlogCard from "../components/BlogCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorSpinner from "../components/ErrorSpinner";

const fetchBlogs = async (page, axiosPublic) => {
  const res = await axiosPublic.get(`/blogs?page=${page}&limit=6`);
  return res.data;
};

const BlogsList = () => {
  const axiosPublic = useAxiosPublic();
  const [page, setPage] = useState(1);

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blogs", page],     // ← pagination works here
    queryFn: () => fetchBlogs(page, axiosPublic),
    staleTime: 1000 * 60 * 2,
    keepPreviousData: true,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorSpinner />;

  const { blogs, totalPages } = data;

  return (
    <div className="py-20">

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs?.map((item) => (
          <BlogCard key={item._id} data={item} />
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

        <span className="font-semibold text-white">
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

    </div>
  );
};

export default BlogsList;
