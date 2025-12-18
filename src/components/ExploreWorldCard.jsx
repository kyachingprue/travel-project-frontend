import React from "react";
import { Globe } from "lucide-react";
import { Link } from "react-router-dom";

const ExploreWorldCard = () => {
  return (
    <div
      className="hero h-96 rounded-2xl my-20"
      style={{
        backgroundImage:
          "url(https://i.ibb.co.com/ZRgTCCTB/360-F-1033648669-z-Hx3-Sfzng-CWb-QEybq-WZziv9e2b-TScuk-X.jpg)",
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        {/* Left Text Section */}
        <div className="max-w-lg">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Let’s Explore The Beauty
            <br />
            Of The World{" "}
            <Globe className="inline-block w-8 h-8 text-green-500" />
          </h2>

          <p className="text-gray-300 mt-4">
            We have many special offers especially for you.
          </p>

          <Link to="/packages">
            <button className="mt-6 bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-semibold shadow-md transition">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExploreWorldCard;
