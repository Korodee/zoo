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
      const res = await createCheckoutSession(profile.id, profile.email || "");
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
            Complete Your WildLife Hub Membership
          </h1>
          <p className="text-gray-600 mt-2">
            Unlock exclusive photography content, contests and the community.
          </p>

          {/* Steps */}
          <div className="mt-6 grid grid-cols-4 gap-3 text-sm">
            {[
              { label: "Sign in", done: true },
              { label: "Choose plan", done: true },
              { label: "Pay", done: false },
              { label: "Access", done: false },
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
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    WildLife Hub Membership
                  </h2>
                  <p className="text-gray-600">
                    Lifetime access — one-time payment
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-extrabold text-primary-600">
                    $19.99
                  </div>
                  <div className="text-xs text-gray-500">USD • one-time</div>
                </div>
              </div>

              <div className="mt-6 grid sm:grid-cols-2 gap-4 flex-1">
                {[
                  {
                    icon: Camera,
                    text: "Exclusive wildlife photography & BTS",
                  },
                  { icon: Trophy, text: "Monthly contests with prizes" },
                  { icon: Users, text: "Access to members community" },
                  { icon: Award, text: "Workshops and expert tips" },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="bg-primary-50 text-primary-600 p-2 rounded-lg">
                      <b.icon className="h-5 w-5" />
                    </div>
                    <span className="text-gray-700">{b.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                <ShieldCheck className="h-5 w-5 text-green-600" />
                <p className="text-sm text-green-700">
                  30‑day money‑back guarantee
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
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 h-full flex flex-col">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h3>
              <div className="space-y-3 text-sm flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Plan</span>
                  <span className="font-medium text-gray-900">
                    WildLife Hub — Lifetime
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Price</span>
                  <span className="font-medium text-gray-900">$19.99</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Name</span>
                  <span className="font-medium text-gray-900 flex items-center gap-2">
                    <UserIcon className="h-4 w-4 text-gray-400" />
                    {profile?.name || "—"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Email</span>
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
                      <span>Pay $19.99</span>
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
