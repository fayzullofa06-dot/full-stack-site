import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import { useAuth } from './AuthContex'

export default function GuestRoutes() {
    const {user,loading}=useAuth()
    if(loading){
           return <div>Loading...</div>;
    }
    if(user){
         if(user.role==='admin'){
          return <Navigate to='admin/dashboard'/>
         }
         if(user.role==='teacher'){
           return <Navigate to='teacher/dashboard'/>
          }
          
          return <Navigate to="/main/dashboard" replace />;
        }
    
  return <Outlet/>
}
