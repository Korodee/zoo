"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function PrizeStructure() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
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
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            variants={itemVariants}
          >
            Système de paliers de prix
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Découvrez notre système de récompenses progressif qui grandit avec
            la participation de la communauté. Plus l'objectif de participation
            est élevé, plus les prix sont importants !
          </motion.p>
        </motion.div>

        {/* Vehicle/Boat Prize Tiers */}
        <motion.div
          className="max-w-6xl mx-auto mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="bg-stone-50/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-200/50 mb-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-2 text-center">
              Pyramide des prix — Adultes (18 ans et plus)
            </h4>
            <p className="text-xs text-gray-500 text-center mb-4 md:hidden">
              ← Faites défiler horizontalement pour voir toutes les colonnes →
            </p>
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 shadow-inner">
              <table className="min-w-full border-collapse bg-white rounded-lg shadow-sm border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-700 border-b min-w-[60px]">
                      Palier
                    </th>
                    <th className="px-3 py-2 text-center text-xs font-bold text-gray-700 border-b min-w-[110px] whitespace-nowrap">
                      % de l'objectif
                    </th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-700 border-b min-w-[120px]">
                      Montant (exact)
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 border-b min-w-[200px]">
                      Description du prix
                    </th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2 text-center font-semibold text-emerald-600">
                      1
                    </td>
                    <td className="px-3 py-2 text-center">100 %</td>
                    <td className="px-3 py-2 text-center font-semibold">75 000,00 $</td>
                    <td className="px-3 py-2 text-left">Choix : Dodge Ram 2026 ou Crossline PROX (bateau)</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2 text-center font-semibold text-emerald-600">
                      2
                    </td>
                    <td className="px-3 py-2 text-center">75 %</td>
                    <td className="px-3 py-2 text-center font-semibold">56 250,00 $</td>
                    <td className="px-3 py-2 text-left">Choix : GMC Terrain (SUV) ou 1850 FIS (bateau)</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2 text-center font-semibold text-emerald-600">
                      3
                    </td>
                    <td className="px-3 py-2 text-center">50 %</td>
                    <td className="px-3 py-2 text-center font-semibold">37 500,00 $</td>
                    <td className="px-3 py-2 text-left">Choix : Mitsubishi 2026 ou Lund 160 (moteur 40 HP + r)</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2 text-center">4</td>
                    <td className="px-3 py-2 text-center">25 %</td>
                    <td className="px-3 py-2 text-center">18 750,00 $</td>
                    <td className="px-3 py-2 text-left">CFMOTO U-Force équivalent</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2 text-center">5</td>
                    <td className="px-3 py-2 text-center">12,5 %</td>
                    <td className="px-3 py-2 text-center">9 375,00 $</td>
                    <td className="px-3 py-2 text-left">Sportsman Polaris</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2 text-center">6</td>
                    <td className="px-3 py-2 text-center">6,25 %</td>
                    <td className="px-3 py-2 text-center">4 687,50 $</td>
                    <td className="px-3 py-2 text-left">Vélo électrique — Mountain Blizzard A30</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2 text-center">7</td>
                    <td className="px-3 py-2 text-center">3,125 %</td>
                    <td className="px-3 py-2 text-center">2 343,75 $</td>
                    <td className="px-3 py-2 text-left">Lot plein air</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2 text-center">8</td>
                    <td className="px-3 py-2 text-center">1,5625 %</td>
                    <td className="px-3 py-2 text-center">1 171,88 $</td>
                    <td className="px-3 py-2 text-left">Lot plein air</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 py-2 text-center">9</td>
                    <td className="px-3 py-2 text-center">0,78125 %</td>
                    <td className="px-3 py-2 text-center">585,94 $</td>
                    <td className="px-3 py-2 text-left">Lot plein air</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>


        {/* Grand Prize and Children's Prizes */}
        <motion.div
          className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <article className="border border-stone-300 bg-white p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-800 mb-2">
              Grand prix
            </p>
            <h4 className="text-xl md:text-2xl font-bold text-stone-900 mb-5 leading-snug">
              Une maison d&apos;un million de dollars
            </h4>
            <ul className="space-y-3 text-stone-700 text-sm leading-relaxed list-none">
              <li className="border-l-2 border-amber-700/40 pl-4">
                Tirage parmi tous les membres participants
              </li>
              <li className="border-l-2 border-amber-700/40 pl-4">
                Le gagnant choisit son terrain et dessine sa maison
              </li>
              <li className="border-l-2 border-amber-700/40 pl-4">
                Construction entièrement prise en charge jusqu&apos;à 1&nbsp;000&nbsp;000&nbsp;$
              </li>
              <li className="border-l-2 border-amber-700/40 pl-4">
                Processus entièrement filmé et partagé
              </li>
            </ul>
            <div className="mt-6 pt-5 border-t border-stone-200">
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-2">
                Bonus spécial
              </p>
              <p className="text-sm text-stone-700 leading-relaxed">
                Si l&apos;objectif de participation est atteint deux fois en six mois,
                le Domaine offrira deux autres maisons d&apos;un million de dollars
                à tirer pour les membres.
              </p>
            </div>
          </article>

          <article className="border border-stone-300 bg-white p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-800 mb-2">
              Jeunes · 0 à 17 ans
            </p>
            <h4 className="text-xl md:text-2xl font-bold text-stone-900 mb-2 leading-snug">
              Pyramide des prix — lots plein air
            </h4>
            <p className="text-sm text-stone-600 mb-5">
              2&nbsp;000&nbsp;000&nbsp;$ en lots si l&apos;objectif est atteint à 100&nbsp;%
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-stone-300 text-left text-xs uppercase tracking-wide text-stone-500">
                    <th className="py-2 pr-3 font-semibold">Palier</th>
                    <th className="py-2 font-semibold text-right">Lots</th>
                  </tr>
                </thead>
                <tbody className="text-stone-800">
                  <tr className="border-b border-stone-100">
                    <td className="py-2.5 pr-3">1 · 100&nbsp;%</td>
                    <td className="py-2.5 text-right font-medium tabular-nums">400 × 5&nbsp;000&nbsp;$</td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="py-2.5 pr-3">2 · 75&nbsp;%</td>
                    <td className="py-2.5 text-right font-medium tabular-nums">300 × 5&nbsp;000&nbsp;$</td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="py-2.5 pr-3">3 · 50&nbsp;%</td>
                    <td className="py-2.5 text-right font-medium tabular-nums">200 × 5&nbsp;000&nbsp;$</td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="py-2.5 pr-3">4 · 25&nbsp;%</td>
                    <td className="py-2.5 text-right font-medium tabular-nums">100 × 5&nbsp;000&nbsp;$</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-stone-500 mt-4">
              Paliers 5 à 9 · jusqu&apos;à 585,94&nbsp;$ par lot
            </p>
          </article>
        </motion.div>

        {/* How It Works */}
        <motion.div
          className="max-w-4xl mx-auto mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="bg-stone-50/80 border border-amber-200/50 p-6 md:p-8">
            <h4 className="text-lg font-bold text-stone-900 mb-6 text-center">
              Comment ça fonctionne — carte et inscription des enfants
            </h4>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-stone-700 leading-relaxed">
              <div>
                <p className="font-semibold text-stone-900 mb-1">1. La carte de membre</p>
                <p>
                  Le parent achète une carte de 50&nbsp;$ pour enregistrer ses enfants
                  et participer aux concours.
                </p>
              </div>
              <div>
                <p className="font-semibold text-stone-900 mb-1">2. L&apos;inscription des enfants</p>
                <p>
                  Une fois la carte achetée, tous les enfants peuvent être inscrits,
                  sans limite — gratuitement.
                </p>
              </div>
              <div>
                <p className="font-semibold text-stone-900 mb-1">3. Accès et vérification</p>
                <p>
                  Chaque enfant reçoit un identifiant ou un code QR pour l&apos;accès
                  au site et aux activités.
                </p>
              </div>
              <div>
                <p className="font-semibold text-stone-900 mb-1">4. Sécurité</p>
                <p>
                  Les enfants peuvent profiter du site en toute sécurité, même si
                  les parents ne sont pas sur place.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
