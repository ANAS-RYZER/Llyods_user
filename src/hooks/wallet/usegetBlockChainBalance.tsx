import api from '@/lib/httpClient'
import React, { useState, useEffect } from 'react'

function usegetBlockChainBalance() {
    const [userid, setUserid] = useState<string | null>(null)
 
    const [usdt , setUsdt] = useState(0)
    const [xrp , setXrp] = useState(0)
    const[xdc, setXdc] = useState(0)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUserId = sessionStorage.getItem('userId')
            setUserid(storedUserId)
        }
    }, [])

    async function getUSDTBalance(){
        if (!userid) return
        const res = await api.post('/custodial-wallet/get-usdt-balance',{
         userId: userid
        })
        setUsdt(res.data.data.usdtBalance)
        console.log(res.data.data.usdtBalance)
         
     }
     async function getXRPBalance(){
         if (!userid) return
         const res = await api.post('/custodial-wallet/get-xrp-balance',{
          userId: userid
         })
         setXrp(res.data.data.xrpBalance)
         console.log(res.data.data.xrpBalance)
          
      } 
        async function getXDCBalance(){
         if (!userid) return
         const res = await api.post('/custodial-wallet/get-xdc-balance',{
          userId: userid
         })
         setXdc(res.data.data.xdcBalance)
         console.log(res.data.data.xdcBalance)
          
      }
 
       return {
         usdt,
         xrp,
         xdc,
         getUSDTBalance,
         getXRPBalance,
         getXDCBalance,
         userid
       }
  
    
}

export default usegetBlockChainBalance
