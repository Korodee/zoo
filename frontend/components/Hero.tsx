"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, Pause, X } from "lucide-react";
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
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const openVideoModal = async () => {
    setShowVideoModal(true);
    setIsPlaying(true);
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
    setIsPlaying(false);

    // Stop video
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <section className="relative h-[100svh] md:h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="object-cover w-full h-full"
        >
          <source
            src="https://res.cloudinary.com/dzjeufpgy/video/upload/v1759960825/hero-vid2_txguhw.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black/40" />

      {/* Floating Elements */}
      <div className="absolute inset-0 z-5">
        <motion.div
          animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="hidden md:block absolute top-20 left-10 w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full"
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
          className="mb-4"
        >
          <div className="inline-flex items-center justify-center mb-6">
            <Image
              src="/logo.jpg"
              alt="Domaine du Chevreuil Blanc"
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>
        </motion.div>
        {/* Badges: 1 an gratuit + date d'ouverture */}
        <div className="mb-4 flex flex-col sm:flex-row items-center justify-center gap-2">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-200 border border-green-400/40 text-xs sm:text-sm">
            🎉 6 mois d'accès exclusif à 50$ seulement
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white border border-white/30 text-xs sm:text-sm">
            👶 Enfants de 0-17 ans gratuits partout au Québec
          </span>
        </div>
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          variants={itemVariants}
        >
          Le Domaine du Chevreuil Blanc
          <span className="block bg-gradient-to-r text-2xl md:text-4xl from-yellow-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent">
            Un projet unique, humain et rassembleur pour tout le Québec
          </span>
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl mb-10 max-w-3xl mx-auto text-gray-200 leading-relaxed"
          variants={itemVariants}
        >
          Un projet né du cœur, imaginé et fondé par Denis Desjardins, avec un
          objectif simple mais profondément humain : rassembler les Québécois
          autour de la nature, des animaux, et du rêve commun d'un avenir
          meilleur.
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
              <span>Commencer l'Aventure</span>
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </Link>
          <motion.button
            onClick={openVideoModal}
            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold text-base border border-white/30 hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="h-5 w-5" />
            <span>Voir la Bande Annonce</span>
          </motion.button>
        </motion.div>

        {/* Subtle stats row for credibility */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="hidden md:flex justify-center items-center gap-8 text-white/70"
        >
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-yellow-400">500+</span>
            <span className="text-xs">photos fauniques</span>
          </div>
          <div className="w-px h-4 bg-white/30" />
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-yellow-400">50+</span>
            <span className="text-xs">espèces</span>
          </div>
          <div className="w-px h-4 bg-white/30" />
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-yellow-400">10K+</span>
            <span className="text-xs">membres</span>
          </div>
        </motion.div> */}
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

      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={closeVideoModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl mx-4 bg-black rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeVideoModal}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors duration-200"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Video Player */}
              <div className="relative aspect-video">
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source
                    src="https://res.cloudinary.com/dzjeufpgy/video/upload/v1759960825/hero-vid2_txguhw.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>

                {/* Video Controls Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={toggleVideo}
                      className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors duration-200"
                    >
                      {isPlaying ? (
                        <Pause className="h-5 w-5" />
                      ) : (
                        <Play className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <div className="text-white text-sm bg-black/50 px-3 py-1 rounded-full">
                    Domaine du Chevreuil Blanc
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
