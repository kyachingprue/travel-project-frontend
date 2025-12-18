import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const destinations = [
  {
    id: 1,
    title: "Enjoy the Beauty of the Rialto Bridge",
    place: "Venezia, Italy",
    rating: 4.8,
    image:
      "https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg",
  },
  {
    id: 2,
    title: "Enjoy the Beauty of the Floating City",
    place: "Venezia, Italy",
    rating: 4.6,
    image:
      "https://images.pexels.com/photos/373912/pexels-photo-373912.jpeg",
  },
  {
    id: 3,
    title: "Enjoy the Beauty of the Brazil City",
    place: "Brazil City",
    rating: 4.8,
    image:
      "https://images.pexels.com/photos/3586963/pexels-photo-3586963.jpeg",
  },
  {
    id: 4,
    title: "Enjoy the Beauty of the Nouter",
    place: "Netherlands",
    rating: 4.7,
    image:
      "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg",
  },
];

const TopDestinationSlider = () => {
  const [index, setIndex] = useState(0);

  // Auto-slide (every 3 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % destinations.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Manual navigation
  const prevSlide = () => {
    setIndex((prev) =>
      prev === 0 ? destinations.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % destinations.length);
  };

  return (
    <div className="py-20 px-6">
      {/* Title Section */}
      <div className="flex justify-between max-w-7xl mx-auto mb-10">
        <div>
          <p className="text-pink-500 font-semibold">TOP DESTINATION</p>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white">
            Explore Top Destination
          </h2>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-3">
          <button
            onClick={prevSlide}
            className="w-10 h-10 flex items-center justify-center rounded-full shadow bg-white hover:bg-gray-100 transition"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 flex items-center justify-center rounded-full shadow bg-white hover:bg-gray-100 transition"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* Slider */}
      <div className="overflow-hidden max-w-7xl mx-auto">
        <div
          className="flex transition-all duration-700"
          style={{
            transform: `translateX(-${index * 320}px)`,
          }}
        >
          {destinations.map((item) => (
            <div
              key={item.id}
              className="w-72 mr-6 shrink-0 rounded-3xl overflow-hidden shadow-lg relative"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-96 object-cover"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/40 to-transparent"></div>

              {/* Text Content */}
              <div className="absolute bottom-5 left-5 text-white">
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-sm opacity-80">{item.place}</p>

                <div className="flex items-center gap-1 mt-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <p className="text-sm">{item.rating}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Duplicate Cards for Infinite Feel */}
          {destinations.map((item) => (
            <div
              key={"dup-" + item.id}
              className="w-72 mr-6 shrink-0 rounded-3xl overflow-hidden shadow-lg relative"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/40 to-transparent"></div>
              <div className="absolute bottom-5 left-5 text-white">
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-sm opacity-80">{item.place}</p>

                <div className="flex items-center gap-1 mt-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <p className="text-sm">{item.rating}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopDestinationSlider;
