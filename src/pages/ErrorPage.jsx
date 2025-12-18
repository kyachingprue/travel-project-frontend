import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plane } from "lucide-react";
import animation from '../assets/airplane 1.jpg'

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-linear-to-b from-blue-100 to-white px-6 py-10 text-center">

      {/* Travel Icon / Error Illustration */}
      <div className="relative">
        <img
          src={animation}
          alt="Travel Error"
          className="w-72 md:w-96 rounded-2xl drop-shadow-xl"
        />
        <Plane className="absolute top-0 right-0 text-blue-600 w-10 h-10 animate-bounce" />
      </div>

      {/* Big Error Title */}
      <h1 className="text-7xl md:text-8xl font-extrabold text-blue-700 mt-6 drop-shadow-sm">
        404
      </h1>

      {/* Subtitle */}
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mt-3">
        Oops! Lost in the Journey ✈️
      </h2>

      {/* Description */}
      <p className="text-gray-600 max-w-xl mt-2 leading-relaxed">
        It seems you’ve taken a wrong turn. The page you’re looking for doesn’t exist
        or may have been moved. Let’s get you back on the right path!
      </p>

      {/* Go Back Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 bg-blue-600 mt-7 px-6 py-3 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 active:scale-95 transition-all"
      >
        <ArrowLeft className="w-5 h-5" />
        Go Back Home
      </button>
    </div>
  );
};

export default ErrorPage;
