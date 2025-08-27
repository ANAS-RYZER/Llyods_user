import Header from "@/components/common/Header";
import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    template: "%s | Llyods",
    default: "Llyods Orders",
  },
  description: "Llyods Orders",
  icons: {
    icon: [
      { rel: 'icon', type: 'image/svg+xml', url: '/LLyodsLogo.svg' },
    ]
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Lloyds Wallet",
    description: "Lloyds Wallet",
    siteName: "Lloyds",
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
            {/* <Header /> */}
    
      {children}
    </div>
  );
}
  