import Header from "@/components/common/Header";
import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    template: "%s | Ryzer",
    default: "Ryzer Orders",
  },
  description: "Ryzer Orders",
  icons: {
    icon: [
      { rel: 'icon', type: 'image/svg+xml', url: '/favicon.svg' },
    ]
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Fandora Orders",
    description: "Fandora Orders",
    url: "https://fandora.app",
    siteName: "Fandora",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      
      {children}
    </div>
  );
}
