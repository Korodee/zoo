"use client";

import { motion } from "framer-motion";
import { XCircle, ArrowLeft, CreditCard, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function PaymentCancelledPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              type: "spring",
              stiffness: 300,
            }}
          >
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-full">
              <XCircle className="h-12 w-12 text-white" />
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Paiement Annulé
          </motion.h1>

          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Votre paiement a été annulé. Aucun montant n'a été débité de votre compte.
            Vous pouvez réessayer à tout moment pour obtenir votre carte du Domaine du Chevreuil Blanc.
          </motion.p>
        </motion.div>

        <motion.div
          className="bg-stone-50/90 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-200/50 p-8 mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ne manquez pas l'occasion !
            </h2>
            <p className="text-gray-600 mb-6">
              Rejoignez des centaines de visiteurs qui profitent déjà
              de notre parc animalier et participent aux concours exclusifs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
              <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Paiement Sécurisé
              </h3>
              <p className="text-gray-600 text-sm">
                Votre paiement est traité de manière sécurisée via Stripe avec
                un chiffrement de niveau bancaire.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
              <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-4">
                <RefreshCw className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Réessayer
              </h3>
              <p className="text-gray-600 text-sm">
                Vous pouvez tenter le paiement à nouveau à tout moment. Aucun montant n'a
                été débité.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/payment" className="flex-1">
              <motion.button
                className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <CreditCard className="h-5 w-5" />
                <span>Réessayer le Paiement</span>
              </motion.button>
            </Link>

            <Link href="/" className="flex-1">
              <motion.button
                className="w-full bg-gray-100 text-gray-700 py-4 px-6 rounded-xl font-semibold text-lg hover:bg-gray-200 transition-all duration-200 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Retour à l'Accueil</span>
              </motion.button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-8 border border-primary-200"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-xl font-bold text-center text-gray-900 mb-6">
            Pourquoi rejoindre le Domaine du Chevreuil Blanc ?
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Parc Animalier",
                description:
                  "Accédez à notre parc diversifié avec chevreuils blancs, bisons et lamas",
              },
              {
                title: "Concours Exclusifs",
                description:
                  "Participez aux concours photo avec des prix exceptionnels",
              },
              {
                title: "Environnement Naturel",
                description:
                  "Découvrez nos animaux dans un environnement sécuritaire et naturel",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              >
                <h4 className="font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
