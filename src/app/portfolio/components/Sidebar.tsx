"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookCopy,
  Briefcase,
  ChartNoAxesCombined,
  Gift,
  Headset,
  LogOut,
  Settings,
  Users,
  Wallet,
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Portfolio", path: "/portfolio", icon: ChartNoAxesCombined },
    { name: "My Wallets", path: "/portfolio/wallets", icon: Wallet },
    { name: "My Rewards", path: "/portfolio/rewards", icon: Gift },
    { name: "New Deals", path: "/portfolio/new-deals", icon: Briefcase },
    { name: "Community Clubs", path: "/portfolio/community", icon: Users },
    {
      name: "Knowledge Base",
      path: "/portfolio/knowledge-base",
      icon: BookCopy,
    },
    { name: "Support", path: "/portfolio/support", icon: Headset },
    { name: "Settings", path: "/portfolio/settings", icon: Settings },
    { name: "Logout", icon: LogOut },
  ];

  return (
    <div className="w-60 min-h-screen shadow-sm border-r px-2 py-4 bg-[#1D1C21] rounded-tr-3xl">
      <h1 className="text-white mb-3">My Dashboard</h1>
      <nav>
        <ul className="flex flex-col gap-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li className="justify-self-start" key={item.name}>
                <Link
                  href={item.path || "#"}
                  className={`flex items-center gap-5  py-2 rounded-lg transition-colors text-white hover:text-muted-foreground`}
                >
                  <div
                    className={` p-2 rounded-full ${
                      pathname === item.path ? "bg-white text-black" : ""
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
