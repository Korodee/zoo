  "use client";

  import { useState, useEffect } from "react";
  import { useRouter } from "next/navigation";
  import {
    Eye,
    EyeOff,
    Loader2,
    Mail,
    Lock,
    ArrowRight,
  } from "lucide-react";
  import { motion } from "framer-motion";
  import Image from "next/image";
  import { login, register, getAgeSpots, getGlobalSpots } from "@/utils/api";
  import { useToast } from "@/components/Toast";
  import { resendVerification } from "@/utils/api";

  interface AuthFormProps {
    mode: "signup" | "login";
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };
  const formVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  export default function AuthForm({ mode }: AuthFormProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dob, setDob] = useState<string>("");
    const [agePreview, setAgePreview] = useState<number | null>(null);
    const [spots, setSpots] = useState<{ sold: number; cap: number; remaining: number; unlocked: boolean } | null>(null);
    const [globalSpots, setGlobalSpots] = useState<{ sold: number; cap: number; remaining: number; unlocked: boolean } | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const { show } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setError("");

      try {
        if (mode === "signup") {
          show("Création de votre compte...", "info", 1500);
          await register(email, password, name, dob || undefined);
          show("Compte créé ! Veuillez vérifier votre email.", "success");
          // Friendly page: tell the user to check their inbox
          window.open(`/check-email?email=${encodeURIComponent(email)}`, "_self");
        } else {
          show("Connexion en cours...", "info", 1500);
          const { user } = await login(email, password);
          show("Bon retour parmi nous !", "success");
          router.push(user.is_member ? "/member" : "/payment");
        }
      } catch (error: any) {
        const msg = error.message || "Une erreur s'est produite";
        setError(msg);
        show(msg, "error");
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch global spots on mount so the banner shows real progress regardless of DOB
    useEffect(() => {
      (async () => {
        try {
          const g = await getGlobalSpots();
          setGlobalSpots(g);
        } catch {
          setGlobalSpots(null);
        }
      })();
    }, []);

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-md w-full space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={formVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <div className="text-center">
              <motion.div
                className="flex justify-center mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src="https://res.cloudinary.com/dzjeufpgy/image/upload/v1760037125/logo_wnc6cr.jpg"
                  alt="Domaine du Chevreuil Blanc"
                  width={64}
                  height={64}
                  className="rounded-lg"
                />
              </motion.div>
              <motion.h2
                className="text-3xl font-bold text-gray-900 mb-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {mode === "signup" ? "Obtenir ma Carte - Domaine du Chevreuil Blanc" : "Accéder à l'Espace Membre"}
              </motion.h2>
              <motion.p
                className="text-gray-600"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {mode === "signup" ? (
                  <>
                    Obtenez votre carte de membre pour accéder au parc animalier et
                    participer aux concours exclusifs
                    <br />
                    <a
                      href="/login"
                      className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
                    >
                      Vous avez déjà un compte ? Connectez-vous
                    </a>
                  </>
                ) : (
                  <>
                    Connectez-vous pour accéder à votre espace membre et
                    participer aux concours du parc
                    <br />
                    <a
                      href="/signup"
                      className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
                    >
                      Vous n'avez pas de compte ? Obtenez votre carte
                    </a>
                  </>
                )}
              </motion.p>
            </div>
          </motion.div>

          <motion.form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
            variants={formVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          >
            {error && (
              <motion.div
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-4">
              {mode === "signup" && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55 }}
                >
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Nom complet
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="Votre nom complet"
                  />
                </motion.div>
              )}
              {mode === "signup" && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.58 }}
                >
                  <label
                    htmlFor="dob"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Date de naissance
                  </label>
                  <input
                    id="dob"
                    name="dob"
                    type="date"
                    value={dob}
                    onChange={async (e) => {
                      const v = e.target.value;
                      setDob(v);
                      if (v) {
                        const d = new Date(v);
                        if (!isNaN(d.getTime())) {
                          const now = new Date();
                          let age = now.getFullYear() - d.getFullYear();
                          const m = now.getMonth() - d.getMonth();
                          if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
                          setAgePreview(age);
                          try {
                            const s = await getAgeSpots(age);
                            setSpots(s);
                          } catch {
                            setSpots(null);
                          }
                        }
                      } else {
                        setAgePreview(null);
                        setSpots(null);
                      }
                    }}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  />
                  {agePreview !== null && (
                    <p className="text-sm text-gray-600 mt-2">
                      Âge: {agePreview} ans{globalSpots ? ` — ${globalSpots.sold.toLocaleString()} / ${globalSpots.cap.toLocaleString()} cartes vendues (${globalSpots.remaining.toLocaleString()} restantes)` : ""}
                      {globalSpots?.unlocked ? " — Tirage débloqué" : ""}
                    </p>
                  )}
                </motion.div>
              )}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Adresse email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="Entrez votre email"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={
                      mode === "signup" ? "new-password" : "current-password"
                    }
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="Entrez votre mot de passe"
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </motion.button>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>
                      {mode === "signup"
                        ? "Obtenir ma Carte"
                        : "Accéder à l'Espace Membre"}
                    </span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                )}
              </motion.button>
            </motion.div>

            {mode === "login" && (
              <div className="flex items-center justify-between text-sm">
                <a
                  href="/forgot-password"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Mot de passe oublié ?
                </a>
                <button
                  type="button"
                  className="text-gray-600 hover:text-gray-800"
                  onClick={async () => {
                    try {
                      show("Envoi de l'email de vérification...", "info");
                      await resendVerification(email);
                      show("Email de vérification envoyé", "success");
                    } catch (e: any) {
                      show(e?.message || "Échec de l'envoi", "error");
                    }
                  }}
                >
                  Renvoyer la vérification
                </button>
              </div>
            )}
          </motion.form>
        </motion.div>
      </div>
    );
  }
