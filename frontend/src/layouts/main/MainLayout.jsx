  import React, { useEffect, useState } from "react";
  import { NavLink, Outlet, useNavigate } from "react-router-dom";
  import { getMe } from "../../api/user/user.info";
  import { useAuth } from "../../../routes/AuthContex";
  import Sidebar from "../../components/sidebar/Sidebar";

  export default function MainLayout() {
    const navigate = useNavigate();
  const { user, setUser, loading ,setLoading} = useAuth();


  const studentLinks=[
      {
        name: "Dashboard",
        path: "/main/dashboard",
      },
      {
        name: "My Courses",
        path: "/main/courses",
      },
      {
        name: "Browse Courses",
        path: "/main/search",
      },
      {
        name: "Schedule",
        path: "/main/schedule",
      },
      {
        name: "Profile",
        path: "/main/profile",
      },
  ]
  

    const handleLogout = () => {
      localStorage.removeItem("token");
    setUser(null)
          navigate("/",{replace:true});
    };

    const navStyle = ({ isActive }) =>
      `flex items-center px-4 py-3 rounded-lg transition ${
        isActive
          ? "bg-black text-white"
          : "text-gray-600 hover:bg-gray-100"
      }`;

    return (
      <div className="min-h-screen bg-gray-100 flex">

        <Sidebar title="EduFlow" subtitle='StudentPortal' links={studentLinks} onLogout={handleLogout}/>


        <main className="flex-1">

          <header className="h-16 bg-white border-b flex items-center justify-between px-8">

            <h2 className="text-lg font-semibold">
              Student Portal
            </h2>

            {loading ? (
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200" />
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
              </div>
            ) : user ? (
              <div className="flex items-center gap-3">

            
                <span className="text-sm font-medium">
                  {user.firstName} {user.lastName}
                </span>

              </div>
            ) : null}

          </header>

          <section className="p-8">
            <Outlet />
          </section>

        </main>

      </div>
    );
  }