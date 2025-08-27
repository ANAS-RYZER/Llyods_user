"use client"

import React from 'react'
import OrderSummary from '@/components/cards/TrackOrder/orderSummary'
import useFetchOrderById from '@/hooks/order/useFetchOrderById'
import { useParams } from 'next/navigation'
import { IOrder, Order } from '@/constants/global'
import NothingFound from '@/components/common/NothingFound'
import ProjectsSkeleton from '@/assets/skeleton/Projects'
import { OrderTracking } from '@/components/cards/TrackOrder/OrderTracking'
import { Button } from '@/components/ui/button'
import { MoveRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
const Page = () => {
  const router = useRouter()
  const { orderID } = useParams();
  const { order: orderData, loading: orderLoading } = useFetchOrderById(orderID as string)

  return (
    <div className='max-w-3xl mx-auto'>
      <div className="p-4 m-4">
        {orderLoading ? (
          <ProjectsSkeleton /> // Show skeleton while loading
        ) : orderData ? (
          <div className="">
            <div className="">
              <OrderSummary orderValue={orderData as IOrder} />
            </div>
            <div className="">
              <OrderTracking order={orderData as unknown as Order} />
            </div>
              <div className="p-2 flex justify-between">
                <Button variant="outline" onClick={() => router.push('/property')}>Explore More Assets</Button>
                <Button variant="primary" className='bg-[#725ACE] text-white flex' >View Dashboard <MoveRight size={16} className='ml-2' /></Button>
              </div>
          </div>

        ) : (
          <NothingFound />
        )}
      </div>
    </div>
  )
}

export default Page
