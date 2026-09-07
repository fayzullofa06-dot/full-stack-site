import React from 'react'

import {Navigate,Outlet} from 'react-router-dom'
import { useAuth } from './AuthContex'
export const RoleRoutes = ({allowedRoles}) => {
    const {user,loading}=useAuth()
    console.log("========== ROLE ROUTE ==========");
  console.log("USER:", user);
  console.log("USER ROLE:", user?.role);
  console.log("ALLOWED ROLES:", allowedRoles);
  console.log(
    "HAS ACCESS:",
    user ? allowedRoles.includes(user.role) : false
  );
     if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }
  if(!allowedRoles.includes(user.role)){
        return <Navigate to="/main/dashboard" replace />;
  }
  return  <Outlet />;
}
