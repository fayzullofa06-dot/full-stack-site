import React from 'react'
import {createBrowserRouter, RouterProvider}from 'react-router-dom'
import Loginlayout from '../src/layouts/loginlayout/Loginlayout'
import Login from '../src/pages/login/Login'
import Signup from '../src/pages/signup/Signup'
import MainLayout from '../src/layouts/main/MainLayout'
import Dashboard from '../src/pages/dashboard/Dashboard'
import Mycourse from '../src/pages/mycourse/Mycourse'
import BrowseCourse from '../src/pages/browsecourse/BrowseCourse'
import Schdule from '../src/pages/schdeule/Schdule'
import Profile from '../src/pages/profile/Profile'
import Teachers from '../src/layouts/teachers/Teachers'
import Admin from '../src/layouts/admin/AdminLayout'
import AdminLayout from '../src/layouts/admin/AdminLayout'

import ProtectedRoute from "./ProtectedRoutes";
import GuestRoute from "./GuestRoutes";
import {RoleRoutes} from "./RoleRoutes";
import { AdminDashboard } from '../src/pages/dashboard/AdminDashboard'
import { AdminTeacher } from '../src/pages/teachers/AdminTeacher'
import { AdminStudent } from '../src/pages/students/AdminStudent'
import { AdminUser } from '../src/pages/user/AdminUser'
import { Admindepartment } from '../src/pages/departments/Admindepartment'
import { AdminClassrooms } from '../src/pages/classrooms/AdminClassrooms'
import { Admintotalcourses } from '../src/pages/mycourse/Admintotalcourses'


export const router = createBrowserRouter([


  {
    element: <GuestRoute />,
    children: [
      {
        path: "/",
        element: <Loginlayout />,
        children: [
          {
            index: true,
            element: <Login />
          },
          {
            path: "sign",
            element: <Signup />
          }
        ]
      }
    ]
  },



  {
    element: <ProtectedRoute />,
    children: [

      {
        element:<RoleRoutes allowedRoles={['student']}/>,
        children:[
          
          {
            path: "/main",
            element: <MainLayout />,
            children: [
              {
                path: "dashboard",
                element: <Dashboard />
              },
              {
                path: "courses",
                element: <Mycourse />
              },
              {
                path: "search",
                element: <BrowseCourse />
              },
              {
                path: "schedule",
                element: <Schdule />
              },
              {
                path: "profile",
                element: <Profile />
              }
            ]
          },
        ]
      },


      {
        element: <RoleRoutes allowedRoles={["teacher"]} />,
        children: [
          {
            path: "/Teacher",
            element: <Teachers />
          }
        ]
      },


      {
        element: <RoleRoutes allowedRoles={["admin"]} />,
        children: [
          
         { path: "/admin",
          element: <AdminLayout />,
          children:[

            {
              path:"dashboard",
              element:<AdminDashboard/>
            },
            {
              path:'teacher',
              element:<AdminTeacher/>
            },
            {
              path:'student',
              element:<AdminStudent/>
            },
            {
              path:'user',
              element:<AdminUser/>
            },
            {
              path:"department",
              element:<Admindepartment/>
            },
            {
              path:'classrooms',
              element:<AdminClassrooms/>
            },
            {
              path:'courses',
              element:<Admintotalcourses/>
            }
          ]
         },
        ]
      }

    ]
  }

]);


export default function Routes() {
  return (
    <RouterProvider router={router}/>
  )
}
