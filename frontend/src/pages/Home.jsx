import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { BlogContext } from "../context/BlogContext";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const { backendUrl } = useContext(BlogContext);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/blogs`);
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Blogs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Home;
