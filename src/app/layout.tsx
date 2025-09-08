import type { Metadata, Viewport } from "next";
import "./globals.css";
import GlobalRyzerProvider from "./provider";
import Header from "@/components/common/Header";
import TidioChat from "@/components/common/TidioChat";
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    template: "%s | Lloyds",
    default: "Lloyds ~ RWA Fractional Investment Platform",
  },
  description: "Welcome to Ryzer, a platform that democratises RWA investments through fractional ownership. Invest in real-world assets like real estate, art, and collectibles with minimal capital.",
  keywords: [
    "RWA investment platform",
    "fractional ownership",
    "real world assets",
    "digital fractional ownership",
    "investment democratization",
    "fractional investing",
    "blockchain investments",
    "tokenized real estate",
    "fractional art ownership",
    "collectibles investment",
    "RWA tokenization",
    "accessible investing",
    "alternative investments",
    "digital asset platform",
    "Ryzer platform",
    "fractional RWA",
    "investment opportunities",
    "asset tokenization",
    "democratized investing"
  ],
  icons: {
    icon: [
      { rel: 'icon', type: 'image/svg+xml', url: '/lloydslogo.svg' },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Lloyds ~ RWA Fractional Investment Platform",
    description: "Join Lloyds to access fractional ownership in real-world assets (RWA). Invest in real estate, art, collectibles and more with minimal capital through our innovative tokenization platform.",
    // url: "https://ryzer.app",
    siteName: "Lloyds",
    type: "website",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Lloyds - RWA Fractional Investment Platform'
      }
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lloyds ~ RWA Fractional Investment Platform',
    description: 'Democratizing access to real-world asset investments through fractional ownership and tokenization.',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <GlobalRyzerProvider>
          <Header />
          {children}
          <TidioChat />
        </GlobalRyzerProvider>
      </body>
    </html>
  );
}