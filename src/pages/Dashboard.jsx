import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Home,
  PlusCircle,
  FolderArchive,
  FileText,
  BarChart2,
  Plane,
} from "lucide-react";

const navItems = [
  { name: "Home", path: "/", icon: <Home size={20} /> },
  { name: "All Users", path: "/dashboard/all-users", icon: <PlusCircle size={20} /> },
  { name: "Add Blog", path: "/dashboard/add-blogs", icon: <PlusCircle size={20} /> },
  { name: "Add Tour Package", path: "/dashboard/add-package", icon: <PlusCircle size={20} /> },
  { name: "All Tour Packages", path: "/dashboard/all-packages", icon: <Plane size={20} /> },
  { name: "All Blogs", path: "/dashboard/all-blogs", icon: <FileText size={20} /> },
];

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ----------- Sidebar (Large Devices) ----------- */}
      <aside className="hidden md:flex flex-col w-64 bg-white shadow-lg p-5 border-r border-gray-400">
        <h2 className="text-2xl font-semibold mb-8 text-blue-600">Admin Panel</h2>

        <nav className="flex flex-col gap-4">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg font-medium transition
                  ${isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* ----------- Main Content ----------- */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>

      {/* ----------- Bottom Nav (Small Devices) ----------- */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-lg border-t">
        <nav className="flex justify-around py-2">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 text-xs p-2 
                ${isActive
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
                }`
              }
            >
              {item.icon}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Dashboard;
