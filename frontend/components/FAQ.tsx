"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronDown, HelpCircle, ChevronUp } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const faqData = [
  {
    id: 1,
    question: "Comment fonctionne le système de paliers de prix ?",
    answer:
      "Le Domaine du Chevreuil Blanc fonctionne avec un système de 9 paliers de prix pour les maisons et roulottes. Le palier 1 (100% de l'objectif) offre une maison de 1 000 000$, le palier 2 (75%) une maison de 750 000$, et ainsi de suite jusqu'au palier 9 (0,78125%) avec un crédit pour l'achat d'une roulotte usagée d'environ 7 813$. Plus l'objectif de participation est élevé, plus les prix sont importants.",
  },
  {
    id: 2,
    question: "Les enfants peuvent-ils vraiment participer gratuitement ?",
    answer:
      "Oui ! Tous les jeunes de 0 à 17 ans participent gratuitement partout au Québec. Pour inscrire un enfant, le parent n'a qu'à acheter une carte de membre de 50$. Les enfants auront accès à des tirages totalisant 2 millions de dollars en prix de plein air (équipements de pêche, camping, aventure) adaptés à leur âge, avec un système de 9 paliers allant de 400 lots de 5 000$ chacun (100% objectif) à 3 lots (0,78125% objectif).",
  },
  {
    id: 3,
    question:
      "Qu'est-ce qui se passe avec le grand prix de la maison d'un million de dollars ?",
    answer:
      "Le Grand Prix est une maison d'un million de dollars tirée parmi tous les membres participants. Le gagnant choisit son terrain et dessine sa maison. La construction est entièrement prise en charge jusqu'à 1 000 000$. Le processus est entièrement filmé et partagé pour la transparence. Si l'objectif de participation est atteint deux fois en six mois, le Domaine offrira deux autres maisons d'un million de dollars à tirer pour les membres !",
  },
  {
    id: 4,
    question: "Comment fonctionnent les tirages hebdomadaires ?",
    answer:
      "Le Domaine tiendra un tirage à toutes les semaines, annoncé sur les réseaux sociaux officiels du projet. Chaque semaine, un nouveau prix sera remis parmi les membres inscrits. Plus vite vous achetez votre carte, plus vite vous participez aux tirages hebdomadaires, et plus longtemps vous restez éligible aux cadeaux et récompenses.",
  },
  {
    id: 5,
    question: "Où se trouve le Domaine du Chevreuil Blanc ?",
    answer:
      "Le projet prend racine en Outaouais, à L'Ange-Gardien, où le premier Domaine du Chevreuil Blanc verra le jour. L'ambition est de répliquer ce modèle partout au Québec, d'acheter d'autres terres et de créer d'autres domaines semblables dans différentes régions pour que chaque coin du Québec puisse profiter de cette expérience.",
  },
  {
    id: 6,
    question: "Quels animaux vivront au Domaine ?",
    answer:
      "Le site de 110 acres abrite déjà un enclos de cerfs de Virginie, y compris des albinos. À long terme, le Domaine accueillera d'autres espèces : chevreuils blancs, wapitis, cerfs rouges, daims, sika, lamas, alpagas, sangliers et canards. Des lacs artificiels permettront la pêche à la truite.",
  },
  {
    id: 7,
    question: "Y aura-t-il des chalets pour dormir sur place ?",
    answer:
      "Oui ! Des chalets rustiques seront construits tout autour de l'enclos, offrant une expérience immersive unique : dormir tout près des animaux, séparé seulement par une clôture sécuritaire. Les chalets seront abordables, confortables et électrifiés, parfaits pour les familles et les amoureux de la nature.",
  },
  {
    id: 8,
    question: "Comment puis-je suivre le progrès du projet ?",
    answer:
      "Le projet se veut entièrement transparent. Tous les développements — aménagements, arrivée des animaux, constructions, tirages — seront publiés en continu sur les réseaux sociaux du Domaine du Chevreuil Blanc. Chaque tirage sera vérifié par des témoins indépendants, filmé et diffusé pour assurer la confiance du public.",
  },
  {
    id: 9,
    question:
      "Que se passe-t-il si l'objectif complet est atteint deux fois en six mois ?",
    answer:
      "Si l'objectif de participation est atteint deux fois en six mois, le Domaine du Chevreuil Blanc offrira deux autres maisons d'un million de dollars à tirer pour les membres ! Une première maison d'un million sera tirée dès que le premier objectif est atteint. Si le même objectif est atteint à nouveau dans les six mois, deux autres maisons d'un million seront ajoutées au tirage. Cela signifie qu'en encourageant le projet et en participant, les membres contribuent à faire grandir le Domaine et augmentent le nombre de prix majeurs offerts.",
  },
  {
    id: 13,
    question: "Comment fonctionne l'achat de la carte et l'enregistrement des enfants ?",
    answer:
      "Au Domaine du Chevreuil Blanc, nous voulons que chaque famille et chaque enfant puisse profiter pleinement de l'expérience. Le parent doit acheter une carte de 50$ pour pouvoir enregistrer ses enfants. Une fois la carte achetée, le parent peut enregistrer tous ses enfants, sans limite de nombre. L'inscription de l'enfant est gratuite. Chaque enfant enregistré reçoit un identifiant unique ou un QR code pour l'accès au site et la participation aux concours.",
  },
  {
    id: 10,
    question: "Y aura-t-il de la nourriture disponible sur place ?",
    answer:
      "Oui ! Le public pourra profiter d'un casse-croûte 100% québécois avec frites maison, poutines généreuses, club sandwichs classiques, pizzas maison, et une crèmerie artisanale, parfaite pour les familles en été. Tous les prix seront abordables, car l'objectif du Domaine est de rendre l'expérience accessible à tous.",
  },
  {
    id: 11,
    question: "Qui est Denis Desjardins, le fondateur ?",
    answer:
      "Denis Desjardins est le fondateur et la vision derrière le Domaine du Chevreuil Blanc. Ce projet est né de son cœur, avec un objectif simple mais profondément humain : rassembler les Québécois autour de la nature, des animaux, et du rêve commun d'un avenir meilleur. Il veut reconnecter les gens à la nature et aux valeurs d'entraide et de partage.",
  },
  {
    id: 12,
    question: "Le projet est-il vraiment transparent ?",
    answer:
      "Absolument ! Le Domaine du Chevreuil Blanc se veut entièrement transparent. Chaque décision, chaque dépense et chaque étape du projet est expliquée et ouverte au public. Tous les tirages sont vérifiés par des témoins indépendants, filmés et diffusés. Le progrès est partagé au jour le jour sur les réseaux sociaux.",
  },
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [showAll, setShowAll] = useState(false);

  // Reset open items when showAll changes to prevent rendering issues
  useEffect(() => {
    setOpenItems([]);
  }, [showAll]);

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  const visibleFAQs = showAll ? faqData : faqData.slice(0, 5);


  return (
    <section id="faq" className="py-14 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full mb-6 shadow-lg"
          >
            <HelpCircle className="h-8 w-8 text-white" />
          </motion.div>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            variants={itemVariants}
          >
            Questions Fréquentes
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Trouvez les réponses aux questions les plus courantes sur le Domaine
            du Chevreuil Blanc. Si vous ne trouvez pas votre réponse, n'hésitez
            pas à nous contacter.
          </motion.p>
        </motion.div>

        <motion.div key={`faq-container-${showAll}`} className="space-y-4">
          {visibleFAQs.map((faq, index) => (
            <motion.div
              key={`faq-${faq.id}-${index}`}
              className="bg-stone-50/80 backdrop-blur-sm rounded-2xl border border-amber-200/50 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full px-6 py-6 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset rounded-2xl"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openItems.includes(faq.id) ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openItems.includes(faq.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0">
                      <div className="border-t border-gray-100 pt-4">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* View All / Show Less Button */}
        <motion.div
          className="text-center mt-8"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.button
            onClick={toggleShowAll}
            className="inline-flex items-center gap-2 px-6 py-3 bg-stone-50/80 backdrop-blur-sm border border-amber-300/50 text-gray-700 font-medium rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-sm hover:shadow-md"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {showAll ? (
              <>
                <span>Afficher moins</span>
                <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                <span>Voir toutes les questions ({faqData.length})</span>
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
