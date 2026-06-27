"use client";

import { motion } from "framer-motion";
import { ScrollText } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const terms = [
  "Tous les gagnants seront contactés à l'aide des coordonnées fournies lors de leur inscription.",
  "Les gagnants disposent d'un délai de 90 jours (3 mois) suivant l'annonce officielle pour réclamer leur récompense.",
  "Si une récompense n'est pas réclamée dans ce délai, elle pourra être attribuée à un autre membre admissible selon les modalités prévues par le Domaine.",
  "Les membres doivent s'assurer que leurs coordonnées sont exactes et à jour afin de pouvoir être contactés en cas de sélection.",
  "Le Domaine du Chevreuil Blanc pourra demander une preuve d'identité avant la remise d'une récompense.",
  "Les dates, modalités et lieux de remise des récompenses seront annoncés sur les plateformes officielles du Domaine.",
  "Certaines activités, remises de récompenses ou chasses au trésor pourront être filmées ou photographiées afin de permettre aux membres de suivre l'évolution du projet.",
  "Les règlements complets et les modalités officielles seront publiés avant le lancement officiel des activités et des remises de récompenses.",
];

export default function RewardTerms() {
  return (
    <section className="pt-24 pb-14 bg-gradient-to-br from-amber-50/50 via-white to-stone-50 relative overflow-hidden min-h-[calc(100vh-12rem)]">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <ScrollText className="h-8 w-8 text-white" />
          </motion.div>
          <motion.h1
            className="text-3xl md:w-[600px] mx-auto text-center md:text-4xl font-bold text-gray-900 mb-4"
            variants={itemVariants}
          >
            CONDITIONS GÉNÉRALES DES RÉCOMPENSES
          </motion.h1>
          <motion.p
            className="text-lg text-gray-600 leading-relaxed"
            variants={itemVariants}
          >
            🌲 Le Domaine du Chevreuil Blanc souhaite offrir une expérience
            transparente, simple et agréable à tous ses membres.
          </motion.p>
        </motion.div>

        <motion.div
          className="bg-stone-50/80 backdrop-blur-sm rounded-2xl border border-amber-200/50 shadow-sm p-6 md:p-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <ul className="space-y-4">
            {terms.map((term, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                className="flex items-start gap-3 text-gray-700 leading-relaxed"
              >
                <span className="flex-shrink-0 mt-0.5" aria-hidden="true">
                  🦌
                </span>
                <span>{term}</span>
              </motion.li>
            ))}
          </ul>

          <motion.div
            className="mt-8 pt-6 border-t border-amber-200/50 space-y-4 text-center"
            variants={itemVariants}
          >
            <p className="text-lg text-gray-700 font-medium">
              🌲 Merci de faire partie de cette belle aventure.
            </p>
            <p className="text-gray-600 italic leading-relaxed">
              🦌 Homme des bois depuis toujours, passionné de cervidés.
              Aujourd&apos;hui, je bâtis ça avec vous.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
