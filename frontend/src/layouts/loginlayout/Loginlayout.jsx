import React from "react";
import { Outlet } from "react-router-dom";

const Loginlayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Left side */}
      <div className="hidden md:flex md:w-1/2 bg-black text-white items-center justify-center p-12">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold mb-6">
            EduFlow
          </h1>

          <p className="text-xl text-gray-300 leading-relaxed">
            Manage your courses, schedule, students and learning
            experience in one place.
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">

          {/* Logo / title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">
              EduFlow
            </h2>

            <p className="text-gray-500 mt-2">
              Your education platform
            </p>
          </div>

          {/* Login or Signup appears here */}
          <Outlet />

        </div>
      </div>

    </div>
  );
};

export default Loginlayout;