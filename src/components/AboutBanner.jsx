import React from "react";
import banner from "../assets/Canada-views.jpg";
import { Link } from "react-router-dom";

const AboutBanner = () => {
  return (
    <div className="relative w-full mt-20 px-6 md:px-20 py-16">

      {/* Background Blur Card */}
      <div className="absolute inset-0 bg-[url('../assets/Canada-views.jpg')] bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0 backdrop-blur-xl"></div>

      <div className="relative flex flex-col md:flex-row items-center gap-12 max-w-7xl mx-auto">

        {/* LEFT CONTENT */}
        <div className="flex-1 space-y-4">
          <p className="text-orange-400 tracking-wide font-medium">
            ✦ We Take Care of Your Trip
          </p>

          <h3 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-white to-orange-300 drop-shadow-lg">
            About Us
          </h3>

          <p className="text-gray-200 text-lg leading-relaxed">
            Discover breathtaking destinations, unforgettable experiences, and a
            journey tailored just for you. Our mission is to make your travel
            dreams come true with comfort, safety, and adventure in every step.
          </p>

          <Link to="/packages">
            <button className="mt-4 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl shadow-lg transition-all duration-300 hover:scale-105">
              Learn More
            </button>
          </Link>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1">
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/20 hover:scale-105 transition-all duration-500">
            <img
              src={banner}
              alt="About Banner"
              className="w-full h-[360px] object-cover"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutBanner;
