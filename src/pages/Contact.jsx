import React, { useState } from "react";
import { Send } from "lucide-react";
import toast from "react-hot-toast";

const offices = [
  {
    title: "HEADQUARTERS",
    city: "NEW YORK",
    address: "60 East 60th Street NY 10065",
  },
  {
    title: "PLAN YOUR VISIT",
    city: "Working hours:",
    address: "Monday - Friday 9 am to 7 pm EST",
  },
  {
    title: "CALIFORNIA OFFICE",
    city: "LOS ANGELES",
    address: "31 St. Main Street LA 34561",
  },
  {
    title: "CANADA OFFICE",
    city: "TORONTO",
    address: "226 Young Street TO M9C2",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    toast.success("Message Sent Successfully!");
  };

  return (
    <div className="w-full">
      <div className="relative">
        <img
          src="https://i.ibb.co.com/HDRM34RT/beautiful-beach-free-image-after-sunset-sky-free-photo.webp"
          alt="hero"
          className="w-full h-[300px] object-cover"
        />
        <div className="absolute inset-0 bg-opacity-40 flex items-center px-10">
          <div>
            <h1 className="text-white text-4xl pt-10 font-bold">Contact</h1>
            <p className="text-gray-200 mt-2">Home &gt; Contact</p>
          </div>
        </div>
      </div>

      {/* ---------- REACH OUT SECTION ---------- */}
      <div className="max-w-6xl mx-auto px-5 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <h2 className="text-3xl text-white font-bold">Reach out to us</h2>
          <p className="text-orange-600 font-bold text-2xl">1-800-700-600</p>
        </div>

        {/* Offices Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mt-12">
          {offices.map((item, index) => (
            <div key={index}>
              <p className="text-gray-400 text-sm tracking-wide">
                {item.title}
              </p>
              <h3 className="font-bold text-white uppercase text-lg mt-1">{item.city}</h3>
              <p className="text-gray-400 mt-1">{item.address}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- FORM SECTION ---------- */}
      <div className="max-w-4xl mx-auto px-5 pb-20">
        <h2 className="text-center text-white text-2xl md:text-3xl font-bold mb-10">
          Leave us a little info,<br /> and we'll be in touch.
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 p-8 rounded-xl shadow-md"
        >
          {/* Inputs Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <input
              type="text"
              name="name"
              required
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              className="p-3 border border-gray-400 rounded-lg w-full outline-none"
            />

            <input
              type="text"
              name="subject"
              placeholder="Your subject"
              value={formData.subject}
              onChange={handleChange}
              className="p-3 border border-gray-400 rounded-lg w-full outline-none"
            />
          </div>

          {/* Inputs Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <input
              type="email"
              name="email"
              required
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              className="p-3 border border-gray-400 rounded-lg w-full outline-none"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleChange}
              className="p-3 border border-gray-400 rounded-lg w-full outline-none"
            />
          </div>

          {/* Message */}
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            className="p-3 border border-gray-400 rounded-lg w-full outline-none"
          ></textarea>

          {/* Button */}
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full flex items-center gap-2"
            >
              <Send size={18} /> Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
