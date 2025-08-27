'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'My Wallets', path: '/portfolio/wallets' },
    { name: 'My Rewards', path: '/portfolio/rewards' },
    { name: 'Community', path: '/portfolio/community' },
    { name: 'Insights', path: '/portfolio/insights' },
    { name: 'Knowledge Base', path: '/portfolio/knowledge-base' },

  ];

  return (
    <div className="w-64 min-h-screen bg-white shadow-sm border-r p-4">
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`block px-4 py-2 rounded-lg transition-colors ${
                  pathname === item.path
                    ? 'bg-gray-100 text-gray-900 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;