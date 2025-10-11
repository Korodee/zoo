"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, CheckCircle, ArrowRight, RefreshCcw } from "lucide-react";
import { useToast } from "@/components/Toast";
import { resendVerification } from "@/utils/api";
import { useState } from "react";

export default function CheckEmailPage() {
  const params = useSearchParams();
  const email = params.get("email") || "";
  const { show } = useToast();
  const [sending, setSending] = useState(false);

  const handleResend = async () => {
    if (!email) return;
    setSending(true);
    try {
      await resendVerification(email);
      show("Email de vérification envoyé", "success");
    } catch (e: any) {
      show(e?.message || "Échec du renvoi", "error");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-stone-50 to-emerald-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-stone-50/90 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-200/50 p-8 text-center"
      >
        <div className="mx-auto w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mb-6">
          <Mail className="h-8 w-8 text-primary-600" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Vérifiez votre courriel
        </h1>
        <p className="text-gray-600 mb-6">
          Nous avons envoyé un lien de vérification à
          <br />
          <span className="font-semibold text-gray-900">
            {email || "votre boîte de réception"}
          </span>
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-left text-sm text-gray-600 mb-6">
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Cliquez sur le bouton <span className="font-medium">Vérifier l’email</span>
              dans le courriel
            </li>
            <li>Le lien expire dans 24 heures</li>
            <li>Vous ne l’avez pas reçu ? Vérifiez votre dossier indésirables</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="/login"
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-3 rounded-lg font-semibold"
          >
            Aller à la connexion
            <ArrowRight className="h-5 w-5" />
          </a>
          <button
            onClick={handleResend}
            disabled={sending || !email}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCcw
              className={`h-5 w-5 ${sending ? "animate-spin" : ""}`}
            />
            Renvoyer le lien
          </button>
        </div>

        <div className="mt-6 text-xs text-gray-500">
          Si vous avez créé le compte par erreur, vous pouvez ignorer ce message.
        </div>
      </motion.div>
    </div>
  );
}
