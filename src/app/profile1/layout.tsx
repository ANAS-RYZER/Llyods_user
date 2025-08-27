  'use client'
  import SideNavProfile from '@/components/profile/new-profile/SideNavProfile'
  import { ProfileProvider, useProfile } from './ProfileContext'
  import React from 'react'

  function ProfileLayoutContent({ children }: { children: React.ReactNode }) {
    const { data ,loading} = useProfile()
    let name: string;

    if (data?.firstName == null || data?.lastName == null) {
      name = "Hello User";
    } else {
      name = data?.firstName + ' ' + data?.lastName;
    }
    
    return (
      <div className="flex gap-4 w-full p-4 max-w-6xl mx-auto">
        
        <SideNavProfile
          name={name || ''}
          email={data?.email || ''}
          image={data?.avatar || ''}
          loading={loading}
        />
        <div className="flex-1">{children}</div>
      </div>
    )
  }

  export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return (
      <ProfileProvider>
        <ProfileLayoutContent>{children}</ProfileLayoutContent>
      </ProfileProvider>
    )
  }
