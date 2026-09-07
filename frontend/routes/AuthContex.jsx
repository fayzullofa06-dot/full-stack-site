import React, { useEffect, useState } from 'react'
import { createContext,useContext, } from 'react'
import { getMe } from '../src/api/user/user.info'

const AuthContext=createContext(null)
export const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true)
    useEffect(() => {
        async function loaderUser(){

            const token=localStorage.getItem('token')
         if(!token){
            setLoading(false)
            return;
         }
         try {
            const data= await getMe()
            setUser(data.user)
         } catch (error) {
              console.error("Failed to get current user:", error);
        localStorage.removeItem("token");
        setUser(null);
            
         }
         finally{
            setLoading(false)
         }
            
        }
  loaderUser()
    }, [])
    
  return (
  <AuthContext.Provider value={{user,setUser,loading}}>
    {
    children
    }
  </AuthContext.Provider>
  )
}

export  function useAuth(){
    return useContext(AuthContext)
}