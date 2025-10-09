"use client";

import { motion } from "framer-motion";
import { Heart, Globe, Camera } from "lucide-react";
import Image from "next/image";

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
            <Image
              src="/logo.jpg"
              alt="Domaine du Chevreuil Blanc"
              width={32}
              height={32}
              className="rounded-full"
            />
          </motion.div>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            variants={itemVariants}
          >
            La Vision
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8"
            variants={itemVariants}
          >
            Le Domaine du Chevreuil Blanc est un projet né du cœur, imaginé et fondé par Denis Desjardins, avec un objectif simple mais profondément humain : rassembler les Québécois autour de la nature, des animaux, et du rêve commun d'un avenir meilleur.
          </motion.p>
          <motion.p
            className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            C'est un projet qui vise à redonner au monde, à faire rêver les familles, et à offrir aux enfants du Québec une expérience accessible, éducative et inspirante. Le Domaine ne cherche pas seulement à divertir : il veut reconnecter les gens à la nature, aux animaux et aux valeurs d'entraide et de partage.
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
              title: "Le Domaine et ses attraits",
              description:
                "110 acres de nature sécurisée avec un enclos majestueux abritant des cerfs de Virginie, y compris des albinos. Le site accueillera bientôt chevreuils blancs, wapitis, cerfs rouges, daims, sika, lamas, alpagas, sangliers et canards. Des lacs artificiels permettront la pêche à la truite.",
              color: "from-green-500 to-blue-500",
              bgColor: "from-green-50 to-blue-50",
              borderColor: "border-green-200",
            },
            {
              icon: Heart,
              title: "Les enfants au centre du projet",
              description:
                "Tous les jeunes de 0 à 17 ans participent gratuitement partout au Québec. Avec une carte parent de 50$, les enfants ont accès à des tirages de 2 millions de dollars en prix de plein air (équipements de pêche, camping, aventure) adaptés à leur âge.",
              color: "from-red-500 to-pink-500",
              bgColor: "from-red-50 to-pink-50",
              borderColor: "border-red-200",
            },
            {
              icon: Camera,
              title: "Le principe des catégories d'âge",
              description:
                "58 catégories d'âge de 18 à 75 ans, maximum 6 000 membres par catégorie à 50$ chacun. Chaque carte donne 6 mois d'accès exclusif. Dès qu'une catégorie atteint 6 000 membres, un prix de 75 000$ (souvent un camion neuf) est tiré immédiatement.",
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
            Tirages et récompenses
          </motion.h3>
          <motion.div
            className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6"
            variants={itemVariants}
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Le grand prix – Une maison d'un million de dollars
              </h4>
              <ul className="space-y-2.5 text-gray-700 text-sm leading-relaxed">
                <li className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-emerald-500/70" /><span>Tirage parmi tous les membres participants</span></li>
                <li className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-emerald-500/70" /><span>Le gagnant choisit son terrain et dessine sa maison</span></li>
                <li className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-emerald-500/70" /><span>Construction prise en charge jusqu'à 1 million $</span></li>
                <li className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-emerald-500/70" /><span>Processus entièrement filmé et partagé</span></li>
                <li className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-emerald-500/70" /><span>Si objectif atteint 2 fois en 6 mois : 2 autres maisons</span></li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Tirages hebdomadaires
              </h4>
              <ul className="space-y-2.5 text-gray-700 text-sm leading-relaxed">
                <li className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-indigo-500/70" /><span>Tirage à toutes les semaines</span></li>
                <li className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-indigo-500/70" /><span>Plus vite tu participes, plus vite tu gagnes</span></li>
                <li className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-indigo-500/70" /><span>Prix parmi les membres inscrits</span></li>
                <li className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-indigo-500/70" /><span>Annoncés sur les réseaux sociaux</span></li>
                <li className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-indigo-500/70" /><span>5 lots de 100 000$ si objectif complet atteint</span></li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
