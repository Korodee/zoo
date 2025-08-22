"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, Pause, Volume2, VolumeX, PawPrint, X } from "lucide-react";
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
  const [isMuted, setIsMuted] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const openVideoModal = async () => {
    setShowVideoModal(true);
    setIsPlaying(true);
    setIsMuted(false);
    
    // Start soundtrack
    try {
      if (audioRef.current) {
        audioRef.current.volume = 0.5;
        await audioRef.current.play();
        setIsAudioPlaying(true);
        console.log('Soundtrack started successfully');
      }
    } catch (error) {
      console.error('Failed to play soundtrack:', error);
      setIsAudioPlaying(false);
    }
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
    setIsPlaying(false);
    setIsAudioPlaying(false);
    
    // Stop video
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    
    // Stop audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
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

  const toggleMute = async () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
    // Also toggle ambient audio
    if (audioRef.current) {
      try {
        if (isMuted) {
          audioRef.current.volume = 0.3;
          await audioRef.current.play();
          setIsAudioPlaying(true);
        } else {
          audioRef.current.pause();
          setIsAudioPlaying(false);
        }
      } catch (error) {
        console.error('Failed to toggle audio:', error);
        setIsAudioPlaying(false);
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
          Découvrez le
          <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent">
            Monde Sauvage
          </span>
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-gray-200 leading-relaxed"
          variants={itemVariants}
        >
          Vivez la magie de la faune sauvage de près. Des lions majestueux aux
          pingouins joueurs, embarquez pour un voyage inoubliable à travers les
          créatures les plus incroyables de la nature.
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

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="hidden md:flex justify-center items-center space-x-8 text-white/70"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">500+</div>
            <div className="text-xs">Photos Faune</div>
          </div>
          <div className="w-px h-6 bg-white/30" />
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">50+</div>
            <div className="text-xs">Espèces Couvertes</div>
          </div>
          <div className="w-px h-6 bg-white/30" />
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">10K+</div>
            <div className="text-xs">Membres Satisfaits</div>
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

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        className="hidden"
        onError={(e) => console.error('Soundtrack error:', e)}
        onLoadStart={() => console.log('Soundtrack loading started')}
        onCanPlay={() => console.log('Soundtrack can play')}
        onLoadedData={() => console.log('Soundtrack data loaded')}
      >
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" type="audio/mpeg" />
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" type="audio/mpeg" />
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" type="audio/mpeg" />
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" type="audio/mpeg" />
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" type="audio/mpeg" />
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" type="audio/mpeg" />
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" type="audio/mpeg" />
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" type="audio/mpeg" />
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" type="audio/mpeg" />
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3" type="audio/mpeg" />
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3" type="audio/mpeg" />
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3" type="audio/mpeg" />
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3" type="audio/mpeg" />
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3" type="audio/mpeg" />
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3" type="audio/mpeg" />
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3" type="audio/mpeg" />
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-18.mp3" type="audio/mpeg" />
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-19.mp3" type="audio/mpeg" />
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-20.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

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
                  muted={isMuted}
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="https://cdn-cf-east.streamable.com/video/mp4/pa0ot6.mp4?Expires=1756074294640&Key-Pair-Id=APKAIEYUVEN4EVB2OKEQ&Signature=H2~COOI3e8oL-lKqUn8Niqh6sYZ4H8YuP722cyym6ce0N9Zq91DmeZDHBq6J8-8GXw-D2jd-E4wNLILE4FKnLW8031trJydRaM-eP8OU0Srx-uabkhQndrbxtuMHhRmVNtzayjWHtFS-jqWYzUtV46Blze2sseyaNiu~zS6IS~BTaEJEir7~6zOzQNXEJng8CQVUC-TCXIbY8UpZe8c9tFli1kgEUiRfNtq4XsrUEYQysNueoschPoEcVo3zNIywBYKPngdKQ178EpxDzdfZWmOYQilSpwiRaOTP~7EpWsfgAqJC3ajRGSqKVwufYEfhBMWH7PJqgHxCQdwScu63Lg__" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Video Controls Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={toggleVideo}
                      className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors duration-200"
                    >
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </button>
                    <button
                      onClick={toggleMute}
                      className={`p-2 rounded-full text-white transition-colors duration-200 ${
                        isMuted ? 'bg-red-500/70 hover:bg-red-500/90' : 'bg-green-500/70 hover:bg-green-500/90'
                      }`}
                      title={isMuted ? "Activer l'ambiance sonore" : "Couper l'ambiance sonore"}
                    >
                      {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </button>
                  </div>
                  <div className="text-white text-sm bg-black/50 px-3 py-1 rounded-full">
                    {isAudioPlaying && !isMuted ? "🦌 Ambiance Faunique" : "Domaine du Chevreuil Blanc"}
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
