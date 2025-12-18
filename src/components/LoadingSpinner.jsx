import { Plane } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      {/* Animated Airplane */}
      <div className="relative">
        <Plane className="w-12 h-12 text-blue-600 animate-bounce" />

        {/* Glow Effect */}
        <div className="absolute inset-0 blur-xl bg-blue-400/30 rounded-full"></div>
      </div>

      {/* Text */}
      <p className="text-lg font-medium text-gray-200 animate-pulse">
        Loading your travel experience...
      </p>
    </div>
  );
};

export default LoadingSpinner;
