import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/Toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Domaine du Chevreuil Blanc - Parc Animalier",
  description:
    "Découvrez notre parc animalier diversifié avec des chevreuils blancs rares, des cervidés majestueux, des bisons et des lamas. Cartes de membres disponibles.",
  icons: {
    icon: [
      { url: "/favicon.jpg", sizes: "32x32", type: "image/jpeg" },
      {
        url: "https://res.cloudinary.com/dzjeufpgy/image/upload/v1760037125/logo_wnc6cr.jpg",
        sizes: "192x192",
        type: "image/jpeg",
      },
    ],
    apple: [
      {
        url: "https://res.cloudinary.com/dzjeufpgy/image/upload/v1760037125/logo_wnc6cr.jpg",
        sizes: "180x180",
        type: "image/jpeg",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
