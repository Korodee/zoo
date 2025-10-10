"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Testimonials() {
  const items = [
    {
      title: "Transparence et communication",
      list: [
        "Filmée et partagée quotidiennement sur les réseaux sociaux",
        "Suivi des travaux, des animaux, du montage des chalets",
        "Annonces des tirages en direct",
        "Engagement fort de transparence et de confiance",
        "Explication détaillée de chaque prix et de chaque tirage",
      ],
    },
    {
      title: "Vision et pourquoi participer",
      text:
        "Le Domaine du Chevreuil Blanc est le premier d’une série de domaines familiaux à travers la province. Chaque carte achetée contribue directement au projet. Expérience unique avec animaux, nature et aventure. Chance de gagner des prix incroyables. Participation à un projet collectif ambitieux et transparent. Tous les participants peuvent suivre le progrès jour après jour sur les réseaux sociaux. En devenant membre, vous soutenez la faune locale et l’aménagement durable du Domaine.",
    },
    {
      title: "Pourquoi acheter votre carte",
      list: [
        "Pour vivre une expérience immersive avec la nature et les animaux",
        "Pour gagner maisons, argent, véhicules, voyages et prix enfants",
        "Pour participer à un projet québécois ambitieux, transparent et collectif",
        "Pour faire partie de l’histoire du Domaine et aider à créer un projet durable pour toutes les familles",
      ],
    },
  ];

  return (
    <section className="pb-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
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
          className="text-center pt-14 mb-10"
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
            <Star className="h-8 w-8 text-white" />
          </motion.div>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            variants={itemVariants}
          >
            Transparence, Vision et Participation
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Suivez le progrès jour après jour. Participez à un projet collectif
            ambitieux et transparent.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {items.map((t, index) => (
            <motion.div
              key={index}
              className="relative bg-stone-50/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-amber-200/50 group overflow-hidden"
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              {/* animated border glow */}
              <div className="pointer-events-none absolute -inset-0.5 rounded-3xl bg-[conic-gradient(var(--tw-gradient-stops))] from-sky-300 via-indigo-400 to-violet-500 opacity-0 group-hover:opacity-60 blur group-hover:blur-md transition duration-500" />
              <div className="relative">
              <h3 className="font-semibold text-gray-900 mb-3">{t.title}</h3>
              {t.list ? (
                <ul className="space-y-4 text-gray-700 text-sm">
                  {t.list.map((li, i) => (
                    <li key={i} className="relative pl-6">
                      <span className="absolute left-0 top-2 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 shadow-[0_0_0_3px_rgba(15,23,42,0.05)]" />
                      {i < (t.list?.length || 0) - 1 && (
                        <span className="absolute left-[5px] top-5 w-px h-6 bg-gradient-to-b from-indigo-300/60 to-transparent" />
                      )}
                      <span className="block leading-relaxed">{li}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700 leading-relaxed text-sm">{t.text}</p>
              )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
