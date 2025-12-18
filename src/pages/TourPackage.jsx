import React, { useState } from "react";
import TourCard from "../components/TourCard";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorSpinner from "../components/ErrorSpinner";

const TourPackage = () => {
  const axiosPublic = useAxiosPublic();
  const [currentPage, setCurrentPage] = useState(1);
  const toursPerPage = 12;

  const { data: tour = [], isLoading, isError } = useQuery({
    queryKey: ['tours'],
    queryFn: async () => {
      const res = await axiosPublic.get('/tours')
      return res.data;
    }
  })

  if (isLoading) {
    return <LoadingSpinner />
  }
  if (isError) {
    return <ErrorSpinner />
  }

  // Calculate pagination
  const indexOfLastTour = currentPage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = tour.slice(indexOfFirstTour, indexOfLastTour);
  const totalPages = Math.ceil(tour.length / toursPerPage);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="bg-cyan-800 min-h-screen pb-10">
      <h3 className="text-center text-white text-3xl font-bold pt-44">
        Tour Package
      </h3>

      {/* Tour Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 py-10">
        {currentTours.map((item, index) => (
          <TourCard key={index} item={item} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 flex-wrap mt-6">
        {/* Previous Button */}
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md font-semibold ${currentPage === 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-violet-100"
            }`}
        >
          Prev
        </button>

        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={index}
              onClick={() => paginate(page)}
              className={`px-4 py-2 rounded-md font-semibold ${currentPage === page
                ? "bg-violet-600 text-white"
                : "bg-white text-gray-700 hover:bg-violet-100"
                }`}
            >
              {page}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md font-semibold ${currentPage === totalPages
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-violet-100"
            }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TourPackage;
