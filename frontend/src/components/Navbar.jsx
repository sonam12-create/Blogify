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
    }, 300);
  };

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
    <nav className="bg-gradient-to-r from-white via-blue-50 to-white shadow-md px-6 py-4 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="text-2xl font-extrabold text-blue-600 tracking-wide hover:text-blue-700 transition-all"
        >
          Blogify
        </button>

        {/* Right Side Buttons */}
        <div className="flex items-center space-x-5">
          {isAuthenticated ? (
            <>
              <button
                onClick={() => navigate("/create-blog")}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all shadow-md"
              >
                <FaPlus />
                <span className="font-medium">New Post</span>
              </button>

              {/* Profile Dropdown */}
              <div
                className="relative"
                ref={dropdownRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <FaUserCircle className="text-3xl" />
                </button>

                {showDropdown && (
                  <div
                    className="absolute right-0 mt-3 w-48 rounded-xl bg-white border border-gray-200 shadow-lg py-2 z-50"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      to="/user-profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-all"
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
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-all"
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
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-md transition-all"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
