import { Plane, MapPin, Compass } from 'lucide-react';
import { motion } from 'motion/react';

const packages = [
  {
    id: 1,
    title: "Mountain Adventure",
    location: "Nepal",
    price: "$350",
  },
  {
    id: 2,
    title: "Beach Paradise",
    location: "Maldives",
    price: "$500",
  },
  {
    id: 3,
    title: "Safari Journey",
    location: "Kenya",
    price: "$600",
  },
];

export default function TravelPackage() {
  return (
    <section className="py-16 px-6 md:px-16 mt-10 md:mt-16 bg-linear-to-r from-[#6DD5FA] via-[#2980B9] to-[#00C6FF] text-white">
      {/* Heading */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-6"
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide">All Tour Packages</h2>
        <p className="mt-2 text-lg text-white/90">
          Explore the world with our specially curated tour packages. Adventure awaits!
        </p>
      </motion.div>

      {/* Packages */}
      <div className="grid md:grid-cols-3 gap-8 mt-10">
        {packages.map((pkg) => (
          <motion.div
            key={pkg.id}
            whileHover={{ scale: 1.05, boxShadow: '0px 15px 30px rgba(0,0,0,0.3)' }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">{pkg.title}</h3>
              <Plane className="w-6 h-6 text-white" />
            </div>
            <p className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-white" /> {pkg.location}
            </p>
            <p className="font-bold text-lg">{pkg.price}</p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex gap-3 mt-auto"
            >
              <Compass className="w-6 h-6 text-white/80 hover:text-white cursor-pointer transition" />
              <Plane className="w-6 h-6 text-white/80 hover:text-white cursor-pointer transition" />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
