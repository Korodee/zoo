"use client";

import { motion } from "framer-motion";

export default function Intro() {
  return (
    <section className="relative py-14 sm:py-16 bg-gradient-to-b from-white to-neutral-50">
      <div className="absolute inset-0 pointer-events-none">
        <div className="hidden md:block absolute -top-16 left-1/2 -translate-x-1/2 h-72 w-[48rem] rounded-full bg-amber-200/20 blur-3xl" />
      </div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-5 gap-6 items-stretch">
          {/* Left: founder card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 flex flex-col justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-amber-300 to-yellow-500 ring-4 ring-amber-100 shadow-inner" />
              <div>
                <p className="text-sm text-neutral-500">Fondateur</p>
                <h3 className="text-lg font-semibold text-neutral-900">
                  Denis Desjardins
                </h3>
              </div>
            </div>
            <div className="mt-3 text-sm text-neutral-600 leading-relaxed">
              « La nature, le partage et la transparence sont au cœur de tout ce
              que nous faisons. Chaque décision, chaque dépense et chaque étape
              du projet est expliquée et ouverte au public. »
            </div>
            <div className="mt-3 flex items-center gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                Projet transparent
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                Communautaire
              </span>
            </div>
          </motion.div>

          {/* Right: story panel */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-3 relative"
          >
            <div className="absolute -inset-0.5 rounded-3xl bg-[conic-gradient(var(--tw-gradient-stops))] from-amber-200 via-yellow-300 to-orange-300 opacity-40 blur-md" />
            <div className="relative rounded-2xl bg-white p-6 sm:p-8 border border-neutral-200 shadow-sm">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mb-3">
                Pourquoi je fais ça
              </h2>
              <p className="leading-relaxed text-sm  text-neutral-700">
                Ce projet, je le fais d’abord pour mes enfants, pour leur offrir
                un lieu où la nature n’est pas un souvenir, mais une expérience
                vivante. Je le fais aussi pour les familles du Québec, pour
                qu’elles puissent vivre, rêver et s’émerveiller ensemble. Depuis
                toujours, ma passion pour les cervidés, la nature et les projets
                communautaires me pousse à aller plus loin. Le Domaine du
                Chevreuil Blanc, c’est mon rêve d’enfant devenu ma mission
                d’adulte. Je veux que ce lieu serve d’exemple : qu’avec de la
                transparence, du travail et de la solidarité, on peut bâtir un
                projet québécois qui appartient au peuple. Ici, chaque carte
                achetée est un geste d’espoir. Un pas vers quelque chose de
                vrai, de durable, et de beau. Un projet qui redonne à ceux qui y
                participent, et qui laissera une trace positive pour les
                générations à venir.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
