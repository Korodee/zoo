"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut, PawPrint } from "lucide-react";
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
              Home
            </Link>
            <Link href="#about" className={linkClass}>
              About
            </Link>
            <Link href="#gallery" className={linkClass}>
              Gallery
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
                  Members
                </Link>
                <button
                  onClick={handleSignOut}
                  className={linkClass}
                >
                  Sign Out
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
                  Access Members
                </Link>
                <Link
                  href="/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm md:text-base px-4 py-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm text-white font-medium shadow-sm hover:bg-white/20 transition-all duration-200 scrolled:bg-primary-600 scrolled:border-primary-600 scrolled:text-white scrolled:hover:bg-primary-700"
                >
                  Join WildLife Hub
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
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 backdrop-blur-md rounded-lg mt-2 shadow-lg"
            >
              <div className="px-4 py-6 space-y-4">
                <Link
                  href="/"
                  className="block text-gray-700 hover:text-primary-600 font-medium"
                >
                  Home
                </Link>
                <Link
                  href="#about"
                  className="block text-gray-700 hover:text-primary-600 font-medium"
                >
                  About
                </Link>
                <Link
                  href="#gallery"
                  className="block text-gray-700 hover:text-primary-600 font-medium"
                >
                  Gallery
                </Link>
                <Link
                  href="#contact"
                  className="block text-gray-700 hover:text-primary-600 font-medium"
                >
                  Contact
                </Link>
                <div className="pt-4 border-t border-gray-200">
                  {!forceGuest && isLoggedIn ? (
                    <div className="space-y-3">
                      <Link
                        href="/member"
                        className="block text-gray-700 hover:text-primary-600 font-medium"
                      >
                        Members
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="text-gray-700 hover:text-primary-600 font-medium"
                      >
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Link
                        href="/login"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-gray-700 hover:text-primary-600 font-medium"
                      >
                        Access Members
                      </Link>
                      <Link
                        href="/signup"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-primary-600 text-white px-4 py-2 rounded-lg font-medium"
                      >
                        Join WildLife Hub
                      </Link>
                    </div>
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
