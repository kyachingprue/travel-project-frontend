import React from "react";
import { motion } from "motion/react"
import image from "../assets/travel-image.jpg";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="w-full bg-linear-to-r from-[#fefefe] to-[#f3f9ff] py-20 px-6 md:px-20 mt-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">

        {/* LEFT TEXT SECTION */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex-1 text-center md:text-left"
        >
          <p className="text-orange-400 font-semibold tracking-widest mb-3">
            DISCOVER THE WORLD
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-snug text-[#1e1e4b] mb-5">
            Find Your Perfect
            <span className="text-blue-500"> Travel Destination</span>
          </h1>

          <p className="text-gray-600 max-w-md mx-auto md:mx-0 mb-6">
            Explore breathtaking places, hidden gems, and unforgettable adventures.
            Start your journey with curated tours designed just for you.
          </p>

          <Link to="/packages">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-info text-white px-8 shadow-md"
            >
              Explore Tours
            </motion.button>
          </Link>
        </motion.div>

        {/* RIGHT IMAGE SECTION */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex-1"
        >
          <motion.img
            src={image}
            alt="Travel Banner"
            className="w-full max-w-[550px] mx-auto rounded-xl shadow-lg"
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
