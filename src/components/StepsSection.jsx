import React from "react";
import { MessageCircle, MapPin, CalendarDays } from "lucide-react";
import { motion } from "motion/react"

const steps = [
  {
    icon: <MessageCircle size={70} strokeWidth={1.5} className="text-pink-500" />,
    title: "Tell Us What You Want To Do",
    desc: "Lorem ipsum dolor sit amet, ctetur adipiscing elit.",
  },
  {
    icon: <MapPin size={70} strokeWidth={1.5} className="text-purple-500" />,
    title: "Share Your Travel Location",
    desc: "Lorem ipsum dolor sit amet, ctetur adipiscing elit.",
  },
  {
    icon: <CalendarDays size={70} strokeWidth={1.5} className="text-orange-500" />,
    title: "Share Your Travel Preference",
    desc: "Lorem ipsum dolor sit amet, ctetur adipiscing elit.",
  },
];

// Animation Variants
const containerVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const StepsSection = () => {
  return (
    <div className="w-full py-28 px-6 md:px-20 bg-white">
      {/* Header */}
      <motion.div
        variants={itemVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-orange-400 tracking-widest font-semibold text-sm mb-3">
          3 STEPS FOR THE PERFECT TRIP
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1e1e4b] mb-4">
          Find Travel Perfection
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut.
        </p>
      </motion.div>

      {/* Steps */}
      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
      >
        {steps.map((step, index) => (
          <motion.div
            key={index}
            variants={itemVariant}
            className="flex flex-col items-center gap-4 relative"
          >
            {/* Icon */}
            <div className="p-5 bg-white shadow-md rounded-full border border-gray-100 hover:shadow-xl transition-all duration-300">
              {step.icon}
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-[#1e1e4b]">
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-gray-500 text-sm max-w-xs">
              {step.desc}
            </p>

            {/* Vertical Divider */}
            {index !== steps.length - 1 && (
              <div className="hidden md:block absolute -right[-40px] top-1/2 -w[1px] h-24 bg-gray-300"></div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default StepsSection;
