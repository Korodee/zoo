"use client";

import { useState } from "react";
// import { forgotPassword } from '@/utils/api'
import { motion } from "framer-motion";
import { Mail, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/components/Toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const { show } = useToast();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/forgot-password`;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Request failed");
      }
      setSent(true);
      show("If an account exists, a reset link was sent", "success");
    } catch (e: any) {
      const msg = e?.message || "Request failed";
      setError(msg);
      show(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Forgot Password
        </h1>
        {sent ? (
          <div className="text-center text-gray-700">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            We sent a reset link to <span className="font-medium">
              {email}
            </span>{" "}
            if it exists in our system.
            <div className="text-sm text-gray-500 mt-2">
              Check your inbox and spam folder.
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <motion.button
              type="submit"
              disabled={loading || !email}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <span>Send reset link</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </motion.button>
          </form>
        )}
      </div>
    </div>
  );
}
