import { useState, useRef, useEffect } from "react";
import { User, LogIn, Clock } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Link } from "react-router-dom";
import { useAuth } from "../components/auth/AuthContext";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleLogout = async () => {
    try {
      await logout();
      setDropdownOpen(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              WokTopup
            </span>
          </Link>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            {/* User Menu */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="p-2 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none"
                >
                  <User className="w-6 h-6" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-700 shadow-lg rounded-lg z-50 py-2">
                    <Link
                      to="/orders"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <Clock className="w-4 h-4" />
                      History Order
                    </Link>
                    <hr className="my-1 border-t border-gray-200 dark:border-gray-600" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="p-2 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <LogIn className="w-6 h-6" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
