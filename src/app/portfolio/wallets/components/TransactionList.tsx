'use client';

import React from 'react';

interface Transaction {
  type: 'deposit' | 'withdraw' | 'yield' | 'reward' | 'transfer';
  asset: string;
  amount: string;
  status: 'completed' | 'in-progress' | 'failed';
  date: string;
  explorerLink?: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  const getTypeIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'deposit':
        return (
          <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
            ↓
          </div>
        );
      case 'withdraw':
        return (
          <div className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
            ↑
          </div>
        );
      case 'yield':
        return (
          <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
            %
          </div>
        );
      case 'reward':
        return (
          <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
            ★
          </div>
        );
      case 'transfer':
        return (
          <div className="w-8 h-8 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center">
            ⇄
          </div>
        );
    }
  };

  const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
            Completed
          </span>
        );
      case 'in-progress':
        return (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
            In-Progress
          </span>
        );
      case 'failed':
        return (
          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
            Failed
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">All Transactions</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full ">
          <thead>
            <tr className="text-sm text-gray-500">
              <th className="text-left px-4 py-3">Type</th>
              <th className="text-left px-4 py-3">Asset</th>
              <th className="text-left px-4 py-3">Amount</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Date & Time</th>
              <th className="text-right px-4 py-3">Explorer</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr
                key={index}
                className={`text-sm  ${
                  index !== transactions.length - 1 ? 'border-b' : ''
                }`}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {getTypeIcon(tx.type)}
                    <span className="capitalize">{tx.type}</span>
                  </div>
                </td>
                <td className="px-4 py-3">{tx.asset}</td>
                <td className="px-4 py-3">{tx.amount}</td>
                <td className="px-4 py-3">{getStatusBadge(tx.status)}</td>
                <td className="px-4 py-3">{tx.date}</td>
                <td className="px-4 py-3 text-right">
                  {tx.explorerLink && (
                    <a
                      href={tx.explorerLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      View →
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};