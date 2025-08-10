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
import { getMembership, getProfile } from "@/utils/api";

type MemberUser = {
  id: string;
  email?: string;
  name?: string;
  is_member: boolean;
  membership_date?: string;
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
  const router = useRouter();

  useEffect(() => {
    // Debug: confirm hydration and effect execution
    // eslint-disable-next-line no-console
    console.log("MemberContent mounted");
    const checkUser = async () => {
      try {
        const profile = await getProfile().catch(() => null);
        if (!profile) {
          // eslint-disable-next-line no-console
          console.log("No profile -> unauth");
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
          // eslint-disable-next-line no-console
          console.log("Profile found but not a member");
          setState("notMember");
          return;
        }
        setUser({
          id: profile.id,
          email: profile.email,
          name: profile.name,
          is_member: true,
          membership_date: membership.membership_date || undefined,
        });
        // eslint-disable-next-line no-console
        console.log("Profile + membership ok");
        setState("ok");
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log("Error during user check", error);
        setState("unauth");
      }
    };
    checkUser();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("Access state:", state);
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
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl border border-white/60 p-8 text-center">
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
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl border border-white/60 p-8 text-center">
          <div className="mx-auto w-14 h-14 rounded-xl bg-amber-50 text-amber-600 grid place-items-center mb-4">
            <CreditCard className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Complétez votre adhésion
          </h1>
          <p className="text-gray-600 mb-6">
            Rejoignez la communauté pour participer aux concours mensuels et voir
            du contenu exclusif.
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
    title: "Portraits Faune Sauvage — Juin 2025",
    theme: "Portraits en gros plan qui révèlent l'émotion et le caractère",
    prize: "1000€ + Interview en Vedette",
    deadline: "30 Juin 2025",
    entries: 328,
    banner:
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=1600&auto=format&fit=crop",
    rules: [
      "Une photo par membre · RAW ou JPG haute résolution",
      "Pas d'images générées par IA · Éditions de base autorisées",
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
  const memberSinceLabel = user.membership_date
    ? new Date(user.membership_date).toLocaleDateString()
    : "—";
  const initials = (user.name || user.email || "U?")
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-blue-50 to-purple-50">
      {/* Hero */}
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
                <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-white shadow-lg grid place-items-center border border-white/80">
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
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:gap-4">
              <a
                href="#resources"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white/90 backdrop-blur-sm px-5 py-3 text-sm font-medium text-gray-700 shadow-sm hover:shadow-md hover:bg-white transition-all duration-200"
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
            </div>
          </motion.div>

          {/* Top stats */}
          <motion.div
            variants={item}
            className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div className="rounded-2xl bg-white/80 backdrop-blur border border-white/70 p-4 shadow-sm">
              <div className="text-xs text-gray-500">Statut</div>
              <div className="mt-1 flex items-center gap-2 text-gray-900 font-semibold">
                <ShieldCheck className="h-4 w-4 text-emerald-600" /> Actif
              </div>
            </div>
            <div className="rounded-2xl bg-white/80 backdrop-blur border border-white/70 p-4 shadow-sm">
              <div className="text-xs text-gray-500">Membre depuis</div>
              <div className="mt-1 text-gray-900 font-semibold">
                {memberSinceLabel}
              </div>
            </div>
            <div className="rounded-2xl bg-white/80 backdrop-blur border border-white/70 p-4 shadow-sm">
              <div className="text-xs text-gray-500">Participations ce mois</div>
              <div className="mt-1 text-gray-900 font-semibold">0/1</div>
            </div>
            <div className="rounded-2xl bg-white/80 backdrop-blur border border-white/70 p-4 shadow-sm">
              <div className="text-xs text-gray-500">Points communauté</div>
              <div className="mt-1 flex items-center gap-2 text-gray-900 font-semibold">
                <Star className="h-4 w-4 text-amber-500" /> 120
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
          {/* Active contest card */}
          <motion.div
            id="submit"
            variants={item}
            className="lg:col-span-2 overflow-hidden rounded-2xl shadow-xl border border-white/60 bg-white"
          >
            <div className="relative p-6 md:p-8 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 rounded-2xl overflow-hidden">
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
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-700 border border-gray-200">
                      <Trophy className="h-4 w-4 text-primary-600" /> Concours
                      mensuel
                    </div>
                    <h2 className="mt-3 text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
                      {activeContest.title}
                    </h2>
                    <p className="text-primary-50 font-medium text-sm sm:text-base">
                      Thème : {activeContest.theme}
                    </p>
                  </div>
                  <div className="text-left sm:text-right text-white">
                    <div className="text-sm flex items-center sm:justify-end gap-2 opacity-90">
                      <CalendarDays className="h-4 w-4" /> Date limite
                    </div>
                    <div className="text-lg font-semibold">
                      {activeContest.deadline}
                    </div>
                  </div>
                </div>
                {/* Overlay metrics */}
                <div className="mt-4 flex flex-col sm:flex-row flex-wrap gap-2">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 px-3 py-1.5 shadow-sm">
                    <Award className="h-4 w-4 text-primary-600" />
                    <span className="text-sm font-medium text-gray-900">
                      {activeContest.prize}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 px-3 py-1.5 shadow-sm">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-900">
                      {activeContest.entries.toLocaleString()} jusqu'à présent
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 px-3 py-1.5 shadow-sm">
                    <Clock className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm font-medium text-gray-900">
                      Ouvert aux participations
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 md:p-8">
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Règles</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {activeContest.rules.map((r, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5" />{" "}
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Comment participer
                  </h3>
                  <ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
                    <li>
                      Choisissez votre meilleur portrait de faune sauvage qui correspond au thème
                    </li>
                    <li>Assurez-vous qu'il respecte les règles ci-dessus</li>
                    <li>Soumettez votre participation (titre + histoire courte)</li>
                  </ol>
                  <div className="mt-4">
                    <a
                      href="#"
                      className="inline-flex my-3 md:my-0 items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-5 py-3 rounded-xl font-semibold shadow hover:shadow-lg w-full sm:w-auto"
                    >
                      <Camera className="h-5 w-5" /> Soumettre votre participation{" "}
                      <ArrowRight className="h-5 w-5" />
                    </a>
                    <p className="text-xs text-gray-500 mt-2">
                      Les participations se ferment le {activeContest.deadline}. Un seul gagnant.
                      Bonne chance !
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar: Quick actions and help */}
          <motion.div variants={item} className="space-y-6 order-first lg:order-last">
            <div className="bg-white rounded-2xl shadow-xl border border-white/60 p-4 sm:p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Actions rapides
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-1 gap-3">
                <a
                  href="#submit"
                  className="group flex items-center justify-between rounded-xl border border-gray-200 p-3 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3 text-gray-800">
                    <Camera className="h-5 w-5 text-primary-600" /> Soumettre participation
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                </a>
                <a
                  href="#resources"
                  className="group flex items-center justify-between rounded-xl border border-gray-200 p-3 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3 text-gray-800">
                    <BookOpen className="h-5 w-5 text-purple-600" /> Ressources
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                </a>
                <a
                  href="/payment"
                  className="group flex items-center justify-between rounded-xl border border-gray-200 p-3 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3 text-gray-800">
                    <CreditCard className="h-5 w-5 text-emerald-600" /> Gérer
                    l'adhésion
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                </a>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-4 sm:p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Besoin d'aide ?</h3>
              <p className="text-sm text-gray-600">
                We’re here for you. Reach us at{" "}
                <span className="font-medium">support@wildlifehub.com</span>
              </p>
            </div>
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
}
