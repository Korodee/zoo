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

        {/* House/Trailer Prize Tiers */}
        <motion.div
          className="max-w-6xl mx-auto mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="bg-stone-50/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-200/50 mb-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-2 text-center">
              🏠 Palier des prix - Maisons et roulottes
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
                      Montant total
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
                    <td className="px-3 py-2 text-center font-semibold">1 000 000 $</td>
                    <td className="px-3 py-2 text-left">Maison 1 M$</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2 text-center font-semibold text-emerald-600">
                      2
                    </td>
                    <td className="px-3 py-2 text-center">75 %</td>
                    <td className="px-3 py-2 text-center font-semibold">750 000 $</td>
                    <td className="px-3 py-2 text-left">Maison 750 k$</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2 text-center font-semibold text-emerald-600">
                      3
                    </td>
                    <td className="px-3 py-2 text-center">50 %</td>
                    <td className="px-3 py-2 text-center font-semibold">500 000 $</td>
                    <td className="px-3 py-2 text-left">Maison 500 k$</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2 text-center">4</td>
                    <td className="px-3 py-2 text-center">25 %</td>
                    <td className="px-3 py-2 text-center">250 000 $</td>
                    <td className="px-3 py-2 text-left">
                      5 roulottes × 50 000 $ chacune
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2 text-center">5</td>
                    <td className="px-3 py-2 text-center">12,5 %</td>
                    <td className="px-3 py-2 text-center">125 000 $</td>
                    <td className="px-3 py-2 text-left">
                      Résidence 40 HBDL 2025 (roulotte)
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2 text-center">6</td>
                    <td className="px-3 py-2 text-center">6,25 %</td>
                    <td className="px-3 py-2 text-center">62 500 $</td>
                    <td className="px-3 py-2 text-left">
                      Surveyor 202 RBLE 2026 (roulotte)
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2 text-center">7</td>
                    <td className="px-3 py-2 text-center">3,125 %</td>
                    <td className="px-3 py-2 text-center">31 250 $</td>
                    <td className="px-3 py-2 text-left">Puma 16 BHCE 2026 (roulotte)</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2 text-center">8</td>
                    <td className="px-3 py-2 text-center">1,5625 %</td>
                    <td className="px-3 py-2 text-center">15 625 $</td>
                    <td className="px-3 py-2 text-left">
                      Crédit pour l'achat d'une roulotte usagée (≈15 625 $)
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 py-2 text-center">9</td>
                    <td className="px-3 py-2 text-center">0,78125 %</td>
                    <td className="px-3 py-2 text-center">7 813 $</td>
                    <td className="px-3 py-2 text-left">
                      Crédit pour l'achat d'une roulotte usagée (≈7 813 $)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Money Prize Tiers */}
        <motion.div
          className="max-w-6xl mx-auto mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="bg-blue-50/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-200/50 mb-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-2 text-center">
              💰 Palier des prix - Lots d'argent
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
                      Montant total
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 border-b min-w-[200px]">
                      Répartition (5 lots)
                    </th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2 text-center font-semibold text-emerald-600">
                      1
                    </td>
                    <td className="px-3 py-2 text-center">100 %</td>
                    <td className="px-3 py-2 text-center font-semibold">500 000 $</td>
                    <td className="px-3 py-2 text-left">5 × 100 000 $</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2 text-center font-semibold text-emerald-600">
                      2
                    </td>
                    <td className="px-3 py-2 text-center">75 %</td>
                    <td className="px-3 py-2 text-center font-semibold">375 000 $</td>
                    <td className="px-3 py-2 text-left">5 × 75 000 $</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2 text-center font-semibold text-emerald-600">
                      3
                    </td>
                    <td className="px-3 py-2 text-center">50 %</td>
                    <td className="px-3 py-2 text-center font-semibold">250 000 $</td>
                    <td className="px-3 py-2 text-left">5 × 50 000 $</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2 text-center">4</td>
                    <td className="px-3 py-2 text-center">25 %</td>
                    <td className="px-3 py-2 text-center">125 000 $</td>
                    <td className="px-3 py-2 text-left">5 × 25 000 $</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2 text-center">5</td>
                    <td className="px-3 py-2 text-center">12,5 %</td>
                    <td className="px-3 py-2 text-center">62 500 $</td>
                    <td className="px-3 py-2 text-left">5 × 12 500 $</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2 text-center">6</td>
                    <td className="px-3 py-2 text-center">6,25 %</td>
                    <td className="px-3 py-2 text-center">31 250 $</td>
                    <td className="px-3 py-2 text-left">5 × 6 250 $</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2 text-center">7</td>
                    <td className="px-3 py-2 text-center">3,125 %</td>
                    <td className="px-3 py-2 text-center">15 625 $</td>
                    <td className="px-3 py-2 text-left">5 × 3 125 $</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2 text-center">8</td>
                    <td className="px-3 py-2 text-center">1,5625 %</td>
                    <td className="px-3 py-2 text-center">7 812,50 $</td>
                    <td className="px-3 py-2 text-left">5 × 1 562,50 $</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 py-2 text-center">9</td>
                    <td className="px-3 py-2 text-center">0,78125 %</td>
                    <td className="px-3 py-2 text-center">3 906,25 $</td>
                    <td className="px-3 py-2 text-left">5 × 781,25 $</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Grand Prize and Children's Prizes */}
        <motion.div
          className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-6 shadow-lg border border-yellow-200">
            <h4 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
              🏆 Le Grand Prix – Une maison d'un million de dollars
            </h4>
            <ul className="space-y-2.5 text-gray-700 text-sm leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                <span>Tirage parmi tous les membres participants</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                <span>Le gagnant choisit son terrain et dessine sa maison</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                <span>
                  Construction entièrement prise en charge jusqu'à 1 000 000 $
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                <span>Processus entièrement filmé et partagé</span>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-purple-100 rounded-lg border border-purple-200">
              <h5 className="font-semibold text-purple-800 mb-2">
                🌟 Bonus spécial
              </h5>
              <p className="text-xs text-purple-700">
                Si l'objectif de participation est atteint deux fois en six
                mois, le Domaine du Chevreuil Blanc offrira deux autres maisons
                d'un million de dollars à tirer pour les membres !
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-lg border border-blue-200">
            <h4 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
              🏕️ Pyramide des prix — Jeunes (lots plein air)
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              <strong>
                Montant total : 2 000 000 $ si l'objectif est atteint à 100 %
              </strong>
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center p-2 bg-white rounded border">
                <span className="font-medium">Palier 1 (100%)</span>
                <span className="text-emerald-600 font-semibold">
                  400 lots de 5 000$
                </span>
              </div>
              <div className="flex justify-between items-center p-2 bg-white rounded border">
                <span className="font-medium">Palier 2 (75%)</span>
                <span className="text-blue-600 font-semibold">
                  300 lots de 5 000$
                </span>
              </div>
              <div className="flex justify-between items-center p-2 bg-white rounded border">
                <span className="font-medium">Palier 3 (50%)</span>
                <span className="text-blue-600 font-semibold">
                  200 lots de 5 000$
                </span>
              </div>
              <div className="flex justify-between items-center p-2 bg-white rounded border">
                <span className="font-medium">Palier 4 (25%)</span>
                <span className="text-blue-600 font-semibold">
                  100 lots de 5 000$
                </span>
              </div>
              <div className="text-xs text-gray-500 text-center mt-2">
                ... et 5 autres paliers jusqu'au palier 9
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-3 italic">
              Même au plus petit palier, il y a toujours des chances de gagner
              des lots plein air !
            </p>
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          className="max-w-4xl mx-auto mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-lg border border-green-200">
            <h4 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              💳 Comment ça fonctionne : l'achat de la carte et l'enregistrement
              des enfants
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <h5 className="font-semibold text-gray-900 mb-2">
                  1. La carte de membre
                </h5>
                <p>
                  Le parent doit acheter une carte de 50 $ pour pouvoir
                  enregistrer ses enfants. Cette carte permet de participer aux
                  concours et d'accéder au site.
                </p>
              </div>
              <div>
                <h5 className="font-semibold text-gray-900 mb-2">
                  2. L'inscription des enfants
                </h5>
                <p>
                  Une fois la carte achetée, le parent peut enregistrer tous ses
                  enfants, sans limite de nombre. L'inscription de l'enfant est
                  gratuite.
                </p>
              </div>
              <div>
                <h5 className="font-semibold text-gray-900 mb-2">
                  3. Accès au site et vérification
                </h5>
                <p>
                  Chaque enfant enregistré reçoit un identifiant unique ou un QR
                  code pour l'accès au site et la participation aux activités.
                </p>
              </div>
              <div>
                <h5 className="font-semibold text-gray-900 mb-2">
                  4. Sécurité et transparence
                </h5>
                <p>
                  L'objectif est que tout le monde soit protégé et que les
                  enfants puissent bénéficier de leur inscription même si les
                  parents ne sont pas sur place.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
