"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Loader2 } from "lucide-react";
import { submitContactForm } from "@/utils/api";
import { useToast } from "@/components/Toast";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { show } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      show("Veuillez remplir tous les champs", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitContactForm(formData);
      show("Message envoyé avec succès ! Nous vous répondrons bientôt.", "success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error: any) {
      show(error.message || "Erreur lors de l'envoi du message", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section
      id="contact"
      className="py-10 sm:py-12 lg:py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-6 sm:mb-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full mb-3 sm:mb-5 shadow-lg"
          >
            <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </motion.div>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6"
            variants={itemVariants}
          >
            Contactez-nous
          </motion.h2>
          <motion.p
            className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed px-4"
            variants={itemVariants}
          >
            Des questions ? Nous aimerions avoir de vos nouvelles. Envoyez-nous un message et
            nous répondrons dès que possible.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-3 sm:space-y-5">
            <div className="bg-stone-50/80 backdrop-blur-sm rounded-2xl p-4 sm:p-5 lg:p-6 shadow-md border border-emerald-200/50">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                Informations de Contact
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <motion.div
                  className="flex items-center group cursor-pointer"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-2 sm:p-2.5 rounded-xl mr-3 sm:mr-4 shadow-lg flex-shrink-0">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 text-sm">Email</p>
                    <p className="text-gray-600 text-xs sm:text-sm break-all">le.domaine.du.chevreuil.blanc@gmail.com</p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-center group cursor-pointer"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="bg-gradient-to-r from-green-500 to-green-600 p-2 sm:p-2.5 rounded-xl mr-3 sm:mr-4 shadow-lg flex-shrink-0">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 text-sm">Téléphone</p>
                    <p className="text-gray-600 text-xs sm:text-sm">819-329-6264</p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-center group cursor-pointer"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-2 sm:p-2.5 rounded-xl mr-3 sm:mr-4 shadow-lg flex-shrink-0">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 text-sm">Nom</p>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      Domaine du Chevreuil Blanc
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="bg-stone-50/80 backdrop-blur-sm rounded-2xl p-4 sm:p-5 lg:p-6 shadow-md border border-emerald-200/50">
              <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
                Heures d'Ouverture
              </h4>
              <div className="space-y-2.5 sm:space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-900 text-sm sm:text-base">
                    Lundi - Vendredi
                  </span>
                  <span className="text-gray-600 text-sm sm:text-base">9h00 - 18h00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-900 text-sm sm:text-base">Samedi</span>
                  <span className="text-gray-600 text-sm sm:text-base">8h00 - 19h00</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium text-gray-900 text-sm sm:text-base">Dimanche</span>
                  <span className="text-gray-600 text-sm sm:text-base">10h00 - 17h00</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <div className="bg-stone-50/80 backdrop-blur-sm rounded-2xl p-4 sm:p-5 lg:p-6 shadow-md border border-emerald-200/50">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                Envoyez-nous un Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 placeholder-gray-500 transition-all duration-300 text-sm sm:text-base"
                    placeholder="Votre nom"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 placeholder-gray-500 transition-all duration-300 text-sm sm:text-base"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 placeholder-gray-500 transition-all duration-300 resize-none text-sm sm:text-base"
                    placeholder="Votre message..."
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 sm:px-6 py-2.5 sm:py-3.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <Mail className="h-5 w-5" />
                      <span>Envoyer le Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
