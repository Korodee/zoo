import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import RewardTerms from "@/components/RewardTerms";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Conditions générales des récompenses | Domaine du Chevreuil Blanc",
  description:
    "Conditions générales des récompenses du Domaine du Chevreuil Blanc : délais de réclamation, coordonnées, preuve d'identité et modalités officielles.",
};

export default function ConditionsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <RewardTerms />
      <Footer />
    </main>
  );
}
