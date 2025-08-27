'use client'
import { Banknote, IdCard, Mail, MapPin, User, Users } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'

interface SideNavProfileProps {
  name: string
  email: string
  image: string
  loading: boolean
}

const links = [
  {
    label: 'Personal Details',
    description: 'Basic personal details',
    icon: User,
    href: '/profile1/personal',
  },
  {
    label: 'Contact Details',
    description: 'Email and phone details',
    icon: Mail,
    href: '/profile1/contact',
  },
  {
    label: 'Address Details',
    description: 'Residential address',
    icon: MapPin,
    href: '/profile1/address',
  },
  {
    label: 'KYC Details',
    description: 'KYC details',
    icon: IdCard,
    href: '/profile1/kyc',
  },
  {
    label: 'Web 3 wallet Details',
    description: 'Web 3 wallet details',
    icon: Banknote,
    href: '/profile1/web3wallet',
  },
  {
    label: 'Nominee Details',
    description: 'Nominee details',
    icon: Users,
    href: '/profile1/nominee',
  }
]

const ProfileSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow p-0 w-full max-w-xs">
      <div className="bg-gradient-to-r from-gray-100 to-primary/10 rounded-t-2xl p-4 flex items-center gap-4">
        <Skeleton className="w-20 h-20 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-40" />
        </div>
      </div>
      <div className="p-6">
        <Skeleton className="h-4 w-16 mb-4" />
        <div className="flex flex-col gap-2">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="flex items-center gap-3 p-3">
              <Skeleton className="h-6 w-6" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const SideNavProfile = ({ name, email, image, loading }: SideNavProfileProps) => {
  const pathname = usePathname()
  
  if (loading) {
    return <ProfileSkeleton />
  }

  return (
    <div className="bg-white rounded-2xl shadow p-0 w-full max-w-xs">
      <div className="bg-gradient-to-r from-gray-100 to-primary/10 rounded-t-2xl p-4 flex items-center gap-4">
        <div className="w-20 h-20 rounded-full overflow-hidden">
          <Image src={image || '/Avatar1.svg'} alt="profile" width={96} height={96} className="object-fill" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-900">{name}</h1>
          <p className="text-sm text-gray-500">{email}</p>
        </div>
      </div>
      <div className="p-6">
        <p className="text-xs font-semibold text-gray-400 mb-4 tracking-widest">PROFILE</p>
        <div className="flex flex-col gap-2">
          {links.map(({ label, description, icon: Icon, href }) => {
            const isActive = pathname === href
            return (
              <Link
                href={href}
                key={label}
                className={`flex items-center gap-3 rounded-xl p-3 cursor-pointer transition-colors ${
                  isActive ? 'bg-blue-50' : 'hover:bg-gray-100'
                }`}
              >
                <Icon className={isActive ? 'text-blue-600' : 'text-gray-400'} />
                <div>
                  <p className="font-semibold text-gray-900">{label}</p>
                  <p className="text-xs text-gray-400">{description}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SideNavProfile
