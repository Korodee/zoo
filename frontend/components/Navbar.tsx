"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LogOut,
  PawPrint,
  Home,
  Info,
  Image as ImageIcon,
  Mail,
  Crown,
  LogIn,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { logout, getProfile } from "@/utils/api";

export default function Navbar() {
  const [user, setUser] = useState<{ email?: string; name?: string } | null>(
    null
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);

    const init = async () => {
      // On the landing page, keep buttons as guest and skip fetching auth
      if (pathname === "/") {
        setIsLoading(false);
        return;
      }
      try {
        const profile = await getProfile();
        setUser({ email: profile.email, name: profile.name });
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    init();

    const handleScroll = () => {
      const navbar = document.getElementById("navbar");
      if (!navbar) return;
      if (window.scrollY > 50) navbar.classList.add("scrolled");
      else navbar.classList.remove("scrolled");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleSignOut = async () => {
    await logout();
    setUser(null);
  };

  const linkClass =
    "relative text-sm md:text-base font-medium transition-colors duration-300 text-white hover:text-yellow-300 scrolled:text-gray-800 scrolled:hover:text-primary-600 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full";

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <PawPrint className="h-7 w-7 text-white" />
                <span className="text-xl font-semibold tracking-tight text-white">
                  WildLife Hub
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  if (isLoading) {
    return (
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="h-8 w-32 bg-gray-200 animate-pulse rounded" />
          </div>
        </div>
      </nav>
    );
  }

  const forceGuest = pathname === "/";
  const isLoggedIn = !!user;

  return (
    <nav
      id="navbar"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent"
    >
      <div className="max-w-[83rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16 md:h-16">
          {/* Left: logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <PawPrint className="h-7 w-7 text-white transition-colors duration-300 scrolled:text-primary-600" />
              <span className="text-xl font-semibold tracking-tight text-white transition-colors duration-300 scrolled:text-gray-900">
                WildLife Hub
              </span>
            </Link>
          </div>

          {/* Center: nav links (md+) */}
          <nav className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            <Link href="/" className={linkClass}>
              Accueil
            </Link>
            <Link href="#about" className={linkClass}>
              À propos
            </Link>
            <Link href="#gallery" className={linkClass}>
              Galerie
            </Link>
            <Link href="#contact" className={linkClass}>
              Contact
            </Link>
          </nav>

          {/* Right: auth actions */}
          <div className="hidden md:flex items-center gap-3">
            {!forceGuest && isLoggedIn ? (
              <div className="flex items-center gap-3">
                <Link href="/member" className={linkClass}>
                  Membres
                </Link>
                <button onClick={handleSignOut} className={linkClass}>
                  Se déconnecter
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className={linkClass}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Accès Membres
                </Link>
                <Link
                  href="/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm md:text-base px-4 py-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm text-white font-medium shadow-sm hover:bg-white/20 transition-all duration-200 scrolled:bg-primary-600 scrolled:border-primary-600 scrolled:text-white scrolled:hover:bg-primary-700"
                >
                  Rejoindre WildLife Hub
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white scrolled:text-gray-700"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="md:hidden bg-gradient-to-br from-white/95 via-white/90 to-white/95 backdrop-blur-xl rounded-2xl mt-3 shadow-2xl border border-white/50 overflow-hidden"
            >
              <div className="p-6 space-y-4">
                {/* Main Navigation */}
                <div className="space-y-3">
                  <Link
                    href="/"
                    className="group flex items-center py-2 gap-4 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-blue-50 hover:text-primary-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                      <Home className="h-5 w-5 text-blue-600 group-hover:text-blue-700" />
                    </div>
                    <span className="font-semibold text-base">Accueil</span>
                  </Link>
                  <Link
                    href="#about"
                    className="group flex items-center py-2 gap-4 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:text-green-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                      <Info className="h-5 w-5 text-green-600 group-hover:text-green-700" />
                    </div>
                    <span className="font-semibold text-base">À propos</span>
                  </Link>
                  <Link
                    href="#gallery"
                    className="group flex items-center py-2 gap-4 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-pink-200 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                      <ImageIcon className="h-5 w-5 text-purple-600 group-hover:text-purple-700" />
                    </div>
                    <span className="font-semibold text-base">Galerie</span>
                  </Link>
                  <Link
                    href="#contact"
                    className="group flex items-center py-2 gap-4 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-100 to-red-200 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                      <Mail className="h-5 w-5 text-orange-600 group-hover:text-orange-700" />
                    </div>
                    <span className="font-semibold text-base">Contact</span>
                  </Link>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-500/50" />

                {/* User Actions */}
                <div className="space-y-3">
                  {!forceGuest && isLoggedIn ? (
                    <>
                                              <Link
                          href="/member"
                          className="group flex items-center gap-4 py-2 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-amber-50 hover:text-amber-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
                        >
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-100 to-amber-200 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                            <Crown className="h-5 w-5 text-yellow-600 group-hover:text-yellow-700" />
                          </div>
                          <span className="font-semibold text-base">
                            Espace Membre
                          </span>
                        </Link>
                                              <button
                          onClick={handleSignOut}
                          className="group w-full flex items-center gap-4 py-2 rounded-xl text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
                        >
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-100 to-pink-200 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                            <LogOut className="h-5 w-5 text-red-600 group-hover:text-red-700" />
                          </div>
                          <span className="font-semibold text-base">
                            Se déconnecter
                          </span>
                        </button>
                    </>
                  ) : (
                    <>
                                              <Link
                          href="/login"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-center gap-4 py-2 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:text-gray-800 transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
                        >
                          <span className="font-semibold text-base">
                            Accès Membres
                          </span>
                        </Link>
                                              <Link
                          href="/signup"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group w-full flex items-center gap-4 justify-center py-4 rounded-xl bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white hover:shadow-xl transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <span className="font-bold text-base relative">
                            Rejoindre WildLife Hub
                          </span>
                        </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
