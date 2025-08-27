"use client"

import dynamic from 'next/dynamic'
import ClientLayout from './ClientLayout'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { KeyHighlights } from '@/components/projects/financials/key-highlights';

const PortfolioDashboard = dynamic(() => import('./portfolio'), { ssr: false })
const WalletDashboard = dynamic(() => import('./wallet'), { ssr: false })

export default function WalletPage() {
  return (
    <ClientLayout>
      <div className='w-full max-w-6xl p-4 md:p-6 mt-4 bg-white mx-auto rounded-lg shadow-sm'>
        <Tabs defaultValue="wallet" className="w-full">
          <TabsList className="w-full overflow-x-auto scrollbar-hidden bg-[#EEF2FF]/70 rounded-lg mb-6 p-1">
            <div className="flex w-full justify-between items-center">
              <TabsTrigger
                value="wallet"
                className="flex-1 data-[state=active]:bg-[#0eb57b] data-[state=active]:text-white text-base font-medium py-3 px-4 m-0.5 rounded-md transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-2">
                  Wallet
                </span>
              </TabsTrigger>

              <TabsTrigger
                value="portfolio"
                className="flex-1 data-[state=active]:bg-[#0eb57b] data-[state=active]:text-white text-base font-medium py-3 px-4 m-0.5 rounded-md transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-2">
                  Portfolio
                </span>
              </TabsTrigger>
            </div>
          </TabsList>

          <div className="w-full">
            <TabsContent value="wallet" className="mt-0 space-y-6 focus-visible:outline-none">
              <WalletDashboard />
            </TabsContent>

            <TabsContent value="portfolio" className="mt-0 space-y-6 focus-visible:outline-none">
              <PortfolioDashboard />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </ClientLayout>
  );
}
