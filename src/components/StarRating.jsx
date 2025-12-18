import { Star } from "lucide-react";

const StarRating = ({ rating }) => {
  const totalStars = 5;

  return (
    <div className="flex items-center gap-1">
      {[...Array(totalStars)].map((_, index) => {
        const starNumber = index + 1;

        return (
          <Star
            key={index}
            size={16}
            className={
              starNumber <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }
          />
        );
      })}
    </div>
  );
};

export default StarRating;
