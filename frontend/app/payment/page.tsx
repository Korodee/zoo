"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  CreditCard,
  CheckCircle,
  Camera,
  Trophy,
  Users,
  Award,
  ArrowRight,
  Loader2,
  Star,
  ShieldCheck,
  Lock,
  Mail,
  User as UserIcon,
  Shield,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import {
  getMembership,
  createCheckoutSession,
  getProfile,
  type UserProfile,
} from "@/utils/api";
import { useToast } from "@/components/Toast";

export default function PaymentPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [selectedCard, setSelectedCard] = useState<"adult" | "child">("adult");
  const router = useRouter();
  const { show } = useToast();

  const firstName = useMemo(() => {
    if (!profile?.name) return (profile?.email || "").split("@")[0];
    return profile.name.split(" ")[0];
  }, [profile]);

  useEffect(() => {
    const init = async () => {
      try {
        const user = await getProfile().catch(() => null);
        if (!user) {
          router.push("/login");
          return;
        }
        setProfile(user);
        const membership = await getMembership();
        if (membership.is_member) {
          router.push("/member");
          return;
        }
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, [router]);

  const handlePayment = async () => {
    if (!profile) return;
    setIsProcessing(true);
    try {
      show("Redirecting to secure checkout...", "info", 1800);
      const res = await createCheckoutSession(
        profile.id,
        profile.email || "",
        selectedCard
      );
      if (res.url) window.location.href = res.url;
      else throw new Error("Could not start checkout");
    } catch (e: any) {
      show(e?.message || "Payment failed. Please try again.", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm text-gray-600 mb-1">
            Welcome{firstName ? `, ${firstName}` : ""}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Obtenez Votre Carte de Membre - Domaine du Chevreuil Blanc
          </h1>
          <p className="text-gray-600 mt-2">
            Accédez au parc animalier et participez aux concours exclusifs avec
            6 mois gratuits.
          </p>

          {/* Steps */}
          <div className="mt-6 grid grid-cols-4 gap-3 text-sm">
            {[
              { label: "Connexion", done: true },
              { label: "Choisir carte", done: true },
              { label: "Paiement", done: false },
              { label: "Accès", done: false },
            ].map((s, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 ${
                  i <= 1 ? "text-primary-600" : "text-gray-500"
                }`}
              >
                <div
                  className={`h-2 w-2 rounded-full ${
                    i <= 1 ? "bg-primary-600" : "bg-gray-300"
                  }`}
                />
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Left: Plan & benefits */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 h-full flex flex-col">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Choisissez Votre Carte
                </h2>
                <p className="text-gray-600">
                  Sélectionnez le type de carte qui vous convient
                </p>
              </div>

              {/* Card Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <motion.button
                  onClick={() => setSelectedCard("adult")}
                  className={`relative p-6 rounded-xl border-2 transition-all duration-200 ${
                    selectedCard === "adult"
                      ? "border-primary-500 bg-primary-50 shadow-lg"
                      : "border-gray-200 bg-gray-50 hover:border-gray-300"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-center">
                    <div
                      className={`text-2xl font-bold mb-2 ${
                        selectedCard === "adult"
                          ? "text-primary-600"
                          : "text-gray-700"
                      }`}
                    >
                      30$ CAD
                    </div>
                    <div className="text-lg font-semibold text-gray-900 mb-1">
                      Carte Adulte
                    </div>
                    <div className="text-sm text-gray-600">18 ans et plus</div>
                    {selectedCard === "adult" && (
                      <motion.div
                        className="absolute top-3 right-3"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <CheckCircle className="h-6 w-6 text-primary-600" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>

                <motion.button
                  onClick={() => setSelectedCard("child")}
                  className={`relative p-6 rounded-xl border-2 transition-all duration-200 ${
                    selectedCard === "child"
                      ? "border-primary-500 bg-primary-50 shadow-lg"
                      : "border-gray-200 bg-gray-50 hover:border-gray-300"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-center">
                    <div
                      className={`text-2xl font-bold mb-2 ${
                        selectedCard === "child"
                          ? "text-primary-600"
                          : "text-gray-700"
                      }`}
                    >
                      20$ CAD
                    </div>
                    <div className="text-lg font-semibold text-gray-900 mb-1">
                      Carte Enfant
                    </div>
                    <div className="text-sm text-gray-600">18 ans et moins</div>
                    {selectedCard === "child" && (
                      <motion.div
                        className="absolute top-3 right-3"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <CheckCircle className="h-6 w-6 text-primary-600" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              </div>

              <div className="mt-3 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                <ShieldCheck className="h-5 w-5 text-green-600" />
                <p className="text-sm text-green-700">
                  Cartes limitées — Participation aux concours obligatoire
                </p>
              </div>
            </div>

            {/* Removed optional sections for now */}
          </motion.div>

          {/* Right: Order summary & pay */}
          <motion.div
            className="space-y-6 lg:sticky lg:top-24"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 flex flex-col">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Résumé de la Commande
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Carte</span>
                  <span className="font-medium text-gray-900">
                    Domaine du Chevreuil Blanc —{" "}
                    {selectedCard === "adult" ? "Adulte" : "Enfant"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Prix</span>
                  <span className="font-medium text-gray-900">
                    {selectedCard === "adult" ? "30$" : "20$"} CAD
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Nom</span>
                  <span className="font-medium text-gray-900 flex items-center gap-2">
                    <UserIcon className="h-4 w-4 text-gray-400" />
                    {profile?.name || "—"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Courriel</span>
                  <span className="font-medium text-gray-900 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    {profile?.email}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <motion.button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  whileHover={{
                    scale: isProcessing ? 1 : 1.02,
                    y: isProcessing ? 0 : -2,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" />
                      <span>
                        Payer {selectedCard === "adult" ? "30$" : "20$"} CAD
                      </span>
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </motion.button>
                <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Lock className="h-4 w-4" />
                  <span>Secure checkout powered by Stripe</span>
                </div>

                {/* Trust badges */}
                <div className="mt-4 grid grid-cols-3 gap-3 text-[10px] text-gray-500">
                  <div className="flex items-center justify-center gap-1 border rounded-lg py-2">
                    <Shield className="h-3.5 w-3.5 text-green-600" />
                    <span>PCI‑DSS</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 border rounded-lg py-2">
                    <Sparkles className="h-3.5 w-3.5 text-primary-600" />
                    <span>SSL 256‑bit</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 border rounded-lg py-2">
                    <CheckCircle className="h-3.5 w-3.5 text-blue-600" />
                    <span>Stripe</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Removed optional sections for now */}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
