import { TriangleAlert } from "lucide-react";

const ErrorSpinner = ({ message = "Something went wrong!" }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-3">
      <TriangleAlert className="w-12 h-12 text-red-600" />
      <p className="text-red-600 font-medium text-lg">{message}</p>
    </div>
  );
};

export default ErrorSpinner;
