"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { verifyEmail } from "@/utils/api";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function VerifyEmailPage() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token") || "";
  const email = params.get("email") || "";
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const run = async () => {
      try {
        await verifyEmail(token, email);
        setStatus("success");
        setTimeout(() => router.replace("/login"), 1500);
      } catch (e: any) {
        setStatus("error");
        setMessage(e?.message || "Verification failed");
      }
    };
    if (token && email) run();
  }, [token, email, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50 px-4">
      {status === "loading" && (
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary-600 mx-auto mb-3" />
          <p className="text-gray-700">Verifying your email...</p>
        </div>
      )}
      {status === "success" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <CheckCircle className="h-10 w-10 text-green-600 mx-auto mb-2" />
          <h2 className="text-xl font-semibold text-gray-900">
            Email verified
          </h2>
          <p className="text-gray-600">Redirecting to login...</p>
        </motion.div>
      )}
      {status === "error" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <XCircle className="h-10 w-10 text-red-600 mx-auto mb-2" />
          <h2 className="text-xl font-semibold text-gray-900">
            Verification failed
          </h2>
          <p className="text-gray-600">{message}</p>
        </motion.div>
      )}
    </div>
  );
}
