"use client";

import { motion } from "framer-motion";
import { Gift, Leaf, Heart, Camera } from "lucide-react";

const container = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Highlights() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-neutral-100 text-neutral-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Ce qui vous attend
          </h2>
          <p className="text-neutral-600 mt-3 max-w-3xl mx-auto">
            Les points clés du projet, présentés simplement. Les détails
            complets se trouvent plus bas.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <motion.div variants={item} className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Gift className="h-6 w-6 text-yellow-600" />
              <h3 className="font-semibold">≈ 10 M$ en prix</h3>
            </div>
            <p className="text-sm text-neutral-600">
              Maisons, argent, véhicules, bateaux, voyages et prix enfants.
            </p>
          </motion.div>

          <motion.div variants={item} className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Leaf className="h-6 w-6 text-green-700" />
              <h3 className="font-semibold">110 acres de nature</h3>
            </div>
            <p className="text-sm text-neutral-600">
              Aventures au cœur d’un territoire riche en faune et en sentiers.
            </p>
          </motion.div>

          <motion.div variants={item} className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="h-6 w-6 text-pink-700" />
              <h3 className="font-semibold">Projet collectif</h3>
            </div>
            <p className="text-sm text-neutral-600">
              Chaque carte achetée fait avancer votre rêve et le projet commun.
            </p>
          </motion.div>

          <motion.div variants={item} className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Camera className="h-6 w-6 text-blue-700" />
              <h3 className="font-semibold">Tout est filmé</h3>
            </div>
            <p className="text-sm text-neutral-600">
              Progrès partagé au jour le jour avec une approche cinéma.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


