"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Trophy,
  Camera,
  Crown,
  Award,
  Clock,
  CalendarDays,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  LogIn,
  CreditCard,
  ShieldCheck,
  BookOpen,
  ExternalLink,
  ArrowUpRight,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";
import { getMembership, getProfile, getAgeSpots, getGlobalSpots } from "@/utils/api";

type MemberUser = {
  id: string;
  email?: string;
  name?: string;
  is_member: boolean;
  membership_date?: string;
  age_years?: number;
};

type AccessState = "checking" | "unauth" | "notMember" | "ok";

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function MemberContent() {
  const [user, setUser] = useState<MemberUser | null>(null);
  const [state, setState] = useState<AccessState>("checking");
  const [spots, setSpots] = useState<{
    sold: number;
    cap: number;
    remaining: number;
    unlocked: boolean;
  } | null>(null);
  const [globalSpots, setGlobalSpots] = useState<{
    sold: number;
    cap: number;
    remaining: number;
    unlocked: boolean;
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const profile = await getProfile().catch(() => null);
        if (!profile) {
          setState("unauth");
          return;
        }
        const membership = await getMembership().catch(() => ({
          is_member: false,
          membership_date: null,
        }));
        if (!membership.is_member) {
          setUser({
            id: profile.id,
            email: profile.email,
            name: profile.name,
            is_member: false,
          });
          setState("notMember");
          return;
        }
        setUser({
          id: profile.id,
          email: profile.email,
          name: profile.name,
          is_member: true,
          membership_date: membership.membership_date || undefined,
          age_years: (profile as any).age_years,
        });
        setState("ok");
        // Fetch category and global spots
        try {
          if (typeof (profile as any).age_years === "number") {
            const s = await getAgeSpots((profile as any).age_years);
            setSpots(s);
          }
          const g = await getGlobalSpots();
          setGlobalSpots(g);
        } catch {}
      } catch (error) {
        setState("unauth");
      }
    };
    checkUser();
  }, []);

  useEffect(() => {
    // Access state tracking for debugging if needed
  }, [state]);

  // Loading state
  if (state === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-blue-50">
        <div className="flex flex-col items-center gap-3">
          <motion.div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600" />
          <div className="text-sm text-gray-600">Chargement…</div>
        </div>
      </div>
    );
  }

  // Unauthenticated fallback
  if (state === "unauth") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-blue-50 to-purple-50 px-4">
        <div className="max-w-lg w-full bg-stone-50/90 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-200/60 p-8 text-center">
          <div className="mx-auto w-14 h-14 rounded-xl bg-primary-50 text-primary-600 grid place-items-center mb-4">
            <LogIn className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Veuillez vous connecter
          </h1>
          <p className="text-gray-600 mb-6">
            Vous devez être connecté pour accéder à l'Espace Membre.
          </p>
          <a
            href="/login"
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-3 rounded-xl font-semibold"
          >
            <LogIn className="h-5 w-5" /> Aller à la connexion
          </a>
        </div>
      </div>
    );
  }

  // Not a member yet fallback
  if (state === "notMember") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-blue-50 to-purple-50 px-4">
        <div className="max-w-lg w-full bg-stone-50/90 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-200/60 p-8 text-center">
          <div className="mx-auto w-14 h-14 rounded-xl bg-amber-50 text-amber-600 grid place-items-center mb-4">
            <CreditCard className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Obtenez votre carte de membre
          </h1>
          <p className="text-gray-600 mb-6">
            Rejoignez le Domaine du Chevreuil Blanc pour accéder au parc
            animalier et participer aux concours exclusifs.
          </p>
          <a
            href="/payment"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-5 py-3 rounded-xl font-semibold shadow hover:shadow-lg"
          >
            <CreditCard className="h-5 w-5" /> Aller au paiement
          </a>
          <p className="text-xs text-gray-500 mt-3">
            Déjà payé dans un autre onglet ? Actualisez cette page.
          </p>
        </div>
      </div>
    );
  }

  // Safety: if user data hasn't populated yet (rare race), keep showing loader
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-blue-50">
        <motion.div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600" />
      </div>
    );
  }

  // Active contest data (mock)
  const activeContest = {
    title: "Concours Photo — Domaine du Chevreuil Blanc",
    theme: "Découvrez nos animaux dans leur environnement naturel",
    prize: "Visite VIP + Carte de membre gratuite",
    deadline: "30 Juin 2025",
    entries: 156,
    banner:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1600&auto=format&fit=crop",
    rules: [
      "Une photo par membre · Visite au parc obligatoire",
      "Photos prises au Domaine du Chevreuil Blanc uniquement",
      "Inclure un titre et une histoire de 1-2 phrases",
      "Vous devez posséder tous les droits sur la photo",
    ],
  };

  const winners = [
    {
      month: "May 2025",
      name: "Amina K.",
      title: "Snow Whisper",
      img: "https://images.unsplash.com/photo-1549641206-7d3d2539ab2b?q=80&w=800&auto=format&fit=crop",
    },
    {
      month: "April 2025",
      name: "Luca M.",
      title: "Savanna Gaze",
      img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=800&auto=format&fit=crop",
    },
    {
      month: "March 2025",
      name: "Chen Y.",
      title: "Golden Hour Flight",
      img: "https://images.unsplash.com/photo-1501706362039-c06b2d715385?q=80&w=800&auto=format&fit=crop",
    },
  ];

  // Derived
  const firstName = user.name ? user.name.split(" ")[0] : undefined;
  const ageLabel =
    typeof user.age_years === "number" ? `${user.age_years} ans` : undefined;
  const memberSinceLabel = user.membership_date
    ? new Date(user.membership_date).toLocaleDateString()
    : "—";
  const initials = (user.name || user.email || "U?")
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");
  const ageYears = user.age_years;
  const categoryName =
    typeof ageYears === "number"
      ? ageYears >= 18
        ? "Adulte"
        : "Enfant"
      : undefined;
  const ageAndCategory =
    typeof ageYears === "number" ? `${ageYears} ans — ${categoryName}` : "—";
  const memberNumber = (user as any).member_number || `CB-${
    (user.id || "").slice(-5).toUpperCase() || "00000"
  }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-blue-50 to-purple-50">
      {/* En-tête */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/15 via-blue-600/10 to-purple-600/10" />
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-6 sm:pb-8"
        >
          <motion.div
            variants={item}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
          >
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-stone-50/90 backdrop-blur-sm shadow-lg grid place-items-center border border-amber-200/80">
                  <span className="text-2xl sm:text-3xl font-bold text-primary-700">
                    {initials}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                  <ShieldCheck className="h-3 w-3 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2">
                  Bienvenue{firstName ? `, ${firstName}` : ""}
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-[13px]">
                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 font-medium">
                      <ShieldCheck className="h-4 w-4" /> Membre actif
                    </span>
                    <span className="text-gray-500 font-medium">
                      Membre depuis {memberSinceLabel}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:gap-4">
              <a
                href="#resources"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-amber-200/50 bg-stone-50/90 backdrop-blur-sm px-5 py-3 text-sm font-medium text-gray-700 shadow-sm hover:shadow-md hover:bg-stone-50/90 backdrop-blur-sm transition-all duration-200"
              >
                <BookOpen className="h-4 w-4" /> Ressources
              </a>
              <a
                href="#submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white px-5 py-3 text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
              >
                <Camera className="h-4 w-4" /> Soumettre une participation
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div> */}
          </motion.div>

          {/* Informations d'adhésion */}
          <motion.div
            variants={item}
            className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
          >
            <div className="rounded-2xl bg-stone-50/80 backdrop-blur border border-amber-200/70 p-3 sm:p-4 shadow-sm">
              <div className="text-xs text-gray-500">Statut de la carte</div>
              <div className="mt-1 text-gray-900 font-semibold">
                🟢 Actif — 6 mois d’essai gratuit
              </div>
            </div>
            {/* <div className="rounded-2xl bg-stone-50/80 backdrop-blur border border-amber-200/70 p-3 sm:p-4 shadow-sm">
              <div className="text-xs text-gray-500">Numéro de membre</div>
              <div className="mt-1 text-gray-900 font-semibold">
                {memberNumber}
              </div>
            </div> */}
            <div className="rounded-2xl bg-stone-50/80 backdrop-blur border border-amber-200/70 p-3 sm:p-4 shadow-sm">
              <div className="text-xs text-gray-500">Âge et catégorie</div>
              <div className="mt-1 text-gray-900 font-semibold">
                {ageAndCategory}
              </div>
            </div>
            <div className="rounded-2xl bg-stone-50/80 backdrop-blur border border-amber-200/70 p-3 sm:p-4 shadow-sm">
              <div className="text-xs text-gray-500">
                Progression de votre catégorie d'âge
              </div>
              <div className="mt-1 text-gray-900 font-semibold">
                {spots
                  ? `${spots.sold.toLocaleString()} / ${spots.cap.toLocaleString()} membres`
                  : "Chargement…"}
              </div>
              {/* <div className="text-xs text-gray-500 mt-1">{spots ? (spots.unlocked ? "🏆 Tirage débloqué !" : "Tirage débloqué à 5 000 membres") : ""}</div> */}
            </div>
            <div className="rounded-2xl bg-stone-50/80 backdrop-blur border border-amber-200/70 p-3 sm:p-4 shadow-sm">
              <div className="text-xs text-gray-500">Progression globale</div>
              <div className="mt-1 text-gray-900 font-semibold">
                {globalSpots
                  ? `${globalSpots.sold.toLocaleString()} / ${globalSpots.cap.toLocaleString()} membres`
                  : "Chargement…"}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Main content */}
      <motion.div
        className="max-w-7xl mt-4 sm:mt-6 mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Tirages et récompenses */}
          <motion.div
            id="submit"
            variants={item}
            className="lg:col-span-4 overflow-hidden rounded-2xl shadow-xl border border-white/60 bg-stone-50/90 backdrop-blur-sm"
          >
            <div className="relative p-4 sm:p-6 md:p-8 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 rounded-2xl overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src="https://images.unsplash.com/photo-1557050543-4d5f2e07c5b9?q=80&w=1200&auto=format&fit=crop"
                  alt="Wildlife photography background"
                  className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 via-primary-700/85 to-primary-800/90"></div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-stone-50/90 backdrop-blur-sm/90 px-3 py-1 text-xs font-medium text-gray-700 border border-amber-200/50">
                      <Trophy className="h-4 w-4 text-primary-600" /> Tirages et
                      récompenses
                    </div>
                    <h2 className="mt-3 text-lg sm:text-2xl md:text-3xl font-extrabold text-white break-words">
                      Domaine du Chevreuil Blanc — Prochains tirages
                    </h2>
                    <p className="text-primary-50 font-medium text-xs sm:text-base">
                      Chaque carte achetée vous rapproche du tirage.{" "}
                      {spots
                        ? `${spots.sold.toLocaleString()} / ${spots.cap.toLocaleString()} cartes vendues`
                        : ""}
                    </p>
                  </div>
                  <div className="text-left sm:text-right text-white">
                    <div className="text-sm flex items-center sm:justify-end gap-2 opacity-90">
                      <CalendarDays className="h-4 w-4" /> Prochaine annonce
                    </div>
                    <div className="text-lg font-semibold">30 juin 2025</div>
                  </div>
                </div>
                {/* Overlay metrics */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 md:flex md:flex-row md:flex-wrap">
                  <div className="inline-flex items-center gap-2 rounded-full bg-stone-50/80 backdrop-blur-sm border border-amber-200/50 px-3 py-1.5 shadow-sm">
                    <Award className="h-4 w-4 text-primary-600" />
                    <span className="text-sm font-medium text-gray-900">
                      🏡 Maison de rêve
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-stone-50/80 backdrop-blur-sm border border-amber-200/50 px-3 py-1.5 shadow-sm">
                    <Award className="h-4 w-4 text-primary-600" />
                    <span className="text-sm font-medium text-gray-900">
                      💰 50 000 $ en argent
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-stone-50/80 backdrop-blur-sm border border-amber-200/50 px-3 py-1.5 shadow-sm">
                    <Award className="h-4 w-4 text-primary-600" />
                    <span className="text-sm font-medium text-gray-900">
                      🚗 Dodge Ram 1500 Sport
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 md:px-8 md:py-2">
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Le projet en bref</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Un domaine familial, près de la nature, pensé pour les
                    familles du Québec. Chaque carte finance des habitats, des
                    activités et des prix majeurs — le tout avec une transparence
                    totale et un suivi public sur nos réseaux.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Pourquoi acheter votre carte ?
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5" /> Vivre une sortie immersive avec les animaux</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5" /> Courir la chance de gagner maison, argent, véhicules, voyages</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5" /> Appuyer un projet collectif d’ici, clair et responsable</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5" /> Laisser votre trace dans un lieu durable pour les familles</li>
                  </ul>
                  <div className="mt-4"></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar: Quick actions and help */}
          {/* <motion.div variants={item} className="space-y-6 order-first lg:order-last">
            <div className="bg-stone-50/90 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-200/60 p-4 sm:p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Actions rapides
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-1 gap-3">
                <a
                  href="#submit"
                  className="group flex items-center justify-between rounded-xl border border-amber-200/50 p-3 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3 text-gray-800">
                    <Camera className="h-5 w-5 text-primary-600" /> Soumettre participation
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                </a>
                <a
                  href="#resources"
                  className="group flex items-center justify-between rounded-xl border border-amber-200/50 p-3 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3 text-gray-800">
                    <BookOpen className="h-5 w-5 text-purple-600" /> Ressources
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                </a>
                <a
                  href="/payment"
                  className="group flex items-center justify-between rounded-xl border border-amber-200/50 p-3 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3 text-gray-800">
                    <CreditCard className="h-5 w-5 text-emerald-600" /> Gérer
                    l'adhésion
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                </a>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl border border-amber-200/50 p-4 sm:p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Actualités du Domaine</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>🦌 Arrivée de deux nouveaux chevreuils blancs sur le site.</li>
                <li>🏗️ Construction du deuxième chalet terminée.</li>
                <li>🎥 Nouvelle vidéo publiée : La vie au Domaine.</li>
              </ul>
            </div>
          </motion.div> */}
        </div>
        <div className="mt-10 text-center text-sm text-gray-500">
          <div className="mb-1">
            FAQ | Règlements | Contact | Réseaux sociaux
          </div>
          <div>
            © 2025 Le Domaine du Chevreuil Blanc — Projet collectif du Québec.
          </div>
        </div>
      </motion.div>
    </div>
  );
}
