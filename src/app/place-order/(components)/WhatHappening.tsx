import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CirclePlay } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const WhatHappening = () => {
  return (
    <>
              {/* What's Happening */}
              <div>
                <h2 className="font-bold">Whats happening Now?</h2>
                <p className="text-gray-500">USDT is being converted into the corresponding native currency</p>
              </div>

              <hr />

              {/* Cancellation Policy */}
              <div>
                <h2 className="font-bold">Cancellation Policy</h2>
                <p className="text-gray-500">
                  Free cancellation before 15 August. Cancel before 16 August to get partial refund.{" "}
                  <a href="#" className="text-blue-500 underline">
                    Learn more
                  </a>
                </p>
              </div>

              <hr />

              {/* While you wait */}
              <div>
                <h2 className="font-bold">While you wait, let's explore!</h2>
                <Card className="mt-3 overflow-hidden border border-gray-200">
                  <CardContent className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-2">
                      <div className="w-40 h-[78px] flex">
                        <Image
                        src="/Real-estate.jpg"
                        alt="Real estate investment"
                        width={150}
                        height={50}
                        className="rounded-md object-cover"
                      />
                      </div>
                      <div className="flex flex-col gap-5">
                        <h3 className="font-semibold">Real estate investment basics</h3>
                        <p className="text-gray-500">Earn passive income by investing in real estate</p>
                      </div>
                    </div>
                    <Button variant="link" className="text-purple-500">
                      <CirclePlay/>
                       Watch now
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </>
  )
}

export default WhatHappening
