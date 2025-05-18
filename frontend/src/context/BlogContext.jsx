import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const BlogContext = createContext();

const BlogContextProvider = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const backendUrl = import.meta.env.VITE_BACK_URI;

  const fetchUserData = async () => {
    try {
      const userData = await axios.get(
        `${import.meta.env.VITE_BACK_URI}/api/user/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(userData.data.user);
    } catch (error) {}
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token]);

  const value = {
    navigate,
    user,
    token,
    backendUrl,
    handleLogout,
  };

  return (
    <BlogContext.Provider value={value}>{props.children}</BlogContext.Provider>
  );
};

export { BlogContextProvider };
