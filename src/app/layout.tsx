import type { Metadata, Viewport } from "next";
import "./globals.css";
import GlobalRyzerProvider from "./provider";
import Header from "@/components/common/Header";
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    template: "%s | Ryzer",
    default: "Ryzer ~ RWA Fractional Investment Platform",
  },
  description: "Welcome to Ryzer, a platform that democratises RWA investments through fractional ownership. Invest in real-world assets like real estate, art, and collectibles with minimal capital.",
  keywords: [
    "RWA investment platform",
    "fractional ownership",
    "real world assets",
    "tokenized assets",
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
      { rel: 'icon', type: 'image/svg+xml', url: '/favicon.svg' },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Ryzer ~ RWA Fractional Investment Platform",
    description: "Join Ryzer to access fractional ownership in real-world assets (RWA). Invest in real estate, art, collectibles and more with minimal capital through our innovative tokenization platform.",
    url: "https://ryzer.app",
    siteName: "Ryzer",
    type: "website",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ryzer - RWA Fractional Investment Platform'
      }
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ryzer ~ RWA Fractional Investment Platform',
    description: 'Democratizing access to real-world asset investments through fractional ownership and tokenization.',
    images: ['/twitter-image.jpg'],
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
        </GlobalRyzerProvider>
      </body>
    </html>
  );
}