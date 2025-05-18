import { useContext } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import BlogEditor from "./pages/BlogEditor";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import BlogDetailPage from "./pages/BlogDetailPage";
import { BlogContext } from "./context/BlogContext";

function App() {
  const { token } = useContext(BlogContext);

  return (
    <>
      <Toaster />
      <Navbar  isAuthenticated={token}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Login />} />

        {token && (
          <>
            <Route path="/create-blog" element={<BlogEditor />} />
            <Route path="/blogs/:id" element={<BlogDetailPage />} />
            <Route path="/editor/:id" element={<BlogEditor />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route
              path="/edit-blog/:id"
              element={<BlogEditor isEdit={true} />}
            />
          </>
        )}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
