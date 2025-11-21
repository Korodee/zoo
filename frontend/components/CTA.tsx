"use client";

import { motion } from "framer-motion";
import {
  Award,
  Camera,
  Trophy,
  Users,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CTA() {
  const [open, setOpen] = useState(false);
  return (
    <section
      id="membership"
      className="relative overflow-hidden py-24 bg-gradient-to-b from-white via-neutral-50 to-white"
    >
      {/* Background image layer (restored) */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/3788554/pexels-photo-3788554.jpeg"
          alt="Zoo animals background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[48rem] -translate-x-1/2 rounded-full bg-yellow-200/25 blur-3xl" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-yellow-100 text-yellow-900 text-sm font-medium">
            <Award className="h-4 w-4" />
            Concours & Adhésion
          </div>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Participez, gagnez, et suivez l’aventure en direct
          </h2>
          <p className="mt-3 text-lg text-gray-300 max-w-3xl mx-auto">
            Des prix exceptionnels pour adultes et enfants, une expérience
            filmée et un projet collectif unique au Québec. 🎉 1 an d'essai gratuit à l'achat de la carte.
          </p>
          <p className="mt-2 text-base text-gray-200">
            Besoin d'aide? Appelez-nous au <span className="font-semibold">+1 (819) 329-6264</span>.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <div className="bg-black/20 backdrop-blur-md rounded-xl p-6 border border-white/20 ring-1 ring-white/10 shadow-lg">
            <div className="flex items-center gap-3">
              <Camera className="h-6 w-6 text-yellow-700" />
              <h3 className="font-semibold text-white">Maisons</h3>
            </div>
            <p className="mt-2 text-sm text-gray-300">
              Véhicules, bateaux et équipements plein air
            </p>
          </div>
          <div className="bg-black/20 backdrop-blur-md rounded-xl p-6 border border-white/20 ring-1 ring-white/10 shadow-lg">
            <div className="flex items-center gap-3">
              <Trophy className="h-6 w-6 text-yellow-700" />
              <h3 className="font-semibold text-white">Argent</h3>
            </div>
            <p className="mt-2 text-sm text-gray-300">
              Grand prix maison + prix enfants
            </p>
          </div>
          <div className="bg-black/20 backdrop-blur-md rounded-xl p-6 border border-white/20 ring-1 ring-white/10 shadow-lg">
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-yellow-700" />
              <h3 className="font-semibold text-white">Véhicules & Plus</h3>
            </div>
            <p className="mt-2 text-sm text-gray-300">
              Véhicules, roulottes, bateaux, voyages, prix enfants
            </p>
          </div>
        </div>

        {/* Collapsible details preserving all copy */}
        <div className="mt-10 max-w-5xl mx-auto">
          <button
            onClick={() => setOpen((v) => !v)}
            className="w-full flex items-center justify-between rounded-xl border border-white/20 bg-black/20 backdrop-blur-md px-5 py-4 text-left shadow-lg"
          >
            <div>
              <div className="text-lg font-semibold text-white">
                Détails des concours
              </div>
              <div className="text-gray-300 text-sm">
                Cliquez pour {open ? "masquer" : "afficher"} tous les détails
              </div>
            </div>
            <ChevronDown
              className={`h-5 w-5 text-neutral-100 transition-transform ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>
          <motion.div
            initial={false}
            animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
            className="overflow-hidden"
          >
            <div className="rounded-b-xl border-x border-b border-white/20 bg-black/20 backdrop-blur-md p-6 shadow-lg">
              <ul className="space-y-2.5 text-gray-300 text-sm md:text-base">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-yellow-300 shadow-[0_0_0_3px_rgba(255,255,255,0.08)]" />
                  <span>
                    Véhicules et bateaux – Dodge Ram 2026, GMC Terrain, Mitsubishi 2026, bateaux Crossline PROX, 1850 FIS, Lund 160, CFMOTO U-Force, Sportsman Polaris, vélos électriques et lots plein air
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-yellow-300 shadow-[0_0_0_3px_rgba(255,255,255,0.08)]" />
                  <span>
                    Grand prix maison – 1 maison d'un million de dollars tirée parmi tous les membres participants; le gagnant choisit son terrain et dessine sa maison; processus entièrement filmé
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-yellow-300 shadow-[0_0_0_3px_rgba(255,255,255,0.08)]" />
                  <span>
                    Véhicules et roulottes – Dodge Ram 1500 Sport (2) valeur 82
                    450 $; Dodge Challenger SXT V8 (2) valeur 91 980 $; Toyota
                    Sequoia (2) valeur 86 000 $; Roulotte Bolit 2530 RD (2)
                    valeur 64 386 $
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-yellow-300 shadow-[0_0_0_3px_rgba(255,255,255,0.08)]" />
                  <span>
                    Bateaux et pontons – 2 pontons valeur 68 000 $ chacun
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-yellow-300 shadow-[0_0_0_3px_rgba(255,255,255,0.08)]" />
                  <span>
                    Voyages – 50 voyages de pêche dans des pourvoiries du Québec
                  </span>
                </li>
              </ul>
              <p className="mt-5 text-white">
                10 millions $ en prix à gagner pour adultes et enfants. • Cartes
                obligatoires et limitées. • Chaque carte achetée est un pas vers
                votre rêve et le projet collectif.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Split metrics + info cards, preserving copy blocks */}
        <div className="mt-10 grid md:grid-cols-3 gap-2">
          <div className="bg-black/20 backdrop-blur-md rounded-xl p-6 border border-white/20 ring-1 ring-white/10 shadow-lg">
            <h3 className="text-xl font-semibold text-white mb-3">
              Prix enfants (≈ 3 M$)
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-yellow-300 shadow-[0_0_0_3px_rgba(255,255,255,0.08)]" />
                <span>200 PlayStation 5 (~800 $ chacune)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-yellow-300 shadow-[0_0_0_3px_rgba(255,255,255,0.08)]" />
                <span>200 Xbox Series X (~800 $ chacune)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-yellow-300 shadow-[0_0_0_3px_rgba(255,255,255,0.08)]" />
                <span>100 scooters (~4 000 $ chacun)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-yellow-300 shadow-[0_0_0_3px_rgba(255,255,255,0.08)]" />
                <span>200 vélos électriques GT73 (~2 099 $ chacun)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-yellow-300 shadow-[0_0_0_3px_rgba(255,255,255,0.08)]" />
                <span>200 vélos électriques Jasion EB7 (~899 $ chacun)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-yellow-300 shadow-[0_0_0_3px_rgba(255,255,255,0.08)]" />
                <span>200 vélos électriques Wyndon E2 (~1 129 $ chacun)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-yellow-300 shadow-[0_0_0_3px_rgba(255,255,255,0.08)]" />
                <span>200 cartes-cadeaux de 1 000 $</span>
              </li>
            </ul>
          </div>
          <div className="bg-black/20 backdrop-blur-md rounded-xl p-6 border border-white/20 ring-1 ring-white/10 shadow-lg">
            <h3 className="text-xl font-semibold text-white mb-3">
              Total des prix à 100 %
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_0_3px_rgba(255,255,255,0.08)]" />
                <span>≈ 10 millions $ remis au public</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_0_3px_rgba(255,255,255,0.08)]" />
                <span>Maisons : 3 M$</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_0_3px_rgba(255,255,255,0.08)]" />
                <span>Argent comptant : 3 M$</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_0_3px_rgba(255,255,255,0.08)]" />
                <span>Véhicules, roulottes, bateaux : 1,2 M$</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_0_3px_rgba(255,255,255,0.08)]" />
                <span>Voyages de pêche : 0,15 M$</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_0_3px_rgba(255,255,255,0.08)]" />
                <span>Prix enfants : 2,65 M$</span>
              </li>
            </ul>
          </div>
          {/* How draws work */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-black/20 backdrop-blur-md rounded-xl p-6 border border-white/20 ring-1 ring-white/10 shadow-lg">
              <h3 className="text-xl font-semibold text-white mb-3">
                Comment fonctionnent les tirages – Domaine du Chevreuil Blanc
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Chaque catégorie d'âge a un objectif de 6 000 cartes à atteindre. Dès que ce palier est atteint, le grand prix de 75 000 $ est tiré immédiatement ! Les prix peuvent être un camion, un bateau ou d'autres surprises, selon la catégorie.
              </p>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                C'est un système en pyramide : plus vite vous participez, plus vite les tirages ont lieu. Pour participer, il suffit d'acheter une carte de membre et votre catégorie avance dans le tirage.
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                Chaque contribution nous aide à faire grandir le Domaine et à offrir plus de prix et d'expériences.
              </p>
            </div>
            </div>
            </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/signup">
              <motion.button
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-8 py-4 text-white font-semibold shadow-lg hover:shadow-xl"
            >
              Obtenir ma Carte
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </Link>
            <Link href="/login">
              <motion.button
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative inline-flex items-center gap-2 rounded-full px-8 py-4 font-semibold text-white shadow-lg hover:shadow-xl bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              <span className="relative">Déjà membre ?</span>
              <ArrowRight className="h-5 w-5 relative" />
              </motion.button>
            </Link>
            </div>
      </div>
    </section>
  );
}
