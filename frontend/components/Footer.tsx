"use client";

import { motion } from "framer-motion";
import { PawPrint } from "lucide-react";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 md:pb-12">
        <motion.div
          className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 md:gap-12 mb-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-3 rounded-xl">
                <PawPrint className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Domaine du Chevreuil Blanc
              </h3>
            </div>
            <p className="text-gray-300 leading-relaxed md:mb-6 max-w-md">
              🌍 Vision: premier d’une série de domaines familiaux à travers la
              province. Chaque carte achetée contribue directement au projet.
              Expérience unique avec animaux, nature et aventure – suivez le
              progrès au quotidien.
            </p>
            <div className="hidden md:flex pt-2 flex-col md:flex-row items-start">
              <div className="flex flex-col items-start">
                <p className="text-gray-400 text-sm">
                  © 2025 Domaine du Chevreuil Blanc. All rights reserved.
                </p>
              </div>
            </div>
            {/* <div className="flex space-x-4">
              {["f", "in", "t", "yt"].map((label) => (
                <motion.a
                  key={label}
                  href="#"
                  className="bg-white/10 backdrop-blur-sm p-3 rounded-xl hover:bg-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold bg-gradient-to-r from-primary-500 to-primary-600">
                    {label}
                  </div>
                </motion.a>
              ))}
            </div> */}
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-xl font-bold mb-6 text-white">Liens Rapides</h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300" />
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300" />
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/#gallery"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300" />
                  Galerie
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300" />
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300" />
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-xl font-bold mb-6 text-white">Nos Animaux</h4>
            <ul className="space-y-4">
              {[
                "Chevreuils Blancs",
                "Cerfs de Virginie",
                "Bisons",
                "Lamas & Alpagas",
                "Animaux de Ferme",
              ].map((s) => (
                <li
                  key={s}
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300" />
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* <motion.div
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-white/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center">
            <h4 className="text-2xl font-bold text-white mb-4">Restez Informé</h4>
            <p className="text-gray-300 mb-6 max-w-md mx-auto">
              Abonnez-vous à notre newsletter pour les dernières nouvelles sur la faune sauvage,
              du contenu exclusif, et des offres spéciales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Entrez votre email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                S'abonner
              </motion.button>
            </div>
          </div>
        </motion.div> */}

        <motion.div
          className="md:hidden border-t border-white/10 py- flex flex-col md:flex-row justify-center items-center"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-gray-400 py-12 text-sm">
            © 2025 Domaine du Chevreuil Blanc. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
