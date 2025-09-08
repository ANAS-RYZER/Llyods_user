"use client";

import { TrendingUp } from "lucide-react";
import React from "react";

const PortfolioBar = () => {
  const portfolio = [
    { label: "Stocks", percentage: 42, amount: 82950, color: "bg-blue-600", showInBar: true },
    { label: "Bonds", percentage: 28, amount: 55300, color: "bg-orange-400", showInBar: true },
    { label: "Fixed Deposits", percentage: 12, amount: 23700, color: "bg-black", showInBar: true },
    { label: "Mutual Funds", percentage: 8, amount: 15800, color: "bg-purple-500", showInBar: true },
    { label: "ETF's", percentage: 6, amount: 11850, color: "bg-purple-500", showInBar: true },
    { label: "Gold", percentage: 4, amount: 7900, color: "bg-purple-500", showInBar: true },
  ];

  const totalAmount = portfolio.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="w-72 rounded-xl border border-gray-200 p-5 h-full font-inter bg-white">
      {/* Header */}
      <p className="text-gray-600 text-base">My Investment Portfolio</p>
      <h1 className="font-bold text-2xl mt-1">
        £{totalAmount.toLocaleString()}
      </h1>
      <p className="text-green-600 font-semibold mb-5 flex items-center gap-1">
        +8.3% <TrendingUp className="h-4 w-4" />
      </p>

      {/* Stacked Bar (only show selected items) */}
      <div className="flex h-6 w-full overflow-hidden rounded-sm mb-6">
        {portfolio
          .filter((item) => item.showInBar)
          .map((item) => (
            <div
              key={item.label}
              className={`${item.color}`}
              style={{ width: `${item.percentage}%` }}
            />
          ))}
      </div>

      {/* Legend List (show all items) */}
      <ul className="">
        {portfolio.map(({ label, percentage, amount, color },index) => (
         <>
          <li
            key={label}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-3 py-4">
              <span
                className={`${color} h-3 w-3 rounded-full inline-block`}
              ></span>
              <span className="font-medium text-sm">
                {label}{" "}
                <span className="text-gray-400 font-normal">{percentage}%</span>
              </span>
            </div>
            <span className="font-medium">
              £{amount.toLocaleString()}
            </span>
          </li>
          {index < portfolio.length - 1 && <hr/>}
         </>
          

        ))}
      </ul>
    </div>
  );
};

export default PortfolioBar;
