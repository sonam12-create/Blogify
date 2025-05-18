// pages/BlogDetail.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/blogs/${id}`);
        setBlog(res.data);
        console.log(blog)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!blog) return <div className="min-h-screen flex items-center justify-center">Blog not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 mb-6"
      >
        <FiArrowLeft className="mr-2" />
        Back to Blogs
      </button>
      
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {blog.mediaUrl && (
          <img
            src={blog.mediaUrl}
            alt="Blog"
            className="w-full h-64 object-cover"
          />
        )}
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
          <div className="flex items-center mb-6">
            <span className={`px-3 py-1 rounded-full text-sm ${
              blog.status === 'published' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {blog.authorName.toUpperCase()}
            </span>
            <span className="text-gray-500 text-sm ml-4">
              Published on: {new Date(blog.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="prose max-w-none">
            <p className="whitespace-pre-line">{blog.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;