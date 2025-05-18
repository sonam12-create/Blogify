// components/Navbar.jsx
import { useNavigate, Link } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import { BlogContext } from "../context/BlogContext";
import { FaUserCircle, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { FiUser } from "react-icons/fi";

const Navbar = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const { handleLogout } = useContext(BlogContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  let timeoutId;

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setShowDropdown(false);
    }, 300); // 300ms delay before closing
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <button
        onClick={() => navigate("/")}
        className="text-xl font-bold text-blue-600"
      >
        Blogify
      </button>

      {/* Right Side Buttons */}
      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <>
            <button
              onClick={() => navigate("/create-blog")}
              className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              <FaPlus className="text-sm" />
              <span>Create Blog</span>
            </button>

            {/* Profile dropdown */}
            <div 
              className="relative"
              ref={dropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button 
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <FaUserCircle className="text-2xl" />
              </button>

              {/* Dropdown menu */}
              {showDropdown && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-100"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to="/user-profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setShowDropdown(false)}
                  >
                    <FiUser className="mr-2" />
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setShowDropdown(false);
                    }}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <button
            onClick={() => navigate("/register")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Get Started
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;