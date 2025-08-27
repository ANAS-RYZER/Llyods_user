'use client';

import React from 'react';

interface BalanceRow {
  asset: string;
  symbol: string;
  methods: string[];
  available: number;
  inEarn: number;
  total: number;
  fiatValue: string;
}

interface BalanceTableProps {
  balances: BalanceRow[];
}

export const BalanceTable: React.FC<BalanceTableProps> = ({ balances }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Balances</h2>
          {/* <div className="flex gap-2">
            <button className="px-4 py-1 rounded-lg bg-gray-100 text-gray-900 font-medium">
              Fiat
            </button>
            <button className="px-4 py-1 rounded-lg text-gray-600 hover:bg-gray-50">
              Crypto
            </button>
          </div> */}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-sm text-gray-500">
              <th className="text-left px-4 py-3">Asset</th>
              <th className="text-left px-4 py-3">Symbol</th>
              <th className="text-left px-4 py-3">Available</th>
              <th className="text-left px-4 py-3">In Earn</th>
              <th className="text-left px-4 py-3">Total</th>
              <th className="text-right px-4 py-3">Fiat Value</th>
            </tr>
          </thead>
          <tbody>
            {balances.map((row, index) => (
              <tr
                key={row.symbol}
                className={`text-sm ${
                  index !== balances.length - 1 ? 'border-b' : ''
                }`}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      {row.symbol.slice(0, 1)}
                    </div>
                    <div>
                      <div className="font-medium">{row.asset}</div>
                      <div className="text-xs text-gray-500">
                        Methods: {row.methods.join(' / ')}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">{row.symbol}</td>
                <td className="px-4 py-3">{row.available.toLocaleString()}</td>
                <td className="px-4 py-3">{row.inEarn.toLocaleString()}</td>
                <td className="px-4 py-3">{row.total.toLocaleString()}</td>
                <td className="px-4 py-3 text-right">{row.fiatValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};