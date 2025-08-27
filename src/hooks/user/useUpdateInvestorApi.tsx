'use client'
import api from '@/lib/httpClient';
import { useState } from 'react'

type UserProfile = {
  fullName?: string;
  country?: string;
  avatar?: string;
  countryCode?: string;
  gender?: 'male' | 'female' | 'other';
  dateOfBirth?: string; // ISO date string
  type?: 'individual' | 'organization';
  mobileNumber?: string;
  email?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  }|null;
};

const useUpdateInvestorApi = () => {
    const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const updateInvestor = async (data:UserProfile) => {
    try {
      setLoading(true);
      const response = await api.put(`/user/investor`, data);
      setLoading(false);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setLoading(false);
    }
  }

  return { updateInvestor, loading, error };
}

export default useUpdateInvestorApi
