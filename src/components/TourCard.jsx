import { Calendar, Users, MapPin } from "lucide-react";
import StarRating from "./StarRating";
import { Link } from "react-router-dom";

const TourCard = ({ item }) => {
  return (
    <div className="w-full max-w-sm bg-white rounded-md shadow-md p-4">
      {/* Image */}
      <div className="group relative">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-56 object-cover rounded-md  transition-transform duration-500 
        group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-white text-black px-3 py-1 rounded-lg font-semibold shadow">
          ${item.price}
        </div>
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold mt-4 text-gray-900">
        {item.title}
      </h2>

      {/* Info Row */}
      <div className="flex items-center gap-4 text-sm text-gray-600 mt-3">
        <span className="flex items-center gap-1">
          <Calendar size={16} className="text-red-500" />
          {item.duration}
        </span>
        <span className="flex items-center gap-1">
          <Users size={16} className="text-purple-500" />
          People: {item.people}
        </span>
        <span className="flex items-center gap-1">
          <MapPin size={16} className="text-pink-500" />
          {item.destination}
        </span>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2 mt-3">
        <StarRating rating={item.rating} />
        <span className="font-semibold">{item.rating}</span>
        <span className="text-gray-500 text-sm">({item.reviews} Reviews)</span>
      </div>

      {/* Description */}
      <p className="text-gray-500 mt-3 leading-relaxed">
        {item.description}
      </p>

      {/* Button */}
      <Link to={`/details/${item._id || item.id}`}>
        <button className="mt-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded-xl shadow">
          Add to Cart
        </button>
      </Link>
    </div>
  );
};

export default TourCard;
