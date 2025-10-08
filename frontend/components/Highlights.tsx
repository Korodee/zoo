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
            L'objectif du projet
          </h2>
          <p className="text-neutral-600 mt-3 max-w-3xl mx-auto">
            Créer un lieu unique au Québec où les visiteurs pourront vivre une expérience immersive, entourés d'animaux majestueux et d'une nature vivante, tout en bâtissant une communauté de membres qui participent activement à l'évolution du projet.
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
              <h3 className="font-semibold">Maison d'1 million $</h3>
            </div>
            <p className="text-sm text-neutral-600">
              Grand prix final + 58 prix de 75 000$ par catégorie d'âge + tirages hebdomadaires.
            </p>
          </motion.div>

          <motion.div variants={item} className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Leaf className="h-6 w-6 text-green-700" />
              <h3 className="font-semibold">Enfants gratuits</h3>
            </div>
            <p className="text-sm text-neutral-600">
              Tous les jeunes de 0-17 ans participent gratuitement partout au Québec avec 2M$ en prix.
            </p>
          </motion.div>

          <motion.div variants={item} className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="h-6 w-6 text-pink-700" />
              <h3 className="font-semibold">50$ pour 6 mois</h3>
            </div>
            <p className="text-sm text-neutral-600">
              Accès exclusif au site et aux suivis du projet. 58 catégories d'âge de 18-75 ans.
            </p>
          </motion.div>

          <motion.div variants={item} className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Camera className="h-6 w-6 text-blue-700" />
              <h3 className="font-semibold">Transparence totale</h3>
            </div>
            <p className="text-sm text-neutral-600">
              Chaque tirage vérifié par des témoins indépendants, filmé et diffusé.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


