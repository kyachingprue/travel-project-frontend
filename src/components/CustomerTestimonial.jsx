import { Star } from "lucide-react";

export default function CustomerTestimonial() {
  const customers = [
    { id: 1, img: "https://i.ibb.co.com/jk4g65DT/montreal-quebec-canada-07-04-260nw-2379955265.jpg", position: "top-[32%] left-[14%]" },
    { id: 2, img: "https://i.ibb.co.com/kgyzdHr9/0fe42779319619-5cc5c9c82a220.jpg", position: "top-[30%] right-[5%]" },
    { id: 3, img: "https://i.ibb.co.com/dJ3Hv7mx/los-angelescalifornia-jan-27-2017-260nw-596798342.jpg", position: "top-[65%] right-[70%]" },
    { id: 4, img: "https://i.ibb.co.com/7JcCwZ5d/gulfnews-2025-02-27-7tbpbzab-fly-jinnah.jpg", position: "bottom-[17%] right-[10%]" },
    { id: 5, img: "https://i.ibb.co.com/XrnDwt84/airbus-a220-300.jpg", position: "bottom-[35%] left-[45%]" }
  ];

  return (
    <div className="w-full bg-indigo-950 rounded-2xl mb-22 py-20 px-6 md:px-16 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Left Section */}
      <div className="flex flex-col justify-center">
        <p className="text-sm font-semibold text-red-600 tracking-wide">WHAT THEY SAY</p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mt-2 text-white">
          With Our Customer <br /> Say About Us🥰
        </h1>
        <p className="mt-4 text-gray-400 max-w-md">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dictum rhoncus vulputate egestas pretium et. Rhoncus, blandit massa dui.
        </p>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-100">Ari Smith <span className="font-normal text-gray-300"> • Food Enthusiast</span></h3>
          <div className="flex items-center gap-1 mt-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} size={18} className="text-yellow-500 fill-yellow-500" />
            ))}
          </div>
        </div>
      </div>

      {/* Right Map / Icons Section */}
      <div className="relative h-[450px] w-full">
        {/* Background world map */}
        <img
          src="https://i.ibb.co.com/Xk8f6fF8/world-travel-map-with-airplanes-flight-routes-and-pins-marker-illustration-vector.jpg"
          alt="World Map"
          className="w-full h-full object-contain rounded-md opacity-60"
        />

        {/* Floating customer avatars */}
        {customers.map((c) => (
          <div
            key={c.id}
            className={`absolute ${c.position} transform -translate-x-1/2 -translate-y-1/2`}
          >
            <img
              src={c.img}
              alt="customer"
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
