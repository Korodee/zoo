"use client";

import { motion } from "framer-motion";
import { Camera, PawPrint } from "lucide-react";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Gallery() {
  const zooImages = [
    {
      name: "African Lion",
      category: "Big Cats",
      image:
        "https://images.unsplash.com/photo-1549366021-9f761d450615?w=600&h=400&fit=crop",
      description: "Majestic king of the jungle",
      status: "Active",
      age: "8 years",
      location: "Savanna Habitat",
    },
    {
      name: "Elephant Family",
      category: "Mammals",
      image:
        "https://images.unsplash.com/photo-1547721064-da6cfb341d50?w=600&h=400&fit=crop",
      description: "Gentle giants of the savanna",
      status: "Active",
      age: "15 years",
      location: "African Plains",
    },
    {
      name: "Giraffe",
      category: "Mammals",
      image:
        "https://images.unsplash.com/photo-1547721064-da6cfb341d50?w=600&h=400&fit=crop",
      description: "Tallest land animal",
      status: "Active",
      age: "12 years",
      location: "Savanna Habitat",
    },
    {
      name: "Penguin Colony",
      category: "Birds",
      image:
        "https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?w=600&h=400&fit=crop",
      description: "Adorable waddling friends",
      status: "Active",
      age: "5 years",
      location: "Polar Zone",
    },
    {
      name: "Bengal Tiger",
      category: "Big Cats",
      image:
        "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=600&h=400&fit=crop",
      description: "Striped beauty of the wild",
      status: "Active",
      age: "10 years",
      location: "Tiger Territory",
    },
    {
      name: "Mountain Gorilla",
      category: "Primates",
      image:
        "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=600&h=400&fit=crop",
      description: "Intelligent and powerful",
      status: "Active",
      age: "18 years",
      location: "Gorilla Sanctuary",
    },
    {
      name: "Red Panda",
      category: "Mammals",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
      description: "Adorable bamboo lover",
      status: "Active",
      age: "6 years",
      location: "Bamboo Forest",
    },
    {
      name: "Snow Leopard",
      category: "Big Cats",
      image:
        "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=600&h=400&fit=crop",
      description: "Ghost of the mountains",
      status: "Active",
      age: "9 years",
      location: "Mountain Habitat",
    },
    {
      name: "Meerkat Family",
      category: "Mammals",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
      description: "Curious desert dwellers",
      status: "Active",
      age: "4 years",
      location: "Desert Zone",
    },
  ];

  return (
    <section
      id="gallery"
      className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full mb-6 shadow-lg"
          >
            <Camera className="h-8 w-8 text-white" />
          </motion.div>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            variants={itemVariants}
          >
            Meet Our Wildlife
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Discover the incredible diversity of animals that call WildLife Hub
            their home. Each creature has a unique story and plays a vital role
            in our ecosystem.
          </motion.p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
            <div className="text-2xl font-bold text-primary-600 mb-2">9</div>
            <div className="text-sm text-gray-600">Animal Species</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">100%</div>
            <div className="text-sm text-gray-600">Healthy Animals</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">5</div>
            <div className="text-sm text-gray-600">Habitats</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">24/7</div>
            <div className="text-sm text-gray-600">Care & Monitoring</div>
          </div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {zooImages.map((animal, index) => (
            <motion.div
              key={index}
              className="group cursor-pointer"
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 group-hover:scale-105 relative">
                <div className="relative overflow-hidden">
                  <div className="w-full h-64 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <img
                      src={animal.image}
                      alt={animal.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        const img = e.currentTarget;
                        img.style.display = "none";
                        const fallback = img.nextElementSibling as HTMLElement;
                        if (fallback) {
                          fallback.style.display = "flex";
                        }
                      }}
                    />
                    <div className="hidden w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 items-center justify-center">
                      <div className="text-center">
                        <PawPrint className="h-12 w-12 text-primary-600 mx-auto mb-2" />
                        <p className="text-primary-700 font-semibold">
                          {animal.name}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 shadow-sm">
                      {animal.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <div className="bg-green-500/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-white shadow-sm">
                      {animal.status}
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-sm">
                      <Camera className="h-4 w-4 text-gray-700" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {animal.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    {animal.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Age:</span>
                      <span className="font-medium">{animal.age}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Location:</span>
                      <span className="font-medium">{animal.location}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                      <span>Active & Healthy</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link href="/signup" className="inline-block">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-full font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 mx-auto"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>See More Animals</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
