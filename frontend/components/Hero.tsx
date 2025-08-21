"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, PawPrint } from "lucide-react";
import Link from "next/link";
import Image from "next/image";


const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const heroVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function Hero() {
  return (
    <section className="relative h-[100svh] md:h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video with Enhanced Effects */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="object-cover w-full h-full"
        >
          <source src="https://cdn-cf-east.streamable.com/video/mp4/pa0ot6.mp4?Expires=1756074294640&Key-Pair-Id=APKAIEYUVEN4EVB2OKEQ&Signature=H2~COOI3e8oL-lKqUn8Niqh6sYZ4H8YuP722cyym6ce0N9Zq91DmeZDHBq6J8-8GXw-D2jd-E4wNLILE4FKnLW8031trJydRaM-eP8OU0Srx-uabkhQndrbxtuMHhRmVNtzayjWHtFS-jqWYzUtV46Blze2sseyaNiu~zS6IS~BTaEJEir7~6zOzQNXEJng8CQVUC-TCXIbY8UpZe8c9tFli1kgEUiRfNtq4XsrUEYQysNueoschPoEcVo3zNIywBYKPngdKQ178EpxDzdfZWmOYQilSpwiRaOTP~7EpWsfgAqJC3ajRGSqKVwufYEfhBMWH7PJqgHxCQdwScu63Lg__" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black/40" />

      {/* Floating Elements */}
      <div className="absolute inset-0 z-5">
        <motion.div
          animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full"
        />
        <motion.div
          animate={{ y: [0, 40, 0], rotate: [0, -10, 0] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-20 right-10 w-20 h-20 bg-yellow-400/20 backdrop-blur-sm rounded-full"
        />
      </div>

      <motion.div
        className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6">
            <PawPrint className="h-10 w-10 text-yellow-400" />
          </div>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          variants={itemVariants}
        >
          Bienvenue au
          <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent">
            Domaine du Chevreuil Blanc
          </span>
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-gray-200 leading-relaxed"
          variants={itemVariants}
        >
          Découvrez notre parc animalier diversifié dans un environnement naturel et sécuritaire. 
          Des chevreuils blancs majestueux aux bisons imposants, en passant par nos amis les lamas 
          et alpagas, vivez une expérience unique au cœur de la nature.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          variants={itemVariants}
        >
          <Link href="/signup">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full font-semibold text-base shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 flex items-center space-x-2"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Obtenir ma Carte</span>
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </Link>
          <motion.button
            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold text-base border border-white/30 hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="h-5 w-5" />
            <span>Découvrir nos Animaux</span>
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="hidden md:flex justify-center items-center space-x-8 text-white/70"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">500K</div>
            <div className="text-xs">Cartes Adultes</div>
          </div>
          <div className="w-px h-6 bg-white/30" />
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">300K</div>
            <div className="text-xs">Cartes Enfants</div>
          </div>
          <div className="w-px h-6 bg-white/30" />
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">6</div>
            <div className="text-xs">Mois Gratuits</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
}
