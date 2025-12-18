import { Calendar, Users, MapPin, Star, Mountain, Plane } from "lucide-react";
import { useParams } from "react-router-dom";
import StarRating from "./StarRating";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./LoadingSpinner";
import ErrorSpinner from "./ErrorSpinner";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";

const CardDetails = () => {
  const { _id } = useParams();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { cartItem, addToCart } = useCart();
  const { user } = useAuth();
  

  // Fetch tour details
  const { data: CardData, isLoading, isError } = useQuery({
    queryKey: ['tour', _id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/tours/${_id}`);
      return res.data;
    },
  });

  // Fetch payment history of current user
  const { data: payments = [] } = useQuery({
    queryKey: ['payments', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  // Check if this tour is already paid
  const isPaid = payments.some(
    (payment) => payment.tourId === _id && payment.payment_status === "paid"
  );

  // Check if added to cart
  const isAdded = cartItem.some((item) => item._id === CardData?._id);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorSpinner />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <div className="grid md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-xl p-6 md:p-10">

        {/* LEFT IMAGE */}
        <div>
          <img
            src={CardData.image}
            alt={CardData.title}
            className="w-full h-[420px] object-cover rounded-2xl shadow-md hover:shadow-2xl"
          />
        </div>

        {/* RIGHT DETAILS */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-3">
              {CardData.title}
            </h1>

            <span className="inline-block bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
              {CardData.category}
            </span>

            <div className="flex flex-wrap items-center gap-5 text-gray-600 mb-5">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-red-500" />
                <span>{CardData.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={18} className="text-purple-500" />
                <span>{CardData.people} People</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-pink-500" />
                <span>{CardData.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Plane size={18} className="text-pink-500" />
                <span>{CardData.destination}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-5">
              <StarRating rating={CardData.rating} />
              <span className="font-semibold">{CardData.rating}</span>
              <span className="text-gray-500 text-sm">({CardData.reviews} Reviews)</span>
            </div>

            <div className="text-3xl font-bold text-green-600 mb-6">
              ${CardData.price}
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              {CardData.description}
            </p>

            <div>
              <h3 className="text-xl font-semibold mb-2">Trip Highlights</h3>
              <ul className="space-y-2">
                {CardData.highlights?.map((point, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700">
                    <Mountain size={18} className="text-indigo-500" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* BOOK BUTTON */}
          <div className="mt-8">
            <button
              onClick={() => addToCart(CardData)}
              disabled={isAdded || isPaid}
              className={`w-full font-semibold py-3 rounded-xl text-lg shadow-lg transition-all ${isPaid
                  ? "bg-gray-400 cursor-not-allowed"
                  : isAdded
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-pink-500 hover:bg-pink-600 text-white"
                }`}
            >
              {isPaid
                ? "Already Purchased"
                : isAdded
                  ? "Already Added"
                  : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
