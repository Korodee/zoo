"use client";

import { motion } from "framer-motion";
import { Award, Camera, Trophy, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1503919005314-30d93d07d823?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Zoo animals background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black/50" />
      </div>
      <div className="absolute inset-0 opacity-10 z-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-8"
          >
            <Award className="h-10 w-10 text-white" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Débloquez du Contenu Exclusif sur la Faune
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-white/90 mb-8 max-w-3xl mx-auto"
          >
            Rejoignez notre adhésion VIP et obtenez l'accès à la photographie exclusive de la faune sauvage,
            du contenu en coulisses, et participez à nos
            concours de photographie mensuels avec des prix incroyables.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
              <Camera className="h-8 w-8 text-yellow-300 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Photographie Exclusive
              </h3>
              <p className="text-white/80">
                Accès aux clichés premium de faune sauvage et au contenu en coulisses
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
              <Trophy className="h-8 w-8 text-yellow-300 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Concours Mensuels
              </h3>
              <p className="text-white/80">
                Participez aux concours de photographie avec des prix incroyables
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
              <Users className="h-8 w-8 text-yellow-300 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Accès Communautaire
              </h3>
              <p className="text-white/80">
                Connectez-vous avec d'autres passionnés de faune sauvage et photographes
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/signup">
              <motion.button
                className="px-8 py-4 bg-white text-primary-700 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Rejoindre l'Adhésion VIP</span>
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </Link>
            <Link href="/login">
              <motion.button
                className="px-8 py-4 bg-transparent text-white font-bold rounded-lg border-2 border-white/30 hover:bg-white/10 transition-all duration-300 flex items-center space-x-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Déjà Membre ?</span>
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 text-white/70 text-sm"
          >
            <p>
              À partir de 9,99€/mois • Annulez à tout moment • Garantie de remboursement de 30 jours
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
