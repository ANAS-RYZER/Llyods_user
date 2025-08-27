import Header from "@/components/common/Header";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { Metadata, Viewport } from "next";
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
      template: "%s | Lloyds",
    default: "Explore Projects | Lloyds",
  },
  description: "Discover investment opportunities in films, music, web series, and sports through fractional ownership of intellectual property (IP). Co-own content and be part of the creative economy.",
  keywords: [
    "fractional ownership", 
    "IP investment", 
    "film investments", 
    "music investments", 
    "web series investments", 
    "sports investments", 
    "content ownership", 
    "intellectual property", 
    "creative economy",
    "co-own content",
    "democratising IP investments"
  ],
  icons: {
    icon: [
      { rel: 'icon', type: 'image/svg+xml', url: '/favincon.svg' },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Explore Projects | Lloyds",
    description: "Invest in intellectual property (IP) of films, music, web series, and sports. Participate in fractional ownership and co-own creative projects.",
    // url: "https://Llyods.app",
    siteName: "Lloyds",
    type: "website",
  },
};

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <TooltipProvider>
        {children}
      </TooltipProvider>
    </div>
  );
}