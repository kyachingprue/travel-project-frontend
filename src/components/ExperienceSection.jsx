import React from "react";
import { motion } from "motion/react"
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import image from "../assets/images.jpg"

const ExperienceSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <div className="w-full py-24 px-6 md:px-20 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

        {/* LEFT SIDE (IMAGE) */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative flex justify-center"
        >
          {/* Decorative Circle */}
          <div className="absolute w-[350px] h-[350px] bg-pink-200 rounded-full -z-10"></div>

          {/* Floating Traveler Image */}
          <motion.img
            src={image}
            alt="Traveler"
            className="w-[320px] md:w-[450px] object-cover rounded-xl shadow-lg"
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          />

          {/* Experience Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="absolute bottom-2 right-4 bg-white px-5 py-3 rounded-2xl shadow-xl border"
          >
            <p className="font-semibold text-gray-700 mb-1">How was your Experience?</p>
            <p className="text-xl">😍 🤩 😅 😐 😡</p>
          </motion.div>

        </motion.div>

        {/* RIGHT SIDE (TEXT + COUNTERS) */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6"
          ref={ref}
        >
          <p className="text-orange-500 font-semibold tracking-widest">
            OUR EXPERIENCE
          </p>

          <h1 className="text-3xl md:text-4xl font-extrabold text-[#1e1e4b] leading-snug">
            With Our Experience We <br /> Will Serve You <span className="text-3xl">🌈</span>
          </h1>

          <p className="text-gray-500 max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dictum
            rhoncus vulputate egestas pretium at. Rhoncus, blandit massa dui felis imperdiet.
          </p>

          {/* COUNTERS */}
          <div className="grid grid-cols-3 gap-6 mt-4">
            {/* Years Experience */}
            <div>
              <h2 className="text-2xl font-extrabold text-orange-500">
                {inView && <CountUp start={0} end={20} duration={2} />}+
              </h2>
              <p className="text-gray-500 text-sm">Years<br />Experience</p>
            </div>

            {/* Destination Collaboration */}
            <div>
              <h2 className="text-2xl font-extrabold text-pink-500">
                {inView && <CountUp start={0} end={460} duration={2.5} />}+
              </h2>
              <p className="text-gray-500 text-sm">Destination<br />Collaboration</p>
            </div>

            {/* Happy Customer */}
            <div>
              <h2 className="text-2xl font-extrabold text-red-500">
                {inView && <CountUp start={0} end={5000} duration={3} />}+
              </h2>
              <p className="text-gray-500 text-sm">Happy<br />Customer</p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default ExperienceSection;
