"use client";

import { motion } from "framer-motion";
import { PawPrint, Heart, Globe, Camera } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function About() {
  return (
    <section
      id="about"
      className="pt-24 pb-5 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden"
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
            <PawPrint className="h-8 w-8 text-white" />
          </motion.div>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            variants={itemVariants}
          >
            À propos du Domaine du Chevreuil Blanc
          </motion.h2>
          <motion.h2
            className="text-xl md:text-xl font-bold text-gray-600 mb-2 text-center"
            variants={itemVariants}
          >
          Le Domaine – Un lieu magique.
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            110 acres de nature sécurisée, un enclos majestueux avec déjà des
            cerfs de Virginie, y compris des albinos. Seuls les cerfs de
            Virginie sont présents pour le moment, mais d’autres cervidés
            arriveront bientôt : chevreuils blancs, wapitis, cerfs rouges, cerfs
            Sika, daims.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            {
              icon: Globe,
              title: "Ferme éducative",
              description:
                "Plusieurs espèces de chèvres, moutons, poneys pour randonnées, lamas et alpagas, cochons, poules, canards – des rencontres conçues pour émerveiller enfants et familles.",
              color: "from-green-500 to-blue-500",
              bgColor: "from-green-50 to-blue-50",
              borderColor: "border-green-200",
            },
            {
              icon: Heart,
              title: "Chalets rustiques",
              description:
                "Séjour immersif au cœur de l’enclos, contact direct avec les cervidés (clôture sécurisée), cuisine équipée avec fumoir, électricité et nuits entouré de nature.",
              color: "from-red-500 to-pink-500",
              bgColor: "from-red-50 to-pink-50",
              borderColor: "border-red-200",
            },
            {
              icon: Camera,
              title: "Casse-croûte du Domaine",
              description:
                "Poutines, pizzas, queues de castor et plus, ambiance conviviale en pleine nature, possibilité de déguster près des animaux pour un moment unique.",
              color: "from-purple-500 to-indigo-500",
              bgColor: "from-purple-50 to-indigo-50",
              borderColor: "border-purple-200",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              {/* Animated gradient border */}
              <div className="absolute -inset-0.5 rounded-3xl bg-[conic-gradient(var(--tw-gradient-stops))] from-yellow-300 via-orange-400 to-amber-500 opacity-0 group-hover:opacity-60 blur group-hover:blur-md transition duration-500" />
              <div
                className={`relative bg-gradient-to-br ${feature.bgColor} rounded-2xl p-6 h-full border ${feature.borderColor} shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-105 overflow-hidden`}
              >
                <div className="absolute inset-0 opacity-5">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  />
                </div>
                <div className="relative z-10">
                  <motion.div
                    className={`bg-gradient-to-r ${feature.color} rounded-xl p-3 w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-center text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h3
            className="text-2xl md:text-3xl font-bold text-gray-900 mb-7 text-center"
            variants={itemVariants}
          >
            Expériences exclusives
          </motion.h3>
          <motion.div
            className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6"
            variants={itemVariants}
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                L’Aventure de l’Ange Gardien
              </h4>
              <ul className="space-y-2.5 text-gray-700 text-sm leading-relaxed">
                <li className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-emerald-500/70" /><span>Nom inspiré de la municipalité de l’Ange-Gardien (Outaouais)</span></li>
                <li className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-emerald-500/70" /><span>Prix de 200 000 $ pour le gagnant</span></li>
                <li className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-emerald-500/70" /><span>Hébergement dans les chalets rustiques</span></li>
                <li className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-emerald-500/70" /><span>Épreuves de survie, stratégie et aventure en pleine nature</span></li>
                <li className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-emerald-500/70" /><span>Filmée et diffusée sur les réseaux sociaux</span></li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                La Chasse aux Trésors Sauvages
              </h4>
              <ul className="space-y-2.5 text-gray-700 text-sm leading-relaxed">
                <li className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-indigo-500/70" /><span>Un participant par semaine pour le premier mois</span></li>
                <li className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-indigo-500/70" /><span>Achetez tôt votre carte pour augmenter vos chances</span></li>
                <li className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-indigo-500/70" /><span>Trésors cachés: argent, clés pour véhicules, 4 roues, bateaux, voitures</span></li>
                <li className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-indigo-500/70" /><span>Montant initial (exemple): 2 000 $; augmente chaque jour si non trouvé</span></li>
                <li className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-indigo-500/70" /><span>Chaque participation filmée et partagée sur les réseaux sociaux</span></li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
