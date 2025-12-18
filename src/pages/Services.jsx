import React from 'react';
import {
  Airplay,
  Calendar,
  Users,
  MapPin,
  Compass,
  Briefcase,
  Car,
  LifeBuoy,
  BookOpen
} from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  { icon: <Airplay size={32} />, title: 'Air Ticketing', desc: 'Book flights easily with our seamless platform.' },
  { icon: <Calendar size={32} />, title: 'Hotel Bookings', desc: 'Reserve your stay at top hotels around the world.' },
  { icon: <Users size={32} />, title: 'Meet & Assist', desc: 'Personal assistance during your travels.' },
  { icon: <MapPin size={32} />, title: 'Tour & Travel', desc: 'Organized travel tours with experienced guides.' },
  { icon: <Compass size={32} />, title: 'Itinerary Planning', desc: 'Custom travel plans tailored to your needs.' },
  { icon: <BookOpen size={32} />, title: 'Adventure Travel', desc: 'Explore adventurous activities safely.' },
  { icon: <Briefcase size={32} />, title: 'Business Travel', desc: 'Efficient business travel arrangements.' },
  { icon: <Car size={32} />, title: 'Car Find', desc: 'Easily find and rent cars anywhere.' },
];

const steps = [
  { title: 'Book & relax', desc: 'Choose your service and book quickly, everything ready for you.' },
  { title: 'Book & relax', desc: 'We handle every step from simple planning to full complex trips.' },
  { title: 'Save more', desc: 'Get the best deals and save your money and time.' },
];

const Services = () => {
  return (
    <div className="w-full pt-20">
      {/* Hero Section */}
      <div className="relative w-full h-72">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
          alt="Our Services"
          className="w-full h-full rounded-md object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl font-bold">Our Services</h1>
          <p className="mt-2 text-lg">Home / Our Services</p>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16 px-4 md:px-16 text-center">
        <h2 className="text-3xl text-white font-bold mb-4">Our Services</h2>
        <p className="text-gray-400 mb-12">Stocka is a production-ready library of stackable content blocks built in React Native.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-6 border border-gray-200 rounded-lg transition-shadow duration-300 bg-white"
            >
              <div className="text-green-500 mb-4 flex justify-center">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-500">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 rounded-md py-16 px-4 md:px-16">
        <h2 className="text-3xl font-bold text-center mb-4">How it works</h2>
        <p className="text-gray-500 text-center mb-12">Stocka is a production-ready library of stackable content blocks built in React Native.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Get Started Section */}
      <div className="py-16 px-4 md:px-16 flex flex-col md:flex-row items-center gap-8">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
          alt="Get Started"
          className="w-full md:w-1/2 rounded-lg shadow-lg"
        />
        <div className="md:w-1/2">
          <h2 className="text-3xl text-white font-bold mb-4">Let's Get Started</h2>
          <p className="text-gray-400 mb-6">Save time, save money. Stocka is a production-ready library of stackable content blocks built in React Native.</p>
          <Link to="/packages"><button className="btn btn-primary btn-lg">Start your search</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
