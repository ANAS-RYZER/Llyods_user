import api from '@/lib/httpClient'
import React, { useState } from 'react'

const useCreateWallet = () => {
    const userid = sessionStorage.getItem('userId')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const [data, setData] = useState<any>(null)

    async function createWallet() {
        setIsLoading(true)
        try {
            const res = await api.post('/custodial-wallet/create-smart-wallet', {
                id: userid,
                type: "user",
                ownerAddress: "0xa61EAA0D6a249a70e32113b20dAA229564c844Cc"
            })
            setData(res.data.data)
            if(res.data.data.newlyCreatedSmartWalletAddress){
                window.location.reload()
            }
            setIsLoading(false)
            setSuccess(true)
            setError(null)

        } catch (error :any) {
            setError(error)
            setIsLoading(false)
            setSuccess(false)
            setData(null)
        }
    }
    return {
        createWallet,
        isLoading,
        error,
        success,
        data
    }

}

export default useCreateWallet
