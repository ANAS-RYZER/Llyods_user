import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import useInvestorApi from '@/hooks/user/useInvestorApi'
import useUpdateInvestorApi from '@/hooks/user/useUpdateInvestorApi'
import { UserProfile } from '@/types/project'

interface ProfileContextType {
    data: any
    loading: boolean
    updateProfile: (values: any) => Promise<boolean>
    fetchData: () => Promise<void>
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export function ProfileProvider({ children }: { children: React.ReactNode }) {
    const { data, fetchData, loading: investorLoading , error: investorError} = useInvestorApi()
    const { updateInvestor, loading: updateLoading, error: updateError } = useUpdateInvestorApi()

    const updateProfile = async (values: any) => {
        try {
          await updateInvestor(values)
       
            toast.success('Profile updated successfully')
            await fetchData()
            return true;
          
        } 
        catch (updateError) {
          console.log(updateError)
          return false;
        }
      }
      

    return (
        <ProfileContext.Provider
            value={{
                data,
                loading: investorLoading || updateLoading,
                updateProfile,
                fetchData,
            }}
        >
            {children}
        </ProfileContext.Provider>
    )
}

export function useProfile() {
    const context = useContext(ProfileContext)
    if (context === undefined) {
        throw new Error('useProfile must be used within a ProfileProvider')
    }
    return context
} 