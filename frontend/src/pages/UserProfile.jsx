import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FiMenu, FiX } from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import UserInfo from "../components/UserInfo";
import DraftBlogCard from "../components/DraftBlogCard";
import PublishedBlogCard from "../components/PublishedBlogCard";
import { BlogContext } from "../context/BlogContext";

const UserProfile = () => {
  const [blogs, setBlogs] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [published, setPublished] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeSection, setActiveSection] = useState("user");
  const { navigate, user, token, backendUrl } = useContext(BlogContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/blogs/user-blogs`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlogs(res.data);
        setDrafts(res.data.filter((b) => b.status === "draft"));
        setPublished(res.data.filter((b) => b.status === "published"));
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleDeleteBlog = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/blogs/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updated = blogs.filter((b) => b._id !== id);
      setBlogs(updated);
      setDrafts(updated.filter((b) => b.status === "draft"));
      setPublished(updated.filter((b) => b.status === "published"));
    } catch (err) {
      console.error(err);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "user":
        return <UserInfo user={user} />;
      case "drafts":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">
              Draft Posts ({drafts.length})
            </h2>
            {drafts.length === 0 ? (
              <p className="text-gray-500">You have no draft posts</p>
            ) : (
              drafts.map((blog) => (
                <DraftBlogCard
                  key={blog._id}
                  blog={blog}
                  onEdit={() => navigate(`/edit-blog/${blog._id}`)}
                  onDelete={handleDeleteBlog}
                />
              ))
            )}
          </div>
        );
      case "published":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">
              Published Posts ({published.length})
            </h2>
            {published.length === 0 ? (
              <p className="text-gray-500">You have no published posts</p>
            ) : (
              published.map((blog) => (
                <PublishedBlogCard
                  key={blog._id}
                  blog={blog}
                  onDelete={handleDeleteBlog}
                  onView={(b) => navigate(`/blogs/${b._id}`)}
                />
              ))
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:hidden flex items-center justify-between bg-blue-600 text-white p-4">
        <h1 className="text-xl font-bold">Profile</h1>
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="text-xl"
        >
          {showSidebar ? <FiX /> : <FiMenu />}
        </button>
      </div>
      <div className={`md:block ${showSidebar ? "block" : "hidden"} md:w-64`}>
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </div>
      <div className="flex-1 p-6">{renderContent()}</div>
    </div>
  );
};

export default UserProfile;
