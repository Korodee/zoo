"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Menu, 
  Home, 
  Info, 
  Image, 
  Mail, 
  Users, 
  Crown, 
  Camera,
  BookOpen,
  CreditCard,
  LogOut,
  User,
  Settings,
  HelpCircle
} from "lucide-react";

interface MobileNavProps {
  isAuthenticated?: boolean;
  isMember?: boolean;
  userName?: string;
}

export default function MobileNav({ isAuthenticated = false, isMember = false, userName }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    closed: { x: 20, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  };

  const mainNavItems = [
    { href: "/", label: "Accueil", icon: Home },
    { href: "/#about", label: "À propos", icon: Info },
    { href: "/#gallery", label: "Galerie", icon: Image },
    { href: "/#faq", label: "FAQ", icon: HelpCircle },
    { href: "/#contact", label: "Contact", icon: Mail },
  ];

  const memberNavItems = [
    { href: "/member", label: "Member Hub", icon: Crown },
    { href: "/member#submit", label: "Submit Entry", icon: Camera },
    { href: "/member#resources", label: "Resources", icon: BookOpen },
    { href: "/payment", label: "Manage Membership", icon: CreditCard },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6 text-white" />
      </button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 lg:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">WH</span>
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">WildLife Hub</h2>
                  {isAuthenticated && (
                    <p className="text-sm text-gray-500">Welcome back</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            {/* User Section */}
            {isAuthenticated && (
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-primary-50 to-blue-50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      {userName || "Member"}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 px-2 py-1 text-xs font-medium">
                        <Crown className="h-3 w-3" />
                        {isMember ? "Active Member" : "Free Member"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Items */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                {/* Main Navigation */}
                <div className="mb-6">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
                    Navigation
                  </h3>
                  <nav className="space-y-1">
                    {mainNavItems.map((item) => (
                      <motion.div key={item.href} variants={itemVariants}>
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-3 px-3 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-all duration-200 group"
                        >
                          <item.icon className="h-5 w-5 group-hover:text-primary-600" />
                          <span className="font-medium">{item.label}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                </div>

                {/* Member Navigation */}
                {isAuthenticated && isMember && (
                  <div className="mb-6">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
                      Member Access
                    </h3>
                    <nav className="space-y-1">
                      {memberNavItems.map((item) => (
                        <motion.div key={item.href} variants={itemVariants}>
                          <Link
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-3 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-all duration-200 group"
                          >
                            <item.icon className="h-5 w-5 group-hover:text-primary-600" />
                            <span className="font-medium">{item.label}</span>
                          </Link>
                        </motion.div>
                      ))}
                    </nav>
                  </div>
                )}

                {/* Account Actions */}
                {isAuthenticated && (
                  <div className="mb-6">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
                      Account
                    </h3>
                    <nav className="space-y-1">
                      <motion.div variants={itemVariants}>
                        <Link
                          href="/profile"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-3 px-3 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-all duration-200 group"
                        >
                          <Settings className="h-5 w-5 group-hover:text-primary-600" />
                          <span className="font-medium">Settings</span>
                        </Link>
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <button
                          onClick={() => {
                            // Handle logout
                            setIsOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200 group"
                        >
                          <LogOut className="h-5 w-5" />
                          <span className="font-medium">Sign Out</span>
                        </button>
                      </motion.div>
                    </nav>
                  </div>
                )}
              </div>
            </div>

            {/* Footer CTA */}
            {!isAuthenticated && (
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <Link
                  href="/signup"
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 px-4 rounded-xl font-semibold text-center block hover:shadow-lg transition-all duration-200"
                >
                  Join WildLife Hub
                </Link>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Get exclusive access to wildlife content
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
