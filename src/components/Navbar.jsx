import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, ShoppingCart, X } from "lucide-react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import useCart from "../hooks/useCart";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [logoOpen, setLogoOpen] = useState(false);
  const menuRef = useRef(null);
  const { role, isLoading } = useRole();
  const dropdownRef = useRef(null);
  const { cartItem } = useCart();
  const { user, logout } = useAuth();
  // console.log("cart data", cartItem.length);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setLogoOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const activeStyle =
    "text-violet-600 font-semibold underline underline-offset-4";
  const normalStyle = "text-slate-600 hover:text-violet-500 transition";

  const menuItems = (
    <>
      <li>
        <NavLink
          to="/"
          onClick={() => setOpen(false)}   // ✅ FIX
          className={({ isActive }) =>
            isActive ? activeStyle : normalStyle
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/about"
          onClick={() => setOpen(false)}   // ✅ FIX
          className={({ isActive }) =>
            isActive ? activeStyle : normalStyle
          }
        >
          About Us
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/services"
          onClick={() => setOpen(false)}   // ✅ FIX
          className={({ isActive }) =>
            isActive ? activeStyle : normalStyle
          }
        >
          Services
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/packages"
          onClick={() => setOpen(false)}   // ✅ FIX
          className={({ isActive }) =>
            isActive ? activeStyle : normalStyle
          }
        >
          Tour Package
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/blogs"
          onClick={() => setOpen(false)}   // ✅ FIX
          className={({ isActive }) =>
            isActive ? activeStyle : normalStyle
          }
        >
          Blogs
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink
            to="/contact"
            onClick={() => setOpen(false)} // ✅ FIX
            className={({ isActive }) =>
              isActive ? activeStyle : normalStyle
            }
          >
            Contact Us
          </NavLink>
        </li>
      )}

      {!isLoading && role === "admin" && (
        <li>
          <NavLink
            to="/dashboard/add-blogs"
            onClick={() => setOpen(false)} // ✅ FIX
            className={({ isActive }) =>
              isActive ? activeStyle : normalStyle
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white/90 shadow">
      {/* Navbar */}
      <div className="flex justify-between items-center px-4 md:px-10 h-16">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          World Travel
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-6 text-gray-700 font-medium">
          {menuItems}
        </ul>

        {/* Profile / Login */}
        <div className="hidden lg:block relative" ref={dropdownRef}>
          {user ? (
            <div className="flex items-center gap-2 md:gap-5">
              <Link to="/order-section"><div className="relative">
                🛒
                {cartItem.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                    {cartItem.length}
                  </span>
                )}
              </div></Link>
              <img
                onClick={() => setLogoOpen(!logoOpen)}
                className="w-12 h-12 rounded-full object-cover cursor-pointer border border-blue-600"
                src={user.photoURL}
                alt="Profile"
              />

              {logoOpen && (
                <div className="absolute top-10 right-0 mt-3 w-40 bg-white shadow-lg rounded-lg border p-2 z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => setLogoOpen(false)}
                  >
                    Profile
                  </Link>

                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded-md"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (       
                <Link
                  to="/login"
                  className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                >
                  Login
                </Link>
          )}
        </div>

        {/* Mobile Hamburger */}  
        <button className="lg:hidden flex items-center gap-10" onClick={() => setOpen(true)}>
          <Link to="/order-section"><div className="relative">
            🛒
            {cartItem.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                {cartItem.length}
              </span>
            )}
          </div></Link>
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-semibold">Menu</h3>
          <button onClick={() => setOpen(false)}>
            <X size={28} />
          </button>
        </div>

        <ul className="flex flex-col gap-4 p-4 text-gray-700 font-medium">
          {menuItems}
        </ul>

        {!user && (
          <div className="px-4 mt-4">
            <Link
              to="/login"
              onClick={() => setOpen(false)}  
              className="block text-center w-full py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
            >
              Login
            </Link>
          </div>
        )}

        {user && (
          <div className="px-4 mt-4 space-y-2">
            <Link
              to="/profile"
              onClick={() => setOpen(false)}  
              className="block text-center w-full py-2 bg-gray-200 rounded-full hover:bg-gray-300"
            >
              Profile
            </Link>

            <button
              onClick={logout}
              className="block w-full py-2 bg-red-600 text-white rounded-full hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/10 z-40"  
          onClick={() => setOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Navbar;
