"use client";

import { motion } from "framer-motion";
import { Camera, Heart, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Gallery() {
  const router = useRouter();
  const zooImages = [
    {
      name: "Llama",
      category: "Camélidés",
      image:
        "https://images.unsplash.com/photo-1617096000801-bd71df8d6d8f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987",
      description: "Gentil compagnon des Andes",
      status: "Actif",
      age: "5 ans",
      location: "Domaine du Chevreuil Blanc",
    },
    {
      name: "Alpaga",
      category: "Camélidés",
      image:
        "https://images.unsplash.com/photo-1589182337358-2cb63099350c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987",
      description: "Laine douce et naturelle",
      status: "Actif",
      age: "4 ans",
      location: "Domaine du Chevreuil Blanc",
    },
    {
      name: "Wapiti",
      category: "Cervidés",
      image:
        "https://images.unsplash.com/photo-1603486001734-7d92cedd1d33?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1064",
      description: "Cerf majestueux d'Amérique du Nord",
      status: "Actif",
      age: "6 ans",
      location: "Domaine du Chevreuil Blanc",
    },
    {
      name: "Bison",
      category: "Bovins",
      image:
        "https://images.unsplash.com/photo-1668278535123-73de3fecb59e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2940",
      description: "Géant des plaines nord-américaines",
      status: "Actif",
      age: "8 ans",
      location: "Domaine du Chevreuil Blanc",
    },
    {
      name: "Cerf Sika",
      category: "Cervidés",
      image:
        "https://plus.unsplash.com/premium_photo-1661819541230-034d07819c9b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2072",
      description: "Élégant cerf d'origine asiatique",
      status: "Actif",
      age: "4 ans",
      location: "Domaine du Chevreuil Blanc",
    },
    {
      name: "Chevreuil Blanc",
      category: "Cervidés",
      image:
        "https://images.unsplash.com/photo-1600382803118-e42a0cec247a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2072",
      description: "Rare et magnifique cerf blanc",
      status: "Actif",
      age: "3 ans",
      location: "Domaine du Chevreuil Blanc",
    },
    {
      name: "Cerf Rouge",
      category: "Cervidés",
      image:
        "https://images.unsplash.com/photo-1570422593863-bd38ef7ce050?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
      description: "Majestueux cerf européen",
      status: "Actif",
      age: "5 ans",
      location: "Domaine du Chevreuil Blanc",
    },
    {
      name: "Moutons",
      category: "Ovins",
      image:
        "https://images.unsplash.com/photo-1554755209-85e44182e019?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1974",
      description: "Troupeau paisible des prairies",
      status: "Actif",
      age: "2-4 ans",
      location: "Domaine du Chevreuil Blanc",
    },
  ];

  return (
    <section
      id="gallery"
      className="py-14 bg-gradient-to-br from-emerald-50 via-stone-50 to-amber-50 relative overflow-hidden"
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
          className="text-center mb-10"
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
            Découvrez Nos Animaux
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            🐐 Ferme éducative • Chèvres, moutons, poneys pour randonnées •
            Lamas et alpagas • Cochons, poules, canards • Et d’autres surprises
            pour émerveiller les enfants et les familles.
          </motion.p>
        </motion.div>

        {/* Stats Bar */}
        {/* <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-stone-50/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-emerald-200/50 text-center">
            <div className="text-2xl font-bold text-primary-600 mb-2">6</div>
            <div className="text-sm text-gray-600">Espèces de Cervidés</div>
          </div>
          <div className="bg-stone-50/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-emerald-200/50 text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">50$</div>
            <div className="text-sm text-gray-600">Carte Adulte (6 mois)</div>
          </div>
          <div className="bg-stone-50/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-emerald-200/50 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">Gratuit</div>
            <div className="text-sm text-gray-600">Enfants 0-17 ans</div>
          </div>
          <div className="bg-stone-50/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-emerald-200/50 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">58</div>
            <div className="text-sm text-gray-600">Catégories d'âge</div>
          </div>
        </motion.div> */}

        {/* Animal Spotlight */}

        <motion.div
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
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
              whileHover={{ y: -12, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="bg-stone-50/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-emerald-200/50 hover:shadow-xl transition-all duration-500 group-hover:shadow-primary-500/10 relative">
                {/* Image Container with Enhanced Effects */}
                <div className="relative overflow-hidden">
                  <div className="w-full h-56 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <img
                      src={animal.image}
                      alt={animal.name}
                      className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-1000 ease-out"
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
                        <Image
                          src="https://res.cloudinary.com/dzjeufpgy/image/upload/v1760037125/logo_wnc6cr.jpg"
                          alt="Domaine du Chevreuil Blanc"
                          width={64}
                          height={64}
                          className="mx-auto mb-3 animate-pulse rounded-lg"
                        />
                        <p className="text-primary-700 font-bold text-lg">
                          {animal.name}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                  {/* Floating Badges with Enhanced Design */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-gray-800 shadow-md border border-white/50">
                      {animal.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 backdrop-blur-md px-2.5 py-1.5 rounded-full text-xs font-semibold text-white shadow-md">
                      {animal.status}
                    </div>
                  </div>

                  {/* Enhanced Camera Icon */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <div className="bg-white/95 backdrop-blur-md p-2 rounded-full shadow-md border border-white/50 hover:bg-white transition-colors duration-300">
                      <Camera className="h-4 w-4 text-gray-700" />
                    </div>
                  </div>

                  {/* New: Heart Icon for Favorites */}
                  <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <div className="bg-white/95 backdrop-blur-md p-2 rounded-full shadow-md border border-white/50 hover:bg-red-50 transition-colors duration-300">
                      <Heart className="h-4 w-4 text-gray-700 hover:text-red-500 transition-colors duration-300" />
                    </div>
                  </div>
                </div>

                {/* Enhanced Content Section */}
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                      {animal.name}
                    </h3>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-2 line-clamp-2">
                    {animal.description}
                  </p>

                  {/* Enhanced Status Indicator */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium text-green-600">
                        Actif & En Bonne Santé
                      </span>
                    </div>

                    <motion.button
                      onClick={() => {
                        router.push("/signup");
                      }}
                      className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      En Savoir Plus
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* <motion.div
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
              <span>Voir Plus d'Animaux</span>
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
        </motion.div> */}
      </div>
    </section>
  );
}
