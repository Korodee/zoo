"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Info } from "lucide-react";

export type ToastType = "success" | "error" | "info";

type Toast = { id: number; type: ToastType; message: string };

type ToastContextType = {
  show: (message: string, type?: ToastType, durationMs?: number) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = (
    message: string,
    type: ToastType = "info",
    durationMs = 2500
  ) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(
      () => setToasts((t) => t.filter((x) => x.id !== id)),
      durationMs
    );
  };

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] space-y-3 w-[92%] max-w-md">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex items-start gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur bg-white/95 ${
                t.type === "success"
                  ? "border-green-200"
                  : t.type === "error"
                  ? "border-red-200"
                  : "border-gray-200"
              }`}
            >
              {t.type === "success" ? (
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              ) : t.type === "error" ? (
                <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
              ) : (
                <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              )}
              <p className="text-sm text-gray-800">{t.message}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
