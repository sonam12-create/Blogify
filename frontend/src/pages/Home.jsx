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
    <div className="min-h-screen bg-gradient-to-br from-[#f4f7ff] via-[#eef2f8] to-[#fdfdff] py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4 relative inline-block">
            <span className="relative z-10"> Discover Inspiring Blogs</span>
            <span className="absolute bottom-0 left-0 w-full h-2 bg-blue-400 rounded-full z-0 animate-pulse"></span>
          </h1>
          <p className="text-gray-500 text-lg">
            Stay curious. Read from writers around the globe.
          </p>
        </header>

        {/* Blog Grid */}
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {blogs.length > 0 ? (
            blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
          ) : (
            <div className="col-span-full text-center text-gray-500 text-xl font-medium">
              📝 No blogs published yet. Be the first to write!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
