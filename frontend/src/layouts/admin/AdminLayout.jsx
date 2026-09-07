
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../../routes/AuthContex";
import Sidebar from "../../components/sidebar/Sidebar";

export default function AdminLayout() {
  const navigate = useNavigate();
  const { user, setUser, loading } = useAuth();

  const adminLinks = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      name:'Teacher',
      path:'/admin/teacher'
    },
    {
      name:'Student',
      path:'/admin/student'
    },
    {
      name:'User',
      path:"/admin/user"
    },
    {
      name:'Department',
      path:"/admin/department"
    },
    {
      name:"Classroom",
      path:'/admin/classrooms'
    },
    {
      name:'Courses',
      path:'/admin/courses'
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">

      <Sidebar
        title="AdminPanel"
        subtitle="Developer"
        links={adminLinks}
        onLogout={handleLogout}
      />

      <main className="flex-1">

        <header className="h-16 bg-white border-b flex items-center justify-between px-8">

          <h2 className="text-lg font-semibold">
            Admin Panel
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
