import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/Toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Domaine du Chevreuil Blanc - Parc Animalier | Maison 1M$ à gagner",
  description:
    "Parc animalier unique au Québec avec cerfs albinos, wapitis, lamas. Cartes membres 50$ - Enfants gratuits. Système de prix révolutionnaire : maisons 1M$, lots d'argent, prix plein air. Fondé par Denis Desjardins à L'Ange-Gardien.",
  keywords: [
    "parc animalier Québec",
    "domaine chevreuil blanc",
    "maison 1 million dollars",
    "prix concours Québec",
    "cerfs albinos",
    "Denis Desjardins",
    "L'Ange-Gardien",
    "wapitis",
    "lamas",
    "cart membre parc",
    "enfants gratuits",
    "prix plein air"
  ],
  openGraph: {
    title: "Domaine du Chevreuil Blanc - Parc Animalier | Maison 1M$ à gagner",
    description:
      "Parc animalier unique au Québec avec cerfs albinos, wapitis, lamas. Cartes membres 50$ - Enfants gratuits. Système de prix révolutionnaire : maisons 1M$, lots d'argent, prix plein air. Fondé par Denis Desjardins à L'Ange-Gardien.",
    url: "https://chevreuilblanc.ca",
    siteName: "Domaine du Chevreuil Blanc",
    images: [
      {
        url: "https://res.cloudinary.com/dzjeufpgy/image/upload/v1760213244/IMG_3424_kioach.jpg",
        width: 1200,
        height: 630,
        alt: "Domaine du Chevreuil Blanc - Parc Animalier",
      },
    ],
    locale: "fr_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Domaine du Chevreuil Blanc - Parc Animalier | Maison 1M$ à gagner",
    description:
      "Parc animalier unique au Québec avec cerfs albinos, wapitis, lamas. Cartes membres 50$ - Enfants gratuits. Système de prix révolutionnaire : maisons 1M$, lots d'argent, prix plein air. Fondé par Denis Desjardins à L'Ange-Gardien.",
    images: [
      "https://res.cloudinary.com/dzjeufpgy/image/upload/v1760213244/IMG_3424_kioach.jpg",
    ],
  },
  icons: {
    icon: [
      { url: "/logoooo.png", sizes: "32x32", type: "image/png" },
      { url: "/logoooo.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/logoooo.png", sizes: "180x180", type: "image/png" }],
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
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": "Domaine du Chevreuil Blanc",
    "description": "Parc animalier unique au Québec avec cerfs albinos, wapitis, lamas. Système de prix révolutionnaire avec maisons 1M$, lots d'argent, prix plein air.",
    "url": "https://chevreuilblanc.ca",
    "image": "https://res.cloudinary.com/dzjeufpgy/image/upload/v1760213244/IMG_3424_kioach.jpg",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "L'Ange-Gardien",
      "addressRegion": "QC",
      "addressCountry": "CA"
    },
    "founder": {
      "@type": "Person",
      "name": "Denis Desjardins"
    },
    "sameAs": [
      "https://chevreuilblanc.ca"
    ]
  };

  return (
    <html lang="fr">
      <head>
        <meta name="google-site-verification" content="gD8GwzreHHzLQSGS99_Tu8c2mGJvwUmRKkyOYRwo8IE" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={inter.className}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
