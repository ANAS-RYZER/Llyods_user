'use client';

import {Button} from '@/components/ui/button';
import {ArrowDownToLine, ArrowUpToLine, RefreshCcw} from 'lucide-react';
import React, { useState } from 'react';
import { DepositDialog } from './DepositDialog';
import {WithdrawDialog} from './WithDrawDialog';

interface WalletHeaderProps {
  totalBalance: string;
  apy: number;
}

export const WalletHeader: React.FC<WalletHeaderProps> = ({
  totalBalance,
  apy,
}) => {
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  return (
    <div className="bg-gray-900 rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-4">
          {/* APY Circle Indicator */}
          <div className="relative w-16 h-16">
            <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
              <div className="text-center">
                <span className="text-green-400 text-lg font-bold">{apy}%</span>
                <span className="block text-xs text-gray-400">APY</span>
              </div>
            </div>
            {/* Green Arc - We'll use a pseudo-element for the arc in real implementation */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-green-400 -rotate-45"></div>
          </div>

          <div>
            <div className="text-gray-400 text-sm mb-1">My Balance (total value)</div>
            <div className="text-white text-4xl font-bold mb-1">{totalBalance}</div>
            <div className="text-gray-400 text-sm">Available + pending settlements</div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-3 ">
          <Button
            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsDepositOpen(true)}
          >
            <ArrowDownToLine size={16}/>
            Deposit
          </Button>
          <DepositDialog
            isOpen={isDepositOpen}
            onClose={() => setIsDepositOpen(false)}
          />
          <WithdrawDialog
            open={isWithdrawOpen}
            onOpenChange={(open) => setIsWithdrawOpen(open)}
          />
          <Button
            className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            onClick={() => setIsWithdrawOpen(true)}
          >
            <ArrowUpToLine size={12}/>
            Withdraw
          </Button>
          <Button className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
            <RefreshCcw size={12}/>
            Transfer
          </Button>
        </div>
      </div>
    </div>
  );
};