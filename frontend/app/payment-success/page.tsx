"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2 } from "lucide-react";
import { verifyPayment, getMembership } from "@/utils/api";

export default function PaymentSuccessPage() {
  const [isVerifying, setIsVerifying] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const verify = async () => {
      if (!sessionId) {
        router.replace("/member");
        return;
      }
      try {
        const result = await verifyPayment(sessionId);
        if (result.success) {
          await getMembership().catch(() => null);
          setShowToast(true);
          setIsVerifying(false);
          setTimeout(() => router.replace("/member"), 1800);
          return;
        }
        router.replace("/payment");
      } finally {
        setIsVerifying(false);
      }
    };
    verify();
  }, [sessionId, router]);

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900">
            Vérification de votre paiement...
          </h2>
          <p className="text-gray-600 mt-2">
            Veuillez patienter pendant que nous confirmons votre carte de membre.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white shadow-xl border border-gray-200 rounded-xl px-6 py-4 flex items-center space-x-3"
          >
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <p className="font-semibold text-gray-900">
                Carte de Membre Activée
              </p>
              <p className="text-sm text-gray-600">
                Redirection vers l'Espace Membre...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showToast && (
        <div className="text-center">
          <CheckCircle className="h-10 w-10 text-green-600 mx-auto mb-2" />
          <p className="text-gray-700">Redirecting...</p>
        </div>
      )}
    </div>
  );
}
