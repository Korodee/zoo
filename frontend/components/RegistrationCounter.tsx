"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  UserRound,
  Baby,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { getRegistrationStats, type RegistrationStats } from "@/utils/api";

const REFRESH_INTERVAL_MS = 30_000;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function formatCount(value: number) {
  return value.toLocaleString("fr-CA");
}

export default function RegistrationCounter() {
  const [stats, setStats] = useState<RegistrationStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async (isInitial = false) => {
    if (isInitial) setLoading(true);
    else setRefreshing(true);

    try {
      setError(null);
      const data = await getRegistrationStats();
      setStats(data);
    } catch {
      setError("Impossible de charger le nombre d'inscriptions.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchStats(true);
    const interval = setInterval(() => fetchStats(false), REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [fetchStats]);

  return (
    <section
      id="registrations"
      className="py-14 bg-gradient-to-br from-primary-50/40 via-white to-amber-50/30 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full mb-5 shadow-lg"
          >
            <Users className="h-7 w-7 text-white" />
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
          >
            Membres inscrits
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Découvrez la communauté qui grandit avec le Domaine du Chevreuil
            Blanc — compteur mis à jour en temps réel.
          </motion.p>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-10 text-gray-500">
            <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            <p className="text-sm">Chargement des inscriptions…</p>
          </div>
        ) : error ? (
          <div className="max-w-md mx-auto rounded-2xl border border-red-200 bg-red-50/80 p-6 text-center">
            <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-3" />
            <p className="text-red-700 mb-4">{error}</p>
            <button
              type="button"
              onClick={() => fetchStats(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              Réessayer
            </button>
          </div>
        ) : stats ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {stats.breakdownAvailable ? (
              <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                <motion.div
                  variants={itemVariants}
                  className="rounded-2xl border border-amber-200/50 bg-stone-50/80 backdrop-blur-sm p-6 md:p-8 shadow-sm text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-100 mb-4">
                    <UserRound className="h-6 w-6 text-primary-700" />
                  </div>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Adultes
                  </p>
                  <p className="text-4xl md:text-5xl font-bold text-gray-900 tabular-nums">
                    {formatCount(stats.adults)}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">18 ans et plus</p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="rounded-2xl border border-amber-200/50 bg-stone-50/80 backdrop-blur-sm p-6 md:p-8 shadow-sm text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-100 mb-4">
                    <Baby className="h-6 w-6 text-green-700" />
                  </div>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Enfants
                  </p>
                  <p className="text-4xl md:text-5xl font-bold text-gray-900 tabular-nums">
                    {formatCount(stats.children)}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">0 à 17 ans</p>
                </motion.div>
              </div>
            ) : (
              <motion.div
                variants={itemVariants}
                className="rounded-2xl border border-amber-200/50 bg-stone-50/80 backdrop-blur-sm p-8 md:p-10 shadow-sm text-center"
              >
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Membres inscrits
                </p>
                <p className="text-5xl md:text-6xl font-bold text-gray-900 tabular-nums">
                  {formatCount(stats.total)}
                </p>
              </motion.div>
            )}

            <motion.div
              variants={itemVariants}
              className="rounded-xl border border-primary-200/60 bg-primary-50/50 px-5 py-4 text-center space-y-1"
            >
              {stats.breakdownAvailable ? (
                <>
                  <p className="text-gray-700">
                    <span className="font-semibold text-primary-800">
                      {formatCount(stats.total)}
                    </span>{" "}
                    {stats.total === 1 ? "membre inscrit au total" : "membres inscrits au total"}
                  </p>
                  {stats.unknown > 0 && (
                    <p className="text-sm text-gray-600">
                      {formatCount(stats.adults)} adulte{stats.adults !== 1 ? "s" : ""}{" "}
                      + {formatCount(stats.children)} enfant
                      {stats.children !== 1 ? "s" : ""}{" "}
                      + {formatCount(stats.unknown)} sans date de naissance
                    </p>
                  )}
                </>
              ) : (
                <p className="text-sm text-gray-600">
                  Répartition adultes / enfants disponible après la prochaine mise à jour du serveur.
                </p>
              )}
              {refreshing && (
                <p className="text-xs text-gray-500 mt-2 inline-flex items-center gap-1.5">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Mise à jour…
                </p>
              )}
            </motion.div>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
