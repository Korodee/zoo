"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  Info, 
  Camera, 
  Mail, 
  Crown, 
  LogIn, 
  User,
  Menu,
  HelpCircle
} from "lucide-react";
import MobileNav from "./MobileNav";

interface EnhancedNavbarProps {
  isAuthenticated?: boolean;
  isMember?: boolean;
  userName?: string;
}

export default function EnhancedNavbar({ 
  isAuthenticated = false, 
  isMember = false, 
  userName 
}: EnhancedNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Accueil", icon: Home },
    { href: "/#about", label: "À propos", icon: Info },
    { href: "/#gallery", label: "Galerie", icon: Camera },
    { href: "/#faq", label: "FAQ", icon: HelpCircle },
    { href: "/#contact", label: "Contact", icon: Mail },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-white/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.jpg"
              alt="Domaine du Chevreuil Blanc"
              width={48}
              height={48}
              className="w-10 h-10 lg:w-14 lg:h-14 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300"
            />
            <div className="hidden sm:block">
              <h1 className={`font-bold text-lg lg:text-xl transition-colors duration-300 ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}>
                Domaine du Chevreuil Blanc
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-primary-600 hover:bg-primary-50' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                {isMember && (
                  <Link
                    href="/member"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <Crown className="h-4 w-4" />
                    Espace Membre
                  </Link>
                )}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className={`font-medium transition-colors duration-300 ${
                    isScrolled ? 'text-gray-900' : 'text-white'
                  }`}>
                    {userName || "Membre"}
                  </span>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-primary-600 hover:bg-primary-50' 
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <LogIn className="h-4 w-4" />
                  Se connecter
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Obtenir ma Carte
                </Link>
              </>
            )}
          </div>

          {/* Mobile Navigation */}
          <MobileNav 
            isAuthenticated={isAuthenticated}
            isMember={isMember}
            userName={userName}
          />
        </div>
      </div>
    </motion.nav>
  );
}
