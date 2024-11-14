import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import { ThemeContext } from "../context/Theme";

interface MenuBarProps {
  user: { id: string; username: string; isAdmin: boolean } | null;
  logout: () => void;
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

const MenuBar: React.FC<MenuBarProps> = () => {
  const { user, logout } = useContext(AuthContext);
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substring(1);
  const [activeItem, setActiveItem] = useState(path);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleItemClick = (name: string) => setActiveItem(name);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuStyle = isDarkTheme
    ? "bg-gray-800 text-white"
    : "bg-white text-gray-800 border-b border-gray-300";

  const dropdownItems = [];

  if (pathname.includes("/post") || pathname.includes("/user")) {
    dropdownItems.push(
      <Link key="home" to="/" className="block px-4 py-2 text-sm">
        Home
      </Link>
    );
  }

  if (!pathname.includes("/user")) {
    dropdownItems.push(
      <Link
        key="profile"
        to={`/user/${user?.id}`}
        className="block px-4 py-2 text-sm"
      >
        {user
          ? `${
              user.username?.charAt(0).toUpperCase() + user.username?.slice(1)
            }'s Profile`
          : "Guest's Profile"}
      </Link>
    );
  }
  const handleHomeClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div className={`w-full p-4 ${menuStyle}`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              className="flex items-center text-lg font-medium"
              onClick={handleHomeClick}
            >
              <i className="fas fa-home"></i>
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 w-40 bg-white shadow-lg mt-2 rounded-md border border-gray-300">
                {dropdownItems}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {user.isAdmin && (
                <div className="text-sm text-blue-600">Admin</div>
              )}
              <button
                onClick={handleLogout}
                className="text-sm px-4 py-2 rounded-md text-gray-700 hover:bg-gray-200"
              >
                Logout
              </button>
              <button
                onClick={toggleTheme}
                className="text-lg px-4 py-2 rounded-md text-gray-700 hover:bg-gray-200"
              >
                <i className={`fas ${isDarkTheme ? "fa-sun" : "fa-moon"}`}></i>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => handleItemClick("login")}
                className={`px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-200 ${
                  activeItem === "login" ? "bg-gray-200" : ""
                }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => handleItemClick("register")}
                className={`px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-200 ${
                  activeItem === "register" ? "bg-gray-200" : ""
                }`}
              >
                Register
              </Link>
              <button
                onClick={toggleTheme}
                className="text-lg px-4 py-2 rounded-md text-gray-700 hover:bg-gray-200"
              >
                <i className={`fas ${isDarkTheme ? "fa-sun" : "fa-moon"}`}></i>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
