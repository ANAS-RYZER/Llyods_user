import Header from "@/components/common/Header";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Project Overview - Ryzer`,
  description:
    "DEMOCRATISING CONTENT IP INVESTMENTS. Don't just Consume Content, Co-Own it",
  icons: {
    icon: [{ rel: "icon", type: "image/svg+xml", url: "/lloydslogo.svg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex justify-center w-full">
      {/* <Header /> */}
      <TooltipProvider>{children}</TooltipProvider>
    </div>
  );
}
