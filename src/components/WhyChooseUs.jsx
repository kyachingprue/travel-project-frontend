import React from "react";
import { Hotel, BadgeCheck, BadgeDollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const WhyChooseUs = () => {
  return (
    <div className="bg-blue-950 py-20 px-5">
      {/* Section Title */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-pink-400 font-semibold tracking-wide">
          3 STEPS OF THE PERFECT TRIP
        </p>
        <h2 className="text-4xl font-extrabold text-white mt-2">
          Why Choose Us
        </h2>
        <p className="text-gray-300 mt-3 text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      {/* Features Row */}
      <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
        {/* Item */}
        <div className="text-center">
          <div className="mb-3 flex justify-center">
            <Hotel className="w-14 h-14 text-blue-300" />
          </div>
          <h4 className="font-bold text-white text-lg">Handpicked Hotels</h4>
          <p className="text-gray-400 mt-2 text-sm">
            Lorem ipsum dolor sit amet, cletur adipisicing elit.
          </p>
        </div>

        {/* Item */}
        <div className="text-center">
          <div className="mb-3 flex justify-center">
            <BadgeCheck className="w-14 h-14 text-pink-300" />
          </div>
          <h4 className="font-bold text-white text-lg">World Class Service</h4>
          <p className="text-gray-400 mt-2 text-sm">
            Lorem ipsum dolor sit amet, cletur adipisicing elit.
          </p>
        </div>

        {/* Item */}
        <div className="text-center">
          <div className="mb-3 flex justify-center">
            <BadgeDollarSign className="w-14 h-14 text-orange-300" />
          </div>
          <h4 className="font-bold text-white text-lg">Best Price Guarantee</h4>
          <p className="text-gray-400 mt-2 text-sm">
            Lorem ipsum dolor sit amet, cletur adipisicing elit.
          </p>
        </div>
      </div>

      {/* Bottom Content */}
      <div className="mt-24 grid md:grid-cols-2 gap-10 max-w-6xl mx-auto items-center">
        {/* Left Image */}
        <div className="relative">
          <img
            src="https://i.ibb.co.com/Qvpzt0KK/smiling-elegant-asian-female-stewardess-600nw-2269411369.jpg"
            alt="Woman"
            className="rounded-[40px] shadow-2xl"
          />

          <img
            src="https://i.ibb.co.com/W4Pwd9Xz/motherland-calls.jpg"
            alt="Items"
            className="w-48 h-48 object-cover rounded-full border-4 border-white absolute -bottom-5 -right-5 shadow-xl"
          />
        </div>

        {/* Text Content */}
        <div>
          <p className="text-pink-400 font-semibold tracking-wide">
            OUR TOUR DETAILS
          </p>

          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mt-2">
            Hello, Our Agency Has <br />
            Been Present Best In <br />
            The Market
          </h2>

          <p className="text-gray-300 mt-5 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Morbi
            dictum rhoncus vulputate egestas pretium at. Rhoncus, blandit massa
            dui felis imperdiet.
          </p>

          <Link to="/packages">
            <button className="mt-6 px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-full shadow-lg transition-all">
              Tour Packages
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
