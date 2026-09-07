import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar({ title, subtitle, links, onLogout }) {
  const navStyle = ({ isActive }) =>
    `flex items-center px-4 py-3 rounded-lg transition ${
      isActive
        ? "bg-black text-white"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-5">

      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          {title}
        </h1>

        <p className="text-sm text-gray-500">
          {subtitle}
        </p>
      </div>

      <nav className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={navStyle}
          >
            {link.name}
          </NavLink>
        ))}
      </nav>

      <div className="pt-10">
        <button
          onClick={onLogout}
          className="w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-50"
        >
          Logout
        </button>
      </div>

    </aside>
  );
}


